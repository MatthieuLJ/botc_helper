import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_innkeeper.png';

const innkeeper: roleType = {
  name: "Innkeeper",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "Each night*, choose 2 players: they can't die tonight, but 1 is " +
    "drunk until dusk.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "innkeeper"], " chose ",
    [ChipType.Player, -1], " and ", [ChipType.Player, -1], " "]
};

export default innkeeper;