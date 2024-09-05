import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_pithag.png';

const pithag: roleType = {
    name: "Pit-Hag",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night*, choose a player & a character they become (if not" +
        " in play). If a Demon is made, deaths tonight are arbitrary.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "pit hag"],
        " changed ", [ChipType.Player, -1], " into ", [ChipType.Role, ""]]
};

export default pithag;