import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_clockmaker.png';

const clockmaker: roleType = {
    name: "Clockmaker",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing how many steps from the Demon to its nearest" +
        " Minion.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "clockmaker"],
            " learned a ?"]
    }
};

export default clockmaker;