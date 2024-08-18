import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_fanggu.png';

const fanggu: roleType = {
    name: "Fang gu",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player: they die. The 1st Outsider this " +
        "kills becomes an evil Fang Gu & you die instead. [+1 Outsider]",

    actions: {
        "Kill": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "Fang Gu"],
            " killed player ", [ChipType.Player, -1]]
    }
};

export default fanggu;