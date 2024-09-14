import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_klutz.png';

const klutz: roleType = {
    name: "Klutz",
    icon: img,
    type: CharacterType.Outsider,
    ability: "When you learn that you died, publicly choose 1 alive player: " +
        "if they are evil, your team loses.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "klutz"],
        " picked ", [ChipType.Player, -1], " "]
};

export default klutz;