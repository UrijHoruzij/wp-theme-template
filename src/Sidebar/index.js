const SidebarSection = (props) => {
  const { title, children } = props;
  return (
    <div className="sidebar-section">
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
};
const Sidebar = (props) => {
  const { children } = props;
  return <aside className="sidebar card">{children}</aside>;
};
Sidebar.Section = SidebarSection;
export default Sidebar;
