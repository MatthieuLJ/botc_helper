import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_slayer.png';

const slayer: roleType = {
    name: "Slayer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "The 1st time you are nominated, if the nominator is a Townsfolk, "
        + "they are executed immediately.",

    actions: {
        "Shoot": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "slayer"],
            " shot ", [EventTypes.Player, -1]]
    }
};

export default slayer;