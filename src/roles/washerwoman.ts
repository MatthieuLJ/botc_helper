import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_washerwoman.png';

const washerwoman: roleType = {
    name: "Washerwoman",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing that 1 of 2 players is a particular " +
        "Townsfolk.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "washerwoman"],
        " learned that either ", [ChipType.Player, -1], " or ",
        [ChipType.Player, -1], " is the ", [ChipType.Role, ""], " "]
};

export default washerwoman;