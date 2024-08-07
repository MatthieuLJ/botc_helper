import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_snakecharmer.png';

const snake_charmer: roleType = {
    name: "Snake Charmer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose an alive player: a chosen Demon swaps " +
        "characters & alignments with you & is then poisoned.",

    actions: {
        "Picks": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "snake charmer"],
            " picked ", [EventTypes.Player, -1]]
    }
};

export default snake_charmer;