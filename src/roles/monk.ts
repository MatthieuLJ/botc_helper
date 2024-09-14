import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_monk.png';

const monk: roleType = {
    name: "Monk",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, choose a player (not yourself): they are safe from "
        + "the Demon tonight.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "monk"],
        " protected ", [ChipType.Player, -1], " "]
};

export default monk;