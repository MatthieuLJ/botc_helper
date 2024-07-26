import { roleType, CharacterType } from '../state/role.ts'
import img from './images/icon_mutant.png';

const mutant: roleType = {
    name: "Mutant",
    icon: img,
    type: CharacterType.Outsider,
    ability: 'If you are "mad" about being an Outsider, you might be ' +
        'executed.',

    actions: {}
}

export default mutant;