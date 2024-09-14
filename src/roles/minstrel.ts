import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_minstrel.png';

const minstrel: roleType = {
  name: "Minstrel",
  icon: img,
  type: CharacterType.Townsfolk,
  ability: "When a Minion dies by execution, all other players (except " +
    "Travellers) are drunk until dusk tomorrow.",
  action: []
};

export default minstrel;