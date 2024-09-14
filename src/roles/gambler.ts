import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_gambler.png';

const gambler: roleType = {
  name: "Gambler",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "Each night*, choose a player & guess their character: if you " +
    "guess wrong, you die.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "gambler"],
    " gambled that ", [ChipType.Player, -1], " is the ",
    [ChipType.Role, ""], " "]
};

export default gambler;