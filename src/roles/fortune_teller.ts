import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_fortuneteller.png';

const fortune_teller: roleType = {
    name: "Fortune Teller",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose 2 players: you learn if either is a Demon. " +
        "There is a good player that registers as a Demon to you.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "fortune teller"],
            " learned a no/yes when checking players ", [EventTypes.Player, -1],
            " and ", [EventTypes.Player, -1]]
    }
};

export default fortune_teller;