import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_vortox.png';

const vortox: roleType = {
    name: "Vortox",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player, they die. Townsfolk abilities " +
        "yield false info. Each day, if no-one is executed, evil wins.",

    actions: {
        "Kill": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default vortox;