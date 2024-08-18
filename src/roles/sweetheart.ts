import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_sweetheart.png';

const sweetheart: roleType = {
    name: "Sweetheart",
    icon: img,
    type: CharacterType.Outsider,
    ability: "When you die, 1 player is drunk from now on.",

    actions: {
        "Die": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "sweetheart"],
            " died and made ", [ChipType.Player, -1], " drunk"]
    }
};

export default sweetheart;