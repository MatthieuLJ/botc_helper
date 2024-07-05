import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";

const barber: roleType = {
    name: "Barber",
    icon: "icon_barber.png",
    type: CharacterType.Outsider,
    ability: "If you died today or tonight, the Demon may choose 2 players " +
        "(not another Demon) to swap characters.",

    actions: {
        "Die": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default barber;