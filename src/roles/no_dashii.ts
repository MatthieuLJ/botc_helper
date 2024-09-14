import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_nodashii.png';

const no_dashii: roleType = {
    name: "No Dashii",
    icon: img,
    type: CharacterType.Demon,
    ability: "ach night*, choose a player: they die. Your 2 Townsfolk " +
        "neighbors are poisoned.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "no_dashii"],
        " killed player ", [ChipType.Player, -1], " "],
    canCauseDeath: true,
};

export default no_dashii;