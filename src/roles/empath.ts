import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";

const empath: roleType = {
    name: "Empath",
    icon: "icon_empath.png",
    type: CharacterType.Townsfolk,
    ability: "Each night, you learn how many of your 2 alive neighbors are " +
        "evil.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default empath;