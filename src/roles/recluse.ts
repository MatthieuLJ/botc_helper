import { roleType, CharacterType } from '../game/role.ts'

const recluse: roleType = {
    name: "Recluse",
    icon: "icon_recluse.png",
    type: CharacterType.Outsider,
    ability: "You might register as evil & as a Minion or Demon, even if " +
        "dead.",

    actions: {}
}

export default recluse;