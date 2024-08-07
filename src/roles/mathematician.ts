import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_mathematician.png';

const mathematician: roleType = {
    name: "Mathematician",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, you learn how many players' abilities worked " +
        "abnormally (since dawn) due to another character's ability.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "mathematician"],
            " learned a ?"]
    }
};

export default mathematician;