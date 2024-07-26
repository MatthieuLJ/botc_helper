import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
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