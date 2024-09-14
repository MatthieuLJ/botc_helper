import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_professor.png';

const professor: roleType = {
  name: "Professor",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "Once per game, at night*, choose a dead player: if they are a " +
    "Townsfolk, they are resurrected.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "professor"],
    " chose to revive ", [ChipType.Player, -1], " "]
};

export default professor;