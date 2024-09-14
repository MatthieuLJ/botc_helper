import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_towncrier.png';

const town_crier: roleType = {
    name: "Town crier",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn if a Minion nominated today.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "town_crier"],
        " learned ?"]
};

export default town_crier;