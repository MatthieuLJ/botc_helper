import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_ravenkeeper.png';

const ravenkeeper: roleType = {
    name: "Ravenkeeper",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If you die at night, you are woken to choose a player: you " +
        "learn their character.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "ravenkeeper"],
        " died and learned that ", [ChipType.Player, -1], " is the ",
        [ChipType.Role, ""]]
};

export default ravenkeeper;