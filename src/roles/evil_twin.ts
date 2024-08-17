import { ChipType } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_eviltwin.png';

const evil_twin: roleType = {
    name: "Evil Twin",
    icon: img,
    type: CharacterType.Minion,
    ability: "You & an opposing player know each other. If the good player " +
        "is executed, evil wins. Good can't win if you both live.",

    actions: {
        "Pair": ["On", [ChipType.Time, -1], ", players ",
            [ChipType.Player, -1], " and ", [ChipType.Player, -1],
            " learn they are in an evil twin pair with role ",
            [ChipType.Role, ""]]
    }
};

export default evil_twin;