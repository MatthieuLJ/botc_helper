import { roleType, CharacterType } from '../game/role.ts'

const spy: roleType = {
    name: "Spy",
    icon: "icon_spy.png",
    type: CharacterType.Minion,
    ability: "Each night, you see the Grimoire. You might register as good & "
        + "as a Townsfolk or Outsider, even if dead.",

    actions: {}
}

export default spy;