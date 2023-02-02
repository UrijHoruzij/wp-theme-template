const { useState } = wp.element;
import packageJson from "../../../package.json";
import { __ } from "@wordpress/i18n";
import { Button, TextControl } from "@wordpress/components";
import Card from "../../Card";

const PageStart = (props) => {
  const { activated, setActivated, loading, noticeShow } = props;
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [activating, setActivating] = useState(false);

  const activation = () => {
    if (code != "" && email != "") {
      setActivating(true);
      apiFetch({
        path: "/wp/v2/activation",
        method: "POST",
        data: { code: code, email: email },
      }).then((res) => {
        setActivated(true);
        noticeShow(res.status, res.message);
        setActivating(false);
      });
    }
  };
  return (
    <>
      {!activated && loading && (
        <Card
          title={__("Активация", packageJson.name)}
          icon="http://wp.loc/wp-content/themes/neve/assets/img/dashboard/squares.svg"
        >
          <TextControl
            label="Email"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <TextControl
            label="Code"
            value={code}
            onChange={(value) => setCode(value)}
          />
          <Button isBusy={activating} variant="primary" onClick={activation}>
            Активировать
          </Button>
        </Card>
      )}
      <Card
        title="Готовы начать? Проверьте справку и документы"
        icon="http://wp.loc/wp-content/themes/neve/assets/img/dashboard/page.svg"
      >
        <p className="card-description">
          Нужны еще подробности? Пожалуйста, ознакомьтесь с нашей полной
          документацией для получения подробной информации о том, как
          использовать Neve.
        </p>
        <Button variant="primary">Перейти к документации</Button>
      </Card>
      <Card
        title="Быстрые ссылки кастомизатора"
        icon="http://wp.loc/wp-content/themes/neve/assets/img/dashboard/compass.svg"
      >
        <a
          href="http://wp.loc/wp-admin/customize.php?autofocus[control]=custom_logo"
          className="components-button is-link"
        >
          Загрузить логотип
        </a>
        <hr />
        <a
          href="http://wp.loc/wp-admin/customize.php?autofocus[section]=neve_colors_background_section"
          className="components-button is-link"
        >
          Установить цвет
        </a>
        <hr />
        <a
          href="http://wp.loc/wp-admin/customize.php?autofocus[control]=neve_headings_font_family"
          className="components-button is-link"
        >
          Настройка шрифтов
        </a>
        <hr />
        <a
          href="http://wp.loc/wp-admin/customize.php?autofocus[panel]=neve_layout"
          className="components-button is-link"
        >
          Настройки Макета
        </a>
        <a
          href="http://wp.loc/wp-admin/customize.php?autofocus[panel]=hfg_header"
          className="components-button is-link"
        >
          Настройки заголовка
        </a>
        <hr />
        <a
          href="http://wp.loc/wp-admin/customize.php?autofocus[section]=neve_blog_archive_layout"
          className="components-button is-link"
        >
          Макеты блога
        </a>
        <hr />
        <a
          href="http://wp.loc/wp-admin/customize.php?autofocus[panel]=hfg_footer"
          className="components-button is-link"
        >
          Настройки нижнего блока
        </a>
        <hr />
        <a
          href="http://wp.loc/wp-admin/customize.php?autofocus[section]=neve_sidebar"
          className="components-button is-link"
        >
          Содержимое / Боковая панель
        </a>
      </Card>
    </>
  );
};
export default PageStart;
