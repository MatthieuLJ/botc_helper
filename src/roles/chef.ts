import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";

const chef: roleType = {
    name: "Chef",
    icon: "icon_chef.png",
    type: CharacterType.Townsfolk,
    ability: "You start knowing how many pairs of evil players there are.",

    actions: {
        "Learn": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default chef;