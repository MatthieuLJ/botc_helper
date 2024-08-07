import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_butler.png';

const butler: roleType = {
    name: "Butler",
    icon: img,
    type: CharacterType.Outsider,
    ability: "Each night, choose a player (not yourself): tomorrow, you may " +
        "only vote if they are voting too.",

    actions: {
        "ChooseMaster": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "butler"],
            " chose player ", [EventTypes.Player, -1], " as their master "]
    }
};

export default butler;