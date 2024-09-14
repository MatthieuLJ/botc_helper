import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_goon.png';

const goon: roleType = {
  name: "Goon",
  icon: img,
  type: CharacterType.Outsider,
  ability: "Each night, the 1st player to choose you with their ability is " +
    "drunk until dusk. You become their alignment.",
  action: []
};

export default goon;