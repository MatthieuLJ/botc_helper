import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_gossip.png';

const gossip: roleType = {
  name: "Gossip",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "Each day, you may make a public statement. Tonight, if it was " +
    "true, a player dies.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "gossip"],
    " gossiped that ?"]
};

export default gossip;