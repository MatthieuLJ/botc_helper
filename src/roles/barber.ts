import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_barber.png';

const barber: roleType = {
    name: "Barber",
    icon: img,
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