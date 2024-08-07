import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_monk.png';

const monk: roleType = {
    name: "Monk",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, choose a player (not yourself): they are safe from "
        + "the Demon tonight.",

    actions: {
        "Protect": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "monk"],
            " protected ", [EventTypes.Player, -1]]
    }
};

export default monk;