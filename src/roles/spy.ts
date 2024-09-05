import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_spy.png';

const spy: roleType = {
    name: "Spy",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, you see the Grimoire. You might register as good & "
        + "as a Townsfolk or Outsider, even if dead.",
    action: []
};

export default spy;