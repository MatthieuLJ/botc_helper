import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_cerenovus.png';

const cerenovus: roleType = {
    name: "Cerenovus",
    icon: img,
    type: CharacterType.Minion,
    ability: 'Each night, choose a player & a good character: they are "mad"' +
        ' they are this character tomorrow, or might be executed.',
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "cerenovus"],
        " chose player ", [ChipType.Player, -1], " to be mad as the ",
        [ChipType.Role, ""], " "],
    canCauseDeath: true,
};

export default cerenovus;