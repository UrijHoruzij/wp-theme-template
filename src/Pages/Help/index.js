import { Button } from "@wordpress/components";
import Card from "../../Card";

const PageHelp = () => {
  return (
    <Card
      title="Templates Cloud"
      icon="http://wp.loc/wp-content/themes/neve/assets/img/dashboard/template-cloud.svg"
    >
      <p className="card-description">
        Увеличьте продуктивность и ускорьте свой рабочий процесс, сохраняя все
        свои дизайны и автоматически отправляя их на все свои сайты в одно
        нажатие.
      </p>
      <div>
        <Button variant="primary">Перейти к документации</Button>
      </div>
    </Card>
  );
};
export default PageHelp;
