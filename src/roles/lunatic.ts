import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_lunatic.png';

const lunatic: roleType = {
  name: "Lunatic",
  icon: img,
  type: CharacterType.Outsider,
  ability: "You think you are a Demon, but you are not. The Demon knows who " +
    "you are & who you choose at night.",
  action: []
};

export default lunatic;