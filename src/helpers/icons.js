import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faXmark,
  faCirclePlus,
  faBars,
  faCircleMinus,
  faPenToSquare,
  faClock,
  faCopyright,
  faTrash,
  faTrashCan,
  faUser,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
    return library.add(
      faXmark,
      faCirclePlus,
      faBars,
      faCircleMinus,
      faPenToSquare,
      faClock,
      faCopyright,
      faTrash,
      faTrashCan,
      faUser,
      faChevronDown,
      faChevronUp,
      faChevronLeft,
      faChevronRight
    );
};

export default Icons;