import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_tinker.png';

const tinker: roleType = {
  name: "Tinker",
  icon: img,
  type: CharacterType.Outsider,
  ability: "You might die at any time.",
  action: []
};

export default tinker;