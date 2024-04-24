import { Navbar } from "../../components/navigation/navbar/Navbar";

export const Header = () => {
    return (
        <header className="header" data-testid='header'>
            <Navbar />
        </header>
    );
};
