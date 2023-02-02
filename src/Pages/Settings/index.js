const { useState } = wp.element;
import apiFetch from '@wordpress/api-fetch';
import Layouts from '../../Layouts';
import Presets from '../../Presets';

const PageSettings = (props) => {
	const { activated } = props;
	const [settingHeader, setSettingHeader] = useState('header-1');
	const [settingPosts, setSettingPosts] = useState('posts-1');
	const [changePreset, setChangePreset] = useState('preset-Sweet');
	const headers = [
		{
			name: 'header 1',
			slug: 'header-1',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/header-1.jpg`,
			premium: false,
		},
		{
			name: 'header 2',
			slug: 'header-2',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/header-2.jpg`,
			premium: true,
		},
		{
			name: 'header 3',
			slug: 'header-3',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/header-3.jpg`,
			premium: true,
		},
		{
			name: 'header 4',
			slug: 'header-4',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/header-4.jpg`,
			premium: true,
		},
		{
			name: 'header 5',
			slug: 'header-5',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/header-5.jpg`,
			premium: true,
		},
	];
	const posts = [
		{
			name: 'posts 1',
			slug: 'posts-1',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/posts-1.jpg`,
			premium: false,
		},
		{
			name: 'posts 2',
			slug: 'posts-2',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/posts-2.jpg`,
			premium: true,
		},
	];
	const presets = [
		{
			name: 'Sweet',
			letter: 'A',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/preset-0.jpg`,
			colors: ['#332728', '#6d5456', '#792c20', '#f7f2ee', '#f5f0ea'],
		},
		{
			name: 'Tart',
			letter: 'P',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/preset-1.jpg`,
			colors: ['#211e24', '#2e2a32', '#5a5a70', '#fcfcfd', '#ebecf0'],
		},
		{
			name: 'Sour',
			letter: 'P',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/preset-2.jpg`,
			colors: ['#1a1d16', '#3b4133', '#ddaa3c', '#f4f5fb', '#e8ebf6'],
		},
		{
			name: 'Spicy',
			letter: 'P',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/preset-3.jpg`,
			colors: ['#312e2e', '#5c5757', '#c9542e', '#ececef', '#d6d7dc'],
		},
		{
			name: 'Sweet & Sour',
			letter: 'P',
			image: `${window.location.origin}/wp-content/themes/custom/assets/admin/preset-4.jpg`,
			colors: ['#282e24', '#5a6751', '#a5b453', '#f5f1f0', '#ebe3e0'],
		},
	];

	const setSettings = async () => {
		let res = await apiFetch({
			path: '/wp/v2/theme-settings',
			method: 'POST',
			data: { settings: [settingHeader, settingPosts, changePreset] },
		});
	};
	const getSettings = async () => {
		let res = await apiFetch({
			path: '/wp/v2/theme-settings',
		});
	};
	useEffect(async () => {
		await getSettings();
	});
	return (
		<div className="card settings">
			<h3 className="heading">Выбрать макет</h3>
			<Layouts
				nameInput="header"
				layouts={headers}
				setChangeLayout={setSettingHeader}
				changeLayout={settingHeader}
				activated={activated}
			/>
			<h3 className="heading">Выбрать макет записей</h3>
			<Layouts
				nameInput="posts"
				layouts={posts}
				setChangeLayout={setSettingPosts}
				changeLayout={settingPosts}
				activated={activated}
			/>
			<h3 className="heading">Выбрать пресет</h3>
			<Presets
				activated={activated}
				nameInput="preset"
				presets={presets}
				changePreset={changePreset}
				setChangePreset={setChangePreset}
			/>
		</div>
	);
};
export default PageSettings;
