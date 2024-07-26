import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_clockmaker.png';

const clockmaker: roleType = {
    name: "Clockmaker",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing how many steps from the Demon to its nearest" +
        " Minion.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default clockmaker;