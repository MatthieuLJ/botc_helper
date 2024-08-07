import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_virgin.png';

const virgin: roleType = {
    name: "Virgin",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "The 1st time you are nominated, if the nominator is a Townsfolk,"
        + " they are executed immediately.",

    actions: {
        "GetNominated": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "virgin"],
            " was nominated by ", [EventTypes.Player, -1]]
    }
};

export default virgin;