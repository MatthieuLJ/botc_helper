import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_godfather.png';

const godfather: roleType = {
  name: "Godfather",
  icon: img,
  type: CharacterType.Minion,
  ability: "You start knowing which Outsiders are in play. If 1 died today, " +
    "choose a player tonight: they die. [-1 or +1 Outsider]",
  action: [],
  canCauseDeath: true,
};

export default godfather;