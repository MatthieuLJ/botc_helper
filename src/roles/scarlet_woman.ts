import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_scarletwoman.png';

const scarlet_woman: roleType = {
    name: "Scarlet Woman",
    icon: img,
    type: CharacterType.Minion,
    ability: "If there are 5 or more players alive & the Demon dies, you " +
        "become the Demon. (Travellers don't count)",
    action: []
};

export default scarlet_woman;