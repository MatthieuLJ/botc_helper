import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_moonchild.png';

const moonchild: roleType = {
  name: "Moonchild",
  icon: img,
  type: CharacterType.Outsider,
  ability: "When you learn that you died, publicly choose 1 alive player. " +
    "Tonight, if it was a good player, they die.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "moonchild"],
    " picked ", [ChipType.Player, -1], " "]
};

export default moonchild;