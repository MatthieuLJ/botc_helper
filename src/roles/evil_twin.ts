import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_eviltwin.png';

const evil_twin: roleType = {
    name: "Evil Twin",
    icon: img,
    type: CharacterType.Minion,
    ability: "You & an opposing player know each other. If the good player " +
        "is executed, evil wins. Good can't win if you both live.",

    actions: {
        "Pair": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default evil_twin;