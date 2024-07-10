import { roleType, CharacterType } from '../game/role.ts'
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_sweetheart.png';

const sweetheart: roleType = {
    name: "Sweetheart",
    icon: img,
    type: CharacterType.Outsider,
    ability: "When you die, 1 player is drunk from now on.",

    actions: {
        "Die": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
}

export default sweetheart;