import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_grandmother.png';

const grandmother: roleType = {
  name: "Grandmother",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "You start knowing a good player & their character. If the Demon " +
    "kills them, you die too.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "grandmother"],
    " learned that ", [ChipType.Player, -1], " is the ", [ChipType.Role, ""],
    " "]
};

export default grandmother;