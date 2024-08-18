import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_nodashii.png';

const nodashii: roleType = {
    name: "No Dashii",
    icon: img,
    type: CharacterType.Demon,
    ability: "ach night*, choose a player: they die. Your 2 Townsfolk " +
        "neighbors are poisoned.",

    actions: {
        "Kill": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "No Dashii"],
            " killed player ", [ChipType.Player, -1]]
    }
};

export default nodashii;