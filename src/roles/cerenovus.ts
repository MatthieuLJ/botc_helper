import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_cerenovus.png';

const cerenovus: roleType = {
    name: "Cerenovus",
    icon: img,
    type: CharacterType.Minion,
    ability: 'Each night, choose a player & a good character: they are "mad"' +
        ' they are this character tomorrow, or might be executed.',

    actions: {
        "MakeMad": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default cerenovus;