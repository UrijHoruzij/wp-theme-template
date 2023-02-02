import { Dashicon } from "@wordpress/components";
import packageJson from "../../../package.json";
import { __ } from "@wordpress/i18n";

const PageFreePro = () => {
  return (
    <table className="card table">
      <tbody className="table-body">
        <tr className="table-head">
          <th className="large"></th>
          <th className="indicator">Custom</th>
          <th className="indicator">Custom Pro</th>
        </tr>
        <tr className="feature-row">
          <td className="large">
            <h4>{__("Presets", packageJson.name)}</h4>
          </td>
          <td className="indicator error">
            <Dashicon icon="no-alt" />
          </td>
          <td className="indicator success">
            <Dashicon icon="yes" />
          </td>
        </tr>
        <tr className="feature-row">
          <td className="large">
            <h4>{__("Header", packageJson.name)}</h4>
          </td>
          <td className="indicator error">
            <Dashicon icon="no-alt" />
          </td>
          <td className="indicator success">
            <Dashicon icon="yes" />
          </td>
        </tr>
        <tr className="feature-row">
          <td className="large">
            <h4>{__("Posts type", packageJson.name)}</h4>
          </td>
          <td className="indicator error">
            <Dashicon icon="no-alt" />
          </td>
          <td className="indicator success">
            <Dashicon icon="yes" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default PageFreePro;
