const Layouts = (props) => {
	const { layouts, setChangeLayout, changeLayout, activated, nameInput } = props;
	const checkActivated = (activated, layout) => {
		if (layout.premium) {
			if (activated) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	};
	return (
		<div className="layouts">
			{layouts.map((layout) => (
				<div className="layout">
					<input
						type="radio"
						value={layout.name}
						name={nameInput}
						id={layout.name}
						onChange={() => setChangeLayout(layout.slug)}
						checked={changeLayout == layout.slug}
						disabled={checkActivated(activated, layout)}
					/>
					<label for={layout.name}>
						<img src={layout.image} alt={layout.name} />
						{layout.name}
					</label>
				</div>
			))}
		</div>
	);
};
export default Layouts;
