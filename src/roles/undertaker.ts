import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_undertaker.png';

const undertaker: roleType = {
    name: "Undertaker",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn which character died by execution today.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "undertaker"],
            " learned that ", [EventTypes.Player, -1], " is ",
            [EventTypes.Role, ""],]
    }
};

export default undertaker;