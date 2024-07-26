import { roleType, CharacterType } from '../state/role.ts'
import img from './images/icon_recluse.png';

const recluse: roleType = {
    name: "Recluse",
    icon: img,
    type: CharacterType.Outsider,
    ability: "You might register as evil & as a Minion or Demon, even if " +
        "dead.",

    actions: {}
}

export default recluse;