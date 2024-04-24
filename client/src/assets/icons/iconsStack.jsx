/* eslint-disable react-refresh/only-export-components */
// components.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faJs, faCss3Alt, faReact, faSass, faNode, faDocker, faAws, faCodepen, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import sqlite from '../../assets/icons/img/sqlite-ar21.svg';
import mongoDb from '../../assets/icons/img/mongodb-ar21.svg';

const colors = {
  html: '#dd4b25',
  js: '#f7e025',
  css: '#008ccc',
  react: '#66dbfb',
  sass: '#c76494',
  node: '#58a149',
  docker: '#0db7ed',
  aws: '#f79400',
  codepen: '#333',
  github: '#333',
  linkedin: '#2f6cb4',
  globe: '#fff',
};

export const HtmlIcon = () => <FontAwesomeIcon icon={faHtml5} className='stack__icon' style={{color: colors.html}} />;
export const JavascriptIcon = () => <FontAwesomeIcon icon={faJs} className='stack__icon' style={{color: colors.js}} />;
export const CssIcon = () => <FontAwesomeIcon icon={faCss3Alt} className='stack__icon' style={{color: colors.css}} />;
export const ReactIcon = () => <FontAwesomeIcon icon={faReact} className='stack__icon' style={{color: colors.react}} />;
export const SassIcon = () => <FontAwesomeIcon icon={faSass} className='stack__icon' style={{color: colors.sass}} />;
export const NodeIcon = () => <FontAwesomeIcon icon={faNode} className='stack__icon' style={{color: colors.node}} />;
export const DockerIcon = () => <FontAwesomeIcon icon={faDocker} className='stack__icon' style={{color: colors.docker}} />;
export const AwsIcon = () => <FontAwesomeIcon icon={faAws} className='stack__icon' style={{color: colors.aws}} />;
export const CodepenIcon = () => <FontAwesomeIcon icon={faCodepen} className='stack__icon' style={{color: colors.codepen}} />;
export const GithubIcon = () => <FontAwesomeIcon icon={faGithub} className='stack__icon' style={{color: colors.github}} />;
export const LinkedinIcon = () => <FontAwesomeIcon icon={faLinkedin} className='stack__icon' style={{color: colors.linkedin}} />;
export const GlobeIcon = () => <FontAwesomeIcon icon={faGlobe} className='stack__icon' style={{color: colors.globe}} />;
export const SqliteIcon = () => <img src={sqlite} alt='sqlite icon' className='stack__icon' />;
export const MongodbIcon = () => <img src={mongoDb} alt='mongodb icon' className='stack__icon' />;

export const iconsStack = [
  { name: 'html', component: <HtmlIcon /> },
  { name: 'javascript' || 'js', component: <JavascriptIcon /> },
  { name: 'css', component: <CssIcon /> },
  { name: 'react', component: <ReactIcon /> },
  { name: 'sass', component: <SassIcon /> },
  { name: 'node', component: <NodeIcon /> },
  { name: 'docker', component: <DockerIcon /> },
  { name: 'aWS', component: <AwsIcon /> },
  { name: 'codepen', component: <CodepenIcon /> },
  { name: 'github', component: <GithubIcon /> },
  { name: 'linkedin', component: <LinkedinIcon /> },
  { name: 'globe', component: <GlobeIcon /> },
  { name: 'sqlite', component: <SqliteIcon /> },
  { name: 'mongodb', component: <MongodbIcon /> },
];

// exemple
// 
// import { CodepenIcon, GithubIcon, LinkedinIcon } from "../../utils/icons/iconsStack";
//
// const lienCodePen = "https://codepen.io/ax-07";
// 
// <a href={lienCodePen} target="_blank" rel="noopener noreferrer" aria-label="Lien vers mon profil CodePen">  
//    <CodepenIcon />
// </a>
