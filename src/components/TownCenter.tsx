import React, { useContext, useState } from "react";
import { PlayStates } from "../Playview";
import NoteChip from "./NoteChip";
import { addNote, ChipType, NoteSegments } from "../state/NotesSlice";
import { Button, FormControl, FormLabel, Menu, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import handBackRight from '../img/hand-back-right.png';
import handPointingRight from '../img/hand-pointing-right.png';
import coffin from '../img/coffin.png';

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { advanceTime } from "../state/TimeSlice";
import { mdiCancel, mdiCheckBold } from "@mdi/js";
import Icon from "@mdi/react";
import { ScriptContext, ScriptContextType } from "../state/ScriptContext";
import { PlayerInfo, setAlive } from "../state/PlayersSlice";

type TownCenterPropsType = {
  state: PlayStates,
  setCurrentState: (state: PlayStates) => void,
  setOverlayImage: (img: string | null) => void,
  playerListCache: number[];
  setPlayerListCache: (players: number[]) => void,
};

export default function TownCenter(props: TownCenterPropsType) {
  const dispatch = useAppDispatch();
  const currentState = props.state;
  const current_time = useAppSelector(
    state => state.time.time);
  const players: PlayerInfo[] = useAppSelector(state => state.players.players);

  // Menu of actions
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchor);

  function handleActionMenuClick(e: React.MouseEvent<HTMLButtonElement>) {
    setActionMenuAnchor(e.currentTarget);
  }

  // Current death reason
  const [currentDeathReason, setCurrentDeathReason] = useState<string>("");
  const { getRole }: ScriptContextType = useContext(ScriptContext);
  const roles_causing_death: string[] = useAppSelector(
    state => state.roles.roles.filter(
      (role) => getRole(role)?.canCauseDeath ?? false)
  );

  function handleDeathReason(event: SelectChangeEvent) {
    setCurrentDeathReason(event.target.value);
  }

  return <div id="townsquare_center"
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className={currentState === PlayStates.Default ?
      "flex flex-col justify-center " :
      "hidden"}>
      <NoteChip value={[ChipType.Time, current_time]} />
      <Button onClick={handleActionMenuClick}>Action</Button>
      <Menu
        open={actionMenuOpen}
        onClose={() => setActionMenuAnchor(null)}
        anchorEl={actionMenuAnchor}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}>
        <MenuItem
          key="time"
          onClick={() => {
            dispatch(advanceTime());
            setActionMenuAnchor(null);
          }}>
          Move time forward
        </MenuItem>
        <MenuItem
          key="nomination"
          onClick={() => {
            props.setCurrentState(PlayStates.Nominator);
            props.setOverlayImage(handPointingRight);
            setActionMenuAnchor(null);
          }}>
          Nomination
        </MenuItem>
        <MenuItem
          key="vote"
          onClick={() => {
            props.setCurrentState(PlayStates.Vote);
            props.setOverlayImage(handBackRight);
            setActionMenuAnchor(null);
          }}>
          Vote
        </MenuItem>
        <MenuItem
          key="lifendeath"
          onClick={() => {
            props.setCurrentState(PlayStates.Life_and_Death);
            props.setOverlayImage(coffin);
            setActionMenuAnchor(null);
          }}>
          Life & Death
        </MenuItem>
      </Menu>
    </div>
    <div className={currentState === PlayStates.Nominator ? "" : "hidden"}>
      <p>Who nominated?</p>
    </div>
    <div className={currentState === PlayStates.Nominee ? "" : "hidden"}>
      <p>Who is nominated?</p>
    </div>
    <div className={currentState === PlayStates.Vote ? "" : "hidden"}>
      <p>Who is voting?</p>
      <Button onClick={() => {
        const e: NoteSegments = [];
        if (props.playerListCache.length === 0) {
          e.push("Nobody voted");
        } else {
          for (const [index, p_index] of props.playerListCache.entries()) {
            e.push([ChipType.Player, p_index]);
            if (index != props.playerListCache.length - 1) {
              e.push(", ");
            } else {
              e.push(" voted.");
            }
          }
        }
        dispatch(addNote({ note: e }));
        props.setPlayerListCache([]);
        props.setOverlayImage(null);
        props.setCurrentState(PlayStates.Default);
      }}>
        <Icon path={mdiCheckBold} size={1} />
      </Button>
    </div>
    <div className={currentState === PlayStates.Life_and_Death ? "" : "hidden"}>
      <p>Who died (or resuscitated)?</p>
      <FormControl disabled={props.playerListCache.length == 0 ||
        !players[props.playerListCache[0]].alive}>
        <FormLabel>Death reason:</FormLabel>
        <Select
          labelId="demo-simple-select-label"
          id="death_reason"
          value={currentDeathReason}
          label="Death Reason"
          onChange={handleDeathReason}
        >
          <MenuItem value={" "}></MenuItem>
          <MenuItem value={"execution"}>Execution</MenuItem>
          {roles_causing_death.map((role) =>
            <MenuItem value={role}>{role}</MenuItem>
          )}
        </Select>

        <div className="flex flex-row">
          <Button onClick={() => {
            if (props.playerListCache.length !== 0) {
              const e: NoteSegments = [
                "On",
                [ChipType.Time, current_time],
                ", ",
                [ChipType.Player, props.playerListCache[0]],
              ];
              if (players[props.playerListCache[0]].alive) {
                var death = "died";
                if (currentDeathReason === "execution") {
                  death += " by execution.";
                  e.push(death);
                } else if (currentDeathReason === "") {
                  e.push(death);
                } else {
                  death += " by the ";
                  e.push(death);
                  e.push([ChipType.Role, currentDeathReason]);
                }
              } else {
                e.push("came back to life");
              }

              dispatch(addNote({ note: e }));
              dispatch(setAlive({
                index: props.playerListCache[0],
                alive: !players[props.playerListCache[0]].alive
              }));
              props.setPlayerListCache([]);
              props.setOverlayImage(null);
              setCurrentDeathReason("");
            }
            props.setCurrentState(PlayStates.Default);
          }}>
            <Icon path={mdiCheckBold} size={1} />
          </Button>
          <Button onClick={() => {
            props.setPlayerListCache([]);
            props.setOverlayImage(null);
            props.setCurrentState(PlayStates.Default);
          }}>
            <Icon path={mdiCancel} size={1} />
          </Button>
        </div>
      </FormControl>
    </div>
  </div>;
}