import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_mathematician.png';

const mathematician: roleType = {
    name: "Mathematician",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, you learn how many players' abilities worked " +
        "abnormally (since dawn) due to another character's ability.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "mathematician"],
        " learned a ?"]
};

export default mathematician;