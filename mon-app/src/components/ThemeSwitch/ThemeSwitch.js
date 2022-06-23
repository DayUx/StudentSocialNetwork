import {faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function ThemeSwitch() {
    return (<button className={"theme-switch"}>
            <FontAwesomeIcon icon={faSun}/>
        </button>)
}