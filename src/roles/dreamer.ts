import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_dreamer.png';

const dreamer: roleType = {
    name: "Dreamer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose a player (not yourself or Travellers): you " +
        "learn 1 good & 1 evil character, 1 of which is correct.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "dreamer"],
            " learned that player ", [TagTypes.Player, -1], " is either ",
            [TagTypes.Role, ""], " or ", [TagTypes.Role, ""]]
    }
};

export default dreamer;