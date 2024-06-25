import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faTrashAlt,
  faPenToSquare,
  faPlus,
  faChevronUp,
  faUser,
  faLightbulb,
  faClock,
  faCheck,
  faPlusCircle,
  faCloudUpload,
  faSliders,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy, faImage } from "@fortawesome/free-regular-svg-icons";
import cursorarrow from "./img/cursorarrow.rays.png";
import figureWalk from "./img/figure.walk.motion.png";
import gaugeOpen from "./img/gauge.open.with.lines.needle.33percent.and.arrowtriangle.from.0percent.to.50percent.png";
import photoStack from "./img/photo.stack.png";
import faStar from "./img/faStar.png";

export const icons = {
  trash: <FontAwesomeIcon icon={faTrash} />,
  trashAlt: <FontAwesomeIcon icon={faTrashAlt} />,
  penToSquare: <FontAwesomeIcon icon={faPenToSquare} />,
  add: <FontAwesomeIcon icon={faPlus} />,
  chevronUp: <FontAwesomeIcon icon={faChevronUp} />,
  user: <FontAwesomeIcon icon={faUser} />,
  lightbulb: <FontAwesomeIcon icon={faLightbulb} transform="shrink-3" />,
  clock: <FontAwesomeIcon icon={faClock} />,
  check: <FontAwesomeIcon icon={faCheck} color="#28a745" size="1x" />,
  copy: <FontAwesomeIcon icon={faCopy} />,
  image: <FontAwesomeIcon icon={faImage} />,
  plusCircle: <FontAwesomeIcon icon={faPlusCircle} />,
  cloudUpload: <FontAwesomeIcon icon={faCloudUpload} />,
  sliders: <FontAwesomeIcon icon={faSliders} />,
  download: <FontAwesomeIcon icon={faDownload} />,
  cursorArrow: cursorarrow,
  figureWalk: figureWalk,
  gaugeOpen: gaugeOpen,
  photoStack: photoStack,
  faStar: faStar,
};
