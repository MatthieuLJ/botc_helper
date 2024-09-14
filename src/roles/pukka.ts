import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_pukka.png';

const pukka: roleType = {
  name: "Pukka",
  icon: img,
  type: CharacterType.Demon,
  ability: "Each night, choose a player: they are poisoned. The previously " +
    "poisoned player dies then becomes healthy.",
  action: ["On", [ChipType.Time, -1], ", player ",
    [ChipType.Player, -1], " as the ", [ChipType.Role, "pukka"],
    " killed player ", [ChipType.Player, -1], " "],
  canCauseDeath: true,
};

export default pukka;