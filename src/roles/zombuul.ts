import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_zombuul.png';

const zombuul: roleType = {
  name: "Zombuul",
  icon: img,
  type: CharacterType.Demon,
  ability: "Each night*, if no-one died today, choose a player: they die. " +
    "The 1st time you die, you live but register as dead.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "zombuul"],
    " killed player ", [ChipType.Player, -1], " "],
  canCauseDeath: true,
};

export default zombuul;