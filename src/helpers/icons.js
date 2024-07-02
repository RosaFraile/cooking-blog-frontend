import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faXmark,
  faCirclePlus,
  faBars
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
    return library.add(
      faXmark,
      faCirclePlus,
      faBars
    );
};

export default Icons;