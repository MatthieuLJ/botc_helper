import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_po.png';

const po: roleType = {
  name: "Po",
  icon: img,
  type: CharacterType.Demon,
  ability: "Each night*, you may choose a player: they die. If your last " +
    "choice was no-one, choose 3 players tonight.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "po"],
    " killed player ", [ChipType.Player, -1], " "],
  canCauseDeath: true,
};

export default po;