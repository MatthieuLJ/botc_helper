import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_imp.png';

const imp: roleType = {
    name: "Imp",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player: they die. If you kill yourself " +
        "this way, a Minion becomes the Imp.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "imp"],
        " killed player ", [ChipType.Player, -1]],
    canCauseDeath: true,
};

export default imp;