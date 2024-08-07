import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_empath.png';

const empath: roleType = {
    name: "Empath",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, you learn how many of your 2 alive neighbors are " +
        "evil.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "empath"],
            " learned a ?"]
    }
};

export default empath;