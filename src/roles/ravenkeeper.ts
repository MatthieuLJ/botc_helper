import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_ravenkeeper.png';

const ravenkeeper: roleType = {
    name: "Ravenkeeper",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If you die at night, you are woken to choose a player: you " +
        "learn their character.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default ravenkeeper;