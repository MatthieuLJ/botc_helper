import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_courtier.png';

const courtier: roleType = {
  name: "Courtier",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "Once per game, at night, choose a character: they are drunk for " +
    "3 nights & 3 days.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "courtier"],
    " chose to drink with the ", [ChipType.Role, ""], " "]
};

export default courtier;