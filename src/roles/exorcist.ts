import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_exorcist.png';

const exorcist: roleType = {
  name: "Exorcist",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "Each night, you learn how many of your 2 alive neighbors are " +
    "evil.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "exorcist"],
    " chose ", [ChipType.Player, -1], " "]
};

export default exorcist;