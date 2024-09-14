import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_sage.png';

const sage: roleType = {
    name: "Sage",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If the Demon kills you, you learn that it is 1 of 2 players.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "sage"],
        " died and learned that the demon is either ", [ChipType.Player, -1],
        " or ", [ChipType.Player, -1], " "]
};

export default sage;