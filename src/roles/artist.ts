import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_artist.png';

const artist: roleType = {
    name: "Artist",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Once per game, during the day, privately ask the Storyteller " +
        "any yes/no question.",

    actions: {
        "Learn": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "artist"],
            " learn that "]
    }
};

export default artist;