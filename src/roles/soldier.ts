import { roleType, CharacterType } from '../game/role.ts'
import img from './images/icon_soldier.png';

const soldier: roleType = {
    name: "Solder",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You are safe from the Demon.",

    actions: {}
}

export default soldier;