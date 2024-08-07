import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_snakecharmer.png';

const snake_charmer: roleType = {
    name: "Snake Charmer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose an alive player: a chosen Demon swaps " +
        "characters & alignments with you & is then poisoned.",

    actions: {
        "Picks": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "snake charmer"],
            " picked ", [TagTypes.Player, -1]]
    }
};

export default snake_charmer;