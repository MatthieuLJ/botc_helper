import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_oracle.png';

const oracle: roleType = {
    name: "Oracle",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn how many dead players are evil.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default oracle;