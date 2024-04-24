import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    const logo = "Picture convert"
    return (
        <nav className='navbar' data-testid='navbar'>
            <ul className='navbar__list'>
                <li className='navbar__item' data-testid='logo'><NavLink to="/" className='navbar__link'><h1>{logo}</h1></NavLink></li>
                <li className='navbar__item'><NavLink to="/convert" className='navbar__link'>Convert</NavLink></li>
                <li className='navbar__item'><NavLink to="/compress" className='navbar__link'>Compress</NavLink></li>
                <li className='navbar__item'><NavLink to="/multi-size" className='navbar__link'>Multi-size</NavLink></li>
                <li className='navbar__item'><NavLink to="/guide" className='navbar__link'>Guide</NavLink></li>
            </ul>
        </nav>
    );
};