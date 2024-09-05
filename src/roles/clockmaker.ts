import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_clockmaker.png';

const clockmaker: roleType = {
    name: "Clockmaker",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing how many steps from the Demon to its nearest" +
        " Minion.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "clockmaker"],
        " learned a ?"]
};

export default clockmaker;