import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_vigormortis.png';

const vigormortis: roleType = {
    name: "Vigormortis",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player: they die. Minions you kill keep " +
        "their ability & poison 1 Townsfolk neighbor. [-1 Outsider]",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "Vogormortis"],
        " killed player ", [ChipType.Player, -1]]
};

export default vigormortis;