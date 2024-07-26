import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_barber.png';

const barber: roleType = {
    name: "Barber",
    icon: img,
    type: CharacterType.Outsider,
    ability: "If you died today or tonight, the Demon may choose 2 players " +
        "(not another Demon) to swap characters.",

    actions: {
        "Die": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default barber;