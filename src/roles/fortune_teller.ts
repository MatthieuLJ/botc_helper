import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_fortuneteller.png';

const fortune_teller: roleType = {
    name: "Fortune Teller",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose 2 players: you learn if either is a Demon. " +
        "There is a good player that registers as a Demon to you.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "fortune teller"],
            " learned a no/yes when checking players ", [TagTypes.Player, -1],
            " and ", [TagTypes.Player, -1]]
    }
};

export default fortune_teller;