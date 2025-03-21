import { NavLink } from "react-router";
import { routes } from "../routes";
import "./navbar.scss";

export default function NavBar() {
    return (
        <nav>
            <NavList />
        </nav>
    )
}

function NavList() {
    return (
        <ul>
            {routes.map((r,i) => (
                <NavItem route={r.route} display={r.display} key={i} />
            ))}
        </ul>
    )
}

function NavItem({ route, display }: { route: string, display: string }) {
    return (
        <li>
            <NavLink to={route}>{display}</NavLink>
        </li>
    )
}