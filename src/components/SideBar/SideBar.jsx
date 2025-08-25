import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={avatar} alt="User Avatar" />
        <p className="sidebar__username">User Name</p>
      </div>
    </aside>
  );
}

export default SideBar;
