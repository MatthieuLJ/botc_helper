import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";

const ravenkeeper: roleType = {
    name: "Ravenkeeper",
    icon: "icon_ravenkeeper.png",
    type: CharacterType.Townsfolk,
    ability: "If you die at night, you are woken to choose a player: you " +
        "learn their character.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default ravenkeeper;