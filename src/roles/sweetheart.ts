import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_sweetheart.png';

const sweetheart: roleType = {
    name: "Sweetheart",
    icon: img,
    type: CharacterType.Outsider,
    ability: "When you die, 1 player is drunk from now on.",

    actions: {
        "Die": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default sweetheart;