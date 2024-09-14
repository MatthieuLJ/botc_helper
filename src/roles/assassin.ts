import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_assassin.png';

const assassin: roleType = {
  name: "Assassin",
  icon: img,
  type: CharacterType.Minion,
  ability: "Once per game, at night*, choose a player: they die, even if for " +
    "some reason they could not.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "assassin"],
    " killed ", [ChipType.Player, -1], " "],
  canCauseDeath: true,
};

export default assassin;