import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_butler.png';

const butler: roleType = {
    name: "Butler",
    icon: img,
    type: CharacterType.Outsider,
    ability: "Each night, choose a player (not yourself): tomorrow, you may " +
        "only vote if they are voting too.",

    actions: {
        "ChooseMaster": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "butler"],
            " chose player ", [ChipType.Player, -1], " as their master "]
    }
};

export default butler;