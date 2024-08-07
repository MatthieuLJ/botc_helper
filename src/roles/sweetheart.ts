import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_sweetheart.png';

const sweetheart: roleType = {
    name: "Sweetheart",
    icon: img,
    type: CharacterType.Outsider,
    ability: "When you die, 1 player is drunk from now on.",

    actions: {
        "Die": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "sweetheart"],
            " died and made ", [EventTypes.Player, -1], " drunk"]
    }
};

export default sweetheart;