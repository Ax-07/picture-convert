import { SeparateLine } from "../../components/separateLines/SeparateLine";
import { StepByStep } from "../../components/stepByStep/StepByStep";

export const Home = () => {
    return (
        <div className="home" data-testid="home">
            <header className="home__header">
                <h1 role="heading-home-title">Picture Convert</h1>
            </header>
            <SeparateLine />
            <StepByStep />
            <SeparateLine />
        </div>
    );
};
