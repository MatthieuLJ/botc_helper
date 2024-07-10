import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_flowergirl.png';

const flowergirl: roleType = {
    name: "Flowergirl",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn if a Demon voted today.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default flowergirl;