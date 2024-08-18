import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_poisoner.png';

const poisoner: roleType = {
    name: "Poisoner",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, choose a player: they are poisoned tonight and " +
        "tomorrow day.",

    actions: {
        "Poison": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "poisoner"],
            " poisoned ", [ChipType.Player, -1]]
    }
};

export default poisoner;