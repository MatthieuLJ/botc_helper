import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_eviltwin.png';

const evil_twin: roleType = {
    name: "Evil Twin",
    icon: img,
    type: CharacterType.Minion,
    ability: "You & an opposing player know each other. If the good player " +
        "is executed, evil wins. Good can't win if you both live.",

    actions: {
        "Pair": ["On", [TagTypes.Time, -1], ", players ",
            [TagTypes.Player, -1], " and ", [TagTypes.Player, -1],
            " learn they are in an evil twin pair with role ",
            [TagTypes.Role, ""]]
    }
};

export default evil_twin;