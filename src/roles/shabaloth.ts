import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_shabaloth.png';

const shabaloth: roleType = {
  name: "Shabaloth",
  icon: img,
  type: CharacterType.Demon,
  ability: "Each night*, choose 2 players: they die. A dead player you chose " +
    "last night might be regurgitated.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "shabaloth"],
    " killed player ", [ChipType.Player, -1], " and ", [ChipType.Player, -1], " "],
  canCauseDeath: true,
};

export default shabaloth;