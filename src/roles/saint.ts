import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_saint.png';

const saint: roleType = {
    name: "Saint",
    icon: img,
    type: CharacterType.Outsider,
    ability: "If you die by execution, your team loses.",
    action: []
};

export default saint;