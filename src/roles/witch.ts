import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_witch.png';

const witch: roleType = {
    name: "Witch",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, choose a player: if they nominate tomorrow, they " +
        "die. If just 3 players live, you lose this ability.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "witch"],
        " cursed ", [ChipType.Player, -1], " "],
    canCauseDeath: true,
};

export default witch;