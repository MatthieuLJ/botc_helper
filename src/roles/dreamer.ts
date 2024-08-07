import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_dreamer.png';

const dreamer: roleType = {
    name: "Dreamer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose a player (not yourself or Travellers): you " +
        "learn 1 good & 1 evil character, 1 of which is correct.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "dreamer"],
            " learned that player ", [EventTypes.Player, -1], " is either ",
            [EventTypes.Role, ""], " or ", [EventTypes.Role, ""]]
    }
};

export default dreamer;