import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_tealady.png';

const tea_lady: roleType = {
    name: "Tea Lady",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If both your alive neighbors are good, they can't die.",
    action: []
};

export default tea_lady;