import { roleType, CharacterType } from '../game/role.ts'
import img from './images/icon_mayor.png';

const mayor: roleType = {
    name: "Mayor",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If only 3 players live & no execution occurs, your team wins. " +
        "If you die at night, another player might die instead.",

    actions: {}
}

export default mayor;