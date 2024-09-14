import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_chambermaid.png';

const chambermaid: roleType = {
  name: "Chambermaid",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "Each night, choose 2 alive players (not yourself): you learn how " +
    "many woke tonight due to their ability.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "chambermaid"], " chose ",
    [ChipType.Player, -1], " and ", [ChipType.Player, -1], "and learned a ?"]
};

export default chambermaid;