import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_devils_advocate.png';

const devils_advocate: roleType = {
  name: "Devil's advocate",
  icon: img,
  type: CharacterType.Minion,
  ability: "Each night, choose a living player (different to last night): if executed tomorrow, they don't die.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "devils_advocate"],
    " protected ", [ChipType.Player, -1], " "]
};

export default devils_advocate;