const Card = (props) => {
  const { children, title, icon, fullWidth } = props;
  return (
    <div className={`card ${fullWidth ? "fullWidth" : ""}`}>
      <div className="card-header">
        <img className="icon" src={icon} alt="icon" />
        <h3 className="title">{title}</h3>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};
export default Card;
