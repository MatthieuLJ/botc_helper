import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_virgin.png';

const virgin: roleType = {
    name: "Virgin",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "The 1st time you are nominated, if the nominator is a Townsfolk,"
        + " they are executed immediately.",

    actions: {
        "GetNominated": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default virgin;