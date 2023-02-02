import Plugin from '../../Plugin';
import packageJson from '../../../package.json';

const PagePlugins = (props) => {
	const { plugins, setPlugins } = props;
	const checkInstallPlugins = async () => {
		let toRemove = await apiFetch({
			path: '/wp/v2/plugins',
		});
		setPlugins(plugins.filter((el) => !toRemove.some((rm) => rm.textdomain === el.slug)));
	};
	return (
		<>
			{plugins.length > 0 ? (
				plugins.map((plugin) => <Plugin plugin={plugin} checkInstallPlugins={checkInstallPlugins} />)
			) : (
				<div>{__('Все рекомендованные плагины загружены', packageJson.name)}</div>
			)}
		</>
	);
};
export default PagePlugins;
