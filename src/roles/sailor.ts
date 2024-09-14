import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_sailor.png';

const sailor: roleType = {
  name: "Sailor",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "Each night, choose an alive player: either you or they are drunk " +
    "until dusk. You can't die.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "sailor"],
    " chose to drink with ", [ChipType.Player, -1], " "]
};

export default sailor;