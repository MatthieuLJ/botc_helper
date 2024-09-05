import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_chef.png';

const chef: roleType = {
    name: "Chef",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing how many pairs of evil players there are.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "chef"],
        " learned a ?"]
};

export default chef;