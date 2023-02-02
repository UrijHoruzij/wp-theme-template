<?php

class Activation2
{
	protected $name = '';
	protected $protected_functions = [];
	private $url = 'http://localhost:8000/';
	public function __construct()
	{
		add_action('check_activation_event', [$this, 'check_activation']);
	}
	public function init()
	{
		if (get_option('protected-functions') == false) {
			update_option('protected-functions', []);
		}
		$this->$protected_functions = get_option('protected-functions');
		wp_clear_scheduled_hook('check_activation_event');
		wp_schedule_event(time(), 'daily', 'check_activation_event');
	}
	public function uninit()
	{
		$this->delete_options();
		delete_option('activation_' . $this->name);
		delete_option('protected-functions');
		wp_clear_scheduled_hook('check_activation_event');
	}
	public function get_activation()
	{
		$res = [];
		if (get_option('activation_' . $this->name) == 'true') {
			$res = ['status' => 'success', 'message' => 'Activation successful'];
		} else {
			$res = ['status' => 'error', 'message' => 'Activation error'];
		}
		return $res;
	}
	public function activation($req)
	{
		$response = $this->fetch($req['email'], $req['code'], 'activation');
		$data = json_decode($response['body'], true);
		if ($data['status'] == 'activated') {
			$this->update_options($data['protected_functions']);
			update_option('activation_' . $this->name, 'true');
			return ['status' => 'success', 'message' => 'Activation successful'];
		} else {
			return ['status' => 'error', 'message' => 'Activation error'];
		}
	}
	public function check_activation()
	{
		$activated = true;
		if (get_option('activation_' . $this->name) != 'true') {
			$activated = false;
		}
		foreach ($this->protected_functions as $var) {
			$val = get_option($val);
			if ($val == '' || $val) {
				$activated = false;
				break;
			}
		}
		if (!$activated) {
			$data = [];
			foreach ($this->protected_functions as $var) {
				$data[$var] = '';
			}
			$this->update_options($data);
			update_option('activation_' . $this->name, 'false');
		}
	}
	private function delete_options()
	{
		foreach ($this->protected_functions as $var) {
			delete_option($var);
		}
	}
	private function update_options($data)
	{
		$temp = [];
		foreach ($data as $var => $val) {
			update_option($var, gzdeflate($val, 9));
			$temp[] = $var;
		}
		update_option('protected-functions', $temp);
		$this->protected_functions = get_option('protected-functions');
	}
	protected function eval_base64($option)
	{
		eval(gzinflate(base64_decode(get_option($option))));
	}
	private function fetch($email, $code, $event)
	{
		if (isset($email) && isset($code) && isset($event)) {
			$endpoint = $url . $event;
			$body = [
				'name' => $this->name,
				'email' => $email,
				'code' => $code,
				'url' => get_home_url(),
			];
			$body = wp_json_encode($body);
			$options = [
				'body' => $body,
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'httpversion' => '1.0',
				'sslverify' => false,
				'data_format' => 'body',
			];
			$response = wp_remote_post($endpoint, $options);
			return $response;
		}
	}
}
class Report2 extends Activation2
{
	public function __construct()
	{
		parent::__construct();
		$this->name = 'report';
		$this->init();
		include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
		add_action('admin_menu', [$this, 'add_menu_theme']);
		add_action('rest_api_init', function () {
			register_rest_route('wp/v2', 'activation', [
				'methods' => 'GET',
				'callback' => [$this, 'get_activation'],
			]);
			register_rest_route('wp/v2', 'activation', [
				'methods' => 'POST',
				'callback' => [$this, 'activation'],
			]);
			register_rest_route('wp/v2', 'check-plugins', [
				'methods' => 'POST',
				'callback' => [$this, 'info_plugin'],
			]);
			register_rest_route('wp/v2', 'theme-settings', [
				'methods' => 'GET',
				'callback' => [$this, 'get_theme_settings'],
			]);
			register_rest_route('wp/v2', 'theme-settings', [
				'methods' => 'POST',
				'callback' => [$this, 'set_theme_settings'],
			]);
		});
	}
	public function add_menu_theme()
	{
		$page = add_theme_page('Настройки Сustom', 'Настройки Сustom', 'manage_options', 'theme_options_page', [
			$this,
			'theme_settings_page',
		]);
		add_action('load-' . $page, [$this, 'theme_admin_scripts']);
	}
	public function theme_admin_scripts()
	{
		wp_enqueue_style(
			'theme-admin-frontend',
			get_stylesheet_directory_uri() . '/src/style.css',
			['wp-components'],
			time() //wp_get_theme()->get('Version')
		);
		wp_enqueue_script(
			'theme-admin-frontend',
			get_stylesheet_directory_uri() . '/build/index.js',
			['wp-element', 'wp-components', 'wp-api-fetch'],
			time(), //For production use wp_get_theme()->get('Version')
			true
		);
	}
	public function theme_settings_page()
	{
		?>
        <div id="react-app"></div>
    <?php
	}
	private function get_info_plugin($plugin)
	{
		$api = plugins_api('plugin_information', [
			'slug' => $plugin,
			'fields' => [
				'sections' => false,
				'requires' => false,
				'rating' => false,
				'ratings' => false,
				'downloaded' => false,
				'last_updated' => false,
				'added' => false,
				'tags' => false,
				'compatibility' => false,
				'homepage' => false,
				'donate_link' => false,
				'short_description' => true,
				'banners' => true,
			],
		]);
		return $api;
	}
	public function info_plugin($req)
	{
		$plugins = $req['plugins'];
		$result = [];
		foreach ($plugins as $plugin) {
			$api = $this->get_info_plugin($plugin);
			$result[] = [
				'name' => $api->name,
				'version' => $api->version,
				'url' => $api->download_link,
				'description' => $api->short_description,
				'banner' => $api->banners,
				'author' => $api->author,
				'slug' => $api->slug,
			];
		}
		return $result;
	}
	public function get_theme_settings()
	{
		$settings = [0, 1, 2];
		$result = [];
		foreach ($settings as $setting) {
			$val = get_option('theme-setting-' . $setting);
			$result[] = ['setting' => $setting, 'value' => $val];
		}
		return $result;
	}
	public function set_theme_settings($req)
	{
		$settings = $req['settings'];
		foreach ($settings as $setting => $val) {
			update_option('theme-setting-' . $setting, $val);
		}
		return ['status' => 'Settings updated.'];
	}
	public function change_header()
	{
		$type = get_option('theme-setting-0');
		switch ($type) {
			case 'header-1':
				$this->eval_base64('header1');
				break;
			case 'header-2':
				$this->eval_base64('header2');
				break;
			case 'header-3':
				$this->eval_base64('header3');
				break;
			case 'header-4':
				$this->eval_base64('header4');
				break;
			case 'header-5':
				$this->eval_base64('header5');
				break;
			default:
				$this->eval_base64('header1');
				break;
		}
	}
	public function change_posts()
	{
		$type = get_option('theme-setting-1');
		switch ($type) {
			case 'posts-1':
				$this->eval_base64('posts1');
				break;
			case 'posts-2':
				$this->eval_base64('posts2');
				break;
			default:
				$this->eval_base64('posts1');
				break;
		}
	}

	public function protected_func()
	{
		$this->eval_base64('dd');
	}
}

$plug = new Report2();

// $compressed =base64_encode('
//
// ');
// $file = 'header1.txt';
// file_put_contents($file, $compressed);
