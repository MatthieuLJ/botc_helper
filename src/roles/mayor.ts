import { roleType, CharacterType } from '../game/role.ts'

const mayor: roleType = {
    name: "Mayor",
    icon: "icon_mayor.png",
    type: CharacterType.Townsfolk,
    ability: "If only 3 players live & no execution occurs, your team wins. " +
        "If you die at night, another player might die instead.",

    actions: {}
}

export default mayor;