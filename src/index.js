const { render, useState, useEffect } = wp.element;
import { Notice, Spinner } from "@wordpress/components";
import packageJson from "../package.json";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

import PageStart from "./Pages/Start";
import PagePlugins from "./Pages/Plugins";
import PageHelp from "./Pages/Help";
import PageFreePro from "./Pages/FreePro";
import PageSettings from "./Pages/Settings";

const Main = () => {
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [plugins, setPlugins] = useState([]);
  const [recommendationPlugins, setRecommendationPlugins] = useState([
    "contact-form-7",
    "polylang",
    "woocommerce",
    "one-click-demo-import",
    "mailpoet",
    "all-in-one-seo-pack",
    "all-in-one-wp-security-and-firewall",
    "all-in-one-wp-migration",
  ]);
  const [notice, setNotice] = useState(null);
  const [noticeMessage, setNoticeMessage] = useState("");

  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([
    {
      name: __("Добро пожаловать", packageJson.name),
    },
    {
      name: __("Настройки", packageJson.name),
    },
    {
      name: __("Сравнение версий", packageJson.name),
    },
    {
      name: __("Плагины", packageJson.name),
    },
    {
      name: __("Помощь", packageJson.name),
    },
  ]);
  const noticeShow = (status, message) => {
    setNotice(status);
    setNoticeMessage(message);
    setTimeout(() => setNotice(false), 5000);
  };

  useEffect(async () => {
    apiFetch({ path: "/wp/v2/activation" }).then((res) => {
      if (res.status == "success") {
        setActivated(true);
      }
    });
    await loadingPlugins(recommendationPlugins);
    setLoading(true);
  }, []);

  const loadingPlugins = async (pluginsList) => {
    let res = await apiFetch({
      path: "/wp/v2/check-plugins",
      method: "POST",
      data: { plugins: pluginsList },
    });
    let toRemove = await apiFetch({
      path: "/wp/v2/plugins",
    });
    setPlugins(
      res.filter((el) => !toRemove.some((rm) => rm.textdomain === el.slug))
    );
  };

  return (
    <div id="neve-dashboard">
      <Header pages={pages} page={page} setPage={setPage} />
      <div className="content-wrap">
        <div className="container content">
          <div className="main">
            {notice && (
              <Notice
                className="custom-notice"
                status={notice}
                isDismissible={false}
              >
                {noticeMessage}
              </Notice>
            )}
            <div className="tab-content columns start">
              <Navigation page={page}>
                <PageStart
                  activated={activated}
                  setActivated={setActivated}
                  loading={loading}
                  noticeShow={noticeShow}
                ></PageStart>
                <PageSettings activated={activated} />
                <PageFreePro />
                {loading ? (
                  <PagePlugins
                    plugins={plugins}
                    recommendationPlugins={recommendationPlugins}
                  />
                ) : (
                  <Spinner />
                )}
                <PageHelp />
              </Navigation>
            </div>
          </div>
          <Sidebar>
            <Sidebar.Section title="Сообщество Neve">
              Делитесь своими мыслями, задавайте вопросы и помогайте друг другу
              в нашем сообществе Neve! Будьте в курсе того, над чем мы работаем,
              и голосуйте, чтобы мы могли правильно расставить приоритеты.
            </Sidebar.Section>
          </Sidebar>
        </div>
      </div>
    </div>
  );
};
render(<Main />, document.getElementById("react-app"));
