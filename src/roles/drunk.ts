import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_drunk.png';

const drunk: roleType = {
    name: "Drunk",
    icon: img,
    type: CharacterType.Outsider,
    ability: "You do not know you are the Drunk. You think you are a Townsfolk"
        + " character, but you are not.",
    action: []
};

export default drunk;