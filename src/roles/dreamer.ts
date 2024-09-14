import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_dreamer.png';

const dreamer: roleType = {
    name: "Dreamer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose a player (not yourself or Travellers): you " +
        "learn 1 good & 1 evil character, 1 of which is correct.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "dreamer"],
        " learned that player ", [ChipType.Player, -1], " is either ",
        [ChipType.Role, ""], " or ", [ChipType.Role, ""], " "]
};

export default dreamer;