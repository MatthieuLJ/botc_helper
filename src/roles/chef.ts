import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_chef.png';

const chef: roleType = {
    name: "Chef",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing how many pairs of evil players there are.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "chef"],
            " learned a ?"]
    }
};

export default chef;