import { NavLink } from "react-router-dom";

export const BtnStart = () => {
    return (
        <NavLink to="/application" className="hero__link btn hero__btn-start">Commencer</NavLink>
    );
};