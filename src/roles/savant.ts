import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_savant.png';

const savant: roleType = {
    name: "Savant",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each day, you may visit the Storyteller to learn 2 things in " +
        "private: 1 is true & 1 is false.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "savant"],
        " learned that either ? or ?"]
};

export default savant;