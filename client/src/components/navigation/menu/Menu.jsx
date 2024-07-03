import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";

export const Menu = ({navData}) => {
    return (
        <ul className='application__menu'>
            {navData.map((item) => (
                <li key={item.id}>
                    <BtnMenu data={item}/>
                </li>
            ))}
            
        </ul>
    );
};

const BtnMenu = ({ data }) => {
    const location = useLocation();
    const activeLink = location.pathname + location.hash;

    return (
        <NavLink to={data.link} className={`btn btn-menu ${activeLink === data.link ? "btn-menu--active" : ""}`}>
            {data.icon}
            {data.name}
        </NavLink>
    );
};

BtnMenu.propTypes = {
    data: PropTypes.object.isRequired,
};

Menu.propTypes = {
    navData: PropTypes.array.isRequired,
};