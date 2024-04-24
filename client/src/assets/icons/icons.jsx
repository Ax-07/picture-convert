import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTrashAlt, faPenToSquare, faPlus, faChevronUp, faUser, faLightbulb, faClock, faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faCopy, faImage } from '@fortawesome/free-regular-svg-icons';

export const icons = { 
    trash: <FontAwesomeIcon icon={faTrash} /> ,
    trashAlt: <FontAwesomeIcon icon={faTrashAlt} /> ,
    penToSquare: <FontAwesomeIcon icon={faPenToSquare} />,
    add: <FontAwesomeIcon icon={faPlus} />,
    chevronUp: <FontAwesomeIcon icon={faChevronUp} />,
    user: <FontAwesomeIcon icon={faUser} />,
    lightbulb: <FontAwesomeIcon icon={faLightbulb} transform="shrink-3" />,
    clock: <FontAwesomeIcon icon={faClock} />,
    check: <FontAwesomeIcon icon={faCheck} color="#28a745" size="1x" />,
    copy: <FontAwesomeIcon icon={faCopy} />,
    image: <FontAwesomeIcon icon={faImage} />,
    plusCircle: <FontAwesomeIcon icon={faPlusCircle} />
};