import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_artist.png';

const artist: roleType = {
    name: "Artist",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Once per game, during the day, privately ask the Storyteller " +
        "any yes/no question.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "artist"],
            " learn that "]
    }
};

export default artist;