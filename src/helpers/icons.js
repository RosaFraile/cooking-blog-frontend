import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faXmark,
  faCirclePlus,
  faBars,
  faCircleMinus,
  faPenToSquare,
  faClock,
  faCopyright
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
    return library.add(
      faXmark,
      faCirclePlus,
      faBars,
      faCircleMinus,
      faPenToSquare,
      faClock,
      faCopyright
    );
};

export default Icons;