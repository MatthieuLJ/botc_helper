import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_fool.png';

const fool: roleType = {
    name: "Fool",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "The first time you die, you don't.",
    action: []
};

export default fool;