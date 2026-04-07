import { NavLink } from "react-router-dom";
import "./TopTabs.css";

export default function TopTabs() {
    const getLinkClass = ({ isActive }) =>
        isActive ? "top-tab top-tab--active" : "top-tab";

    return (
        <nav className="top-tabs" aria-label="Page navigation">
            <NavLink to="/" end className={getLinkClass}>
              Monthly
            </NavLink>
            <NavLink to="/weekly" className={getLinkClass}>
              Weekly
            </NavLink>
            <NavLink to="/daily" end className={getLinkClass}>
              Daily
            </NavLink>
            <NavLink to="/process" end className={getLinkClass}>
              Process
            </NavLink>

        </nav>
    )
}