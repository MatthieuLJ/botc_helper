import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_mathematician.png';

const mathematician: roleType = {
    name: "Mathematician",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, you learn how many players' abilities worked " +
        "abnormally (since dawn) due to another character's ability.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default mathematician;