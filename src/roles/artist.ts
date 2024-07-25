import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_artist.png';

const artist: roleType = {
    name: "Artist",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Once per game, during the day, privately ask the Storyteller " +
        "any yes/no question.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: (bool) => { }
        }
    }
};

export default artist;