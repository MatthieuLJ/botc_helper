import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_nodashii.png';

const nodashii: roleType = {
    name: "No Dashii",
    icon: img,
    type: CharacterType.Demon,
    ability: "ach night*, choose a player: they die. Your 2 Townsfolk " +
        "neighbors are poisoned.",

    actions: {
        "Kill": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default nodashii;