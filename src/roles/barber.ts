import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_barber.png';

const barber: roleType = {
    name: "Barber",
    icon: img,
    type: CharacterType.Outsider,
    ability: "If you died today or tonight, the Demon may choose 2 players " +
        "(not another Demon) to swap characters.",

    actions: {
        "Die": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "barber"],
            " died, players ", [EventTypes.Player, -1], " and ",
            [EventTypes.Player, -1], " swapped roles"
        ]
    }
};

export default barber;