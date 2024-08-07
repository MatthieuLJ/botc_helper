import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_flowergirl.png';

const flowergirl: roleType = {
    name: "Flowergirl",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn if a Demon voted today.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "flowergirl"],
            " learned ?"]
    }
};

export default flowergirl;