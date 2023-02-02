const { useState } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { Button } from "@wordpress/components";
import packageJson from "../../package.json";
import { __ } from "@wordpress/i18n";

const Plugin = (props) => {
  const { plugin, checkInstallPlugins } = props;
  const [installing, setInstalling] = useState(false);

  const install = async (slug) => {
    if (!installing) {
      setInstalling(true);
      let res = await apiFetch({
        path: "/wp/v2/plugins",
        method: "POST",
        data: { slug: slug, status: "active" },
      });
      setInstalling(false);
      checkInstallPlugins();
    }
  };
  return (
    <div class="card plugin">
      <div class="card-header">
        <img
          className="plugin-image"
          src={plugin.banner.low}
          alt={plugin.name}
        />
      </div>
      <div class="card-body">
        <h3 class="card-title">{plugin.name}</h3>
        <p class="card-description">{plugin.description}</p>
      </div>
      <div class="card-footer">
        <div class="plugin-data">
          <span class="version">v{plugin.version} | </span>
          <span
            class="author"
            dangerouslySetInnerHTML={{ __html: plugin.author }}
          ></span>
        </div>
        <Button
          isBusy={installing}
          variant="primary"
          onClick={() => install(plugin.slug)}
        >
          {installing
            ? __("Установка", packageJson.name)
            : __("Установить", packageJson.name)}
        </Button>
      </div>
    </div>
  );
};
export default Plugin;
