import { roleType, CharacterType } from '../game/role.ts'

const baron: roleType = {
    name: "Baron",
    icon: "icon_baron.png",
    type: CharacterType.Minion,
    ability: "There are extra Outsiders in play. [+2 Outsiders]",

    actions: {}
}

export default baron;