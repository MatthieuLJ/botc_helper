import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_flowergirl.png';

const flowergirl: roleType = {
    name: "Flowergirl",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn if a Demon voted today.",

    actions: {
        "Learn": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "flowergirl"],
            " learned ?"]
    }
};

export default flowergirl;