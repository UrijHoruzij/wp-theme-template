const Navigation = (props) => {
  const { page, children } = props;
  return (
    <>
      {children.map((item, index) => (
        <div className={`panel ${page === index ? "activ" : ""}`}>{item}</div>
      ))}
    </>
  );
};

export default Navigation;
