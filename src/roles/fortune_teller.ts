import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_fortuneteller.png';

const fortune_teller: roleType = {
    name: "Fortune Teller",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose 2 players: you learn if either is a Demon. " +
        "There is a good player that registers as a Demon to you.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "fortune_teller"],
        " learned a no/yes when checking players ", [ChipType.Player, -1],
        " and ", [ChipType.Player, -1], " "]
};

export default fortune_teller;