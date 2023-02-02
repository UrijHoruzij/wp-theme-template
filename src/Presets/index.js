const Presets = (props) => {
  const { presets, setChangePreset, changePreset, activated, nameInput } =
    props;
  const checkActivated = (activated) => {
    if (activated) {
      return "none";
    } else {
      return "grayscale(1)";
    }
  };
  return (
    <div className="presets">
      {presets.map((preset) => (
        <div
          className="preset"
          style={{
            backgroundImage: `url(${preset.image})`,
            filter: checkActivated(activated),
          }}
        >
          <input
            type="radio"
            value={preset.name}
            name={nameInput}
            id={`preset-${preset.name}`}
            onChange={() => setChangePreset(`preset-${preset.name}`)}
            checked={changePreset == `preset-${preset.name}`}
            disabled={!activated}
          />
          <label for={`preset-${preset.name}`}>
            <span className="label__inner">
              <i
                className="preview__letter"
                style={{ background: preset.colors[0] }}
              >
                {preset.letter}
              </i>
              <i
                className="preview__letter--checked"
                style={{
                  backgroundColor: preset.colors[0],
                  backgroundImage: `url(${window.location.origin}/wp-content/themes/custom/assets/admin/check.svg)`,
                }}
              ></i>
              {preset.name}
            </span>
          </label>
          <div className="palette">
            {preset.colors.map((color) => (
              <div
                className="palette__item"
                style={{ background: color }}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Presets;
