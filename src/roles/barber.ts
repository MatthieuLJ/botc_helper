import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_barber.png';

const barber: roleType = {
    name: "Barber",
    icon: img,
    type: CharacterType.Outsider,
    ability: "If you died today or tonight, the Demon may choose 2 players " +
        "(not another Demon) to swap characters.",

    actions: {
        "Die": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "barber"],
            " died, players ", [TagTypes.Player, -1], " and ",
            [TagTypes.Player, -1], " swapped roles"
        ]
    }
};

export default barber;