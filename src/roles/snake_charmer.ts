import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_snakecharmer.png';

const snake_charmer: roleType = {
    name: "Snake Charmer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose an alive player: a chosen Demon swaps " +
        "characters & alignments with you & is then poisoned.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "snake_charmer"],
        " picked ", [ChipType.Player, -1], " "]
};

export default snake_charmer;