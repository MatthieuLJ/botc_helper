import { roleType, CharacterType } from '../state/role.ts'
import img from './images/icon_baron.png';

const baron: roleType = {
    name: "Baron",
    icon: img,
    type: CharacterType.Minion,
    ability: "There are extra Outsiders in play. [+2 Outsiders]",
    action: []
}

export default baron;