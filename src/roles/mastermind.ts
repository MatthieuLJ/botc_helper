import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_mastermind.png';

const mastermind: roleType = {
    name: "Mastermind",
    icon: img,
    type: CharacterType.Minion,
    ability: "If the Demon dies by execution (ending the game), play for 1 more"+" day. If a player is then executed, their team loses.",
    action: [],
};

export default mastermind;