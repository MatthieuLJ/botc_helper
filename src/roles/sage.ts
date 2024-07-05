import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";

const sage: roleType = {
    name: "Sage",
    icon: "icon_sage.png",
    type: CharacterType.Townsfolk,
    ability: "If the Demon kills you, you learn that it is 1 of 2 players.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default sage;