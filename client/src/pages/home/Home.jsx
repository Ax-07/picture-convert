import { About } from "../../components/about/About";
import { Hero } from "../../components/hero/Hero";
import { SeparateLine } from "../../components/separateLines/SeparateLine";
import waveTop from "../../assets/svg/WaveTop.svg";
import waveBottom from "../../assets/svg/WaveBottom.svg";
import { HowItWorks } from "../../components/howItWorks/HowItWorks";
import { Advice } from "../../components/advice/Advice";

export const Home = () => {
  return (
    <div className="home" data-testid="home">
      <Hero />
      <div className="home__container">
        <img className="home__container-border" src={waveTop} alt="ligne de separation" />
        <HowItWorks />
        <SeparateLine />
        <About />
        <SeparateLine />
        <Advice />
        <img className="home__container-border" src={waveBottom} alt="ligne de separation" />
      </div>
    </div>
  );
};
