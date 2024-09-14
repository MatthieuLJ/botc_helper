import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_pacifist.png';

const pacifist: roleType = {
    name: "Pacifist",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Executed good players might not die.",
    action: []
};

export default pacifist;