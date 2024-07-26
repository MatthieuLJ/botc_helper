import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_empath.png';

const empath: roleType = {
    name: "Empath",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, you learn how many of your 2 alive neighbors are " +
        "evil.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default empath;