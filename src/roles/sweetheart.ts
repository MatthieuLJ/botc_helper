import { roleType, CharacterType } from '../game/role.ts'
import { gameTime } from "../game/gameTime.ts";

const sweetheart: roleType = {
    name: "Sweetheart",
    icon: "icon_sweetheart.png",
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