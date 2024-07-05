import { roleType, CharacterType } from '../game/role.ts'

const mutant: roleType = {
    name: "Mutant",
    icon: "icon_mutant.png",
    type: CharacterType.Outsider,
    ability: 'If you are "mad" about being an Outsider, you might be ' +
        'executed.',

    actions: {}
}

export default mutant;