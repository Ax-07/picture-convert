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
import cursorarrow from "../svg/cursorarrow.rays.svg";
import figureWalk from "../svg/figure.walk.motion.svg";
import gaugeOpen from "../svg/gauge.open.with.lines.needle.33percent.and.arrowtriangle.from.0percent.to.50percent.svg";
import photoStack from "../svg/photo.stack.svg";
import faStar from "../svg/faStar.svg";

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
