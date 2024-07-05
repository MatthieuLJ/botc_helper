import { roleType, CharacterType } from '../game/role.ts'

const soldier: roleType = {
    name: "Solder",
    icon: "icon_soldier.png",
    type: CharacterType.Townsfolk,
    ability: "You are safe from the Demon.",

    actions: {}
}

export default soldier;