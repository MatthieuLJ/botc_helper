import React from "react";
import { Button, List, ListItem, ListSubheader } from "@mui/material";
import { useAppSelector } from "./state/hooks";
import { ChipType, NoteTagType } from "./state/NotesSlice";
import { mdiHandPointingRight } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";

export default function Timeline() {
  const notes = useAppSelector(state => state.notes);
  const players = useAppSelector(state => state.players.players);
  const navigate = useNavigate();
  let last_nomination_index = -1;
  let who_nominated: number[] = [];
  let who_voted: number[] = [];
  let who_is_dead: number[] = [];

  function TimelineTime({ note }) {
    let ret: React.JSX.Element[] = [];

    if (who_nominated.length > 0) {
      let who_did_not_nominate =
        Array.from({ length: players.length }, (_, index) => index).filter(
          (index) => !who_nominated.includes(index));
      ret.push(
        <ListItem>
          {who_did_not_nominate.map((player, index) => { return players[player].name + (index < who_did_not_nominate.length - 1 ? ", " : " "); })}
          {who_did_not_nominate.length === 0 ? "Nobody " : ""}
          did not nominate today
        </ListItem>
      );

      let who_did_not_vote =
        Array.from({ length: players.length }, (_, index) => index).filter(
          (index) => !who_voted.includes(index));
      ret.push(
        <ListItem>
          {who_did_not_vote.map((player, index) => { return players[player].name + (index < who_did_not_vote.length - 1 ? ", " : " "); })}
          {who_did_not_vote.length === 0 ? "Nobody " : ""}
          did not vote today
        </ListItem>
      );
    }

    const time_chip = note.find(
      (element) => Array.isArray(element) && element[0] == ChipType.Time);
    if (time_chip) {
      const time_value = time_chip[1];
      const night = time_value % 2 === 0;
      const num = Math.floor((time_value / 2) + 1);

      ret.push(<ListSubheader key={(night ? "Night " : "Day ") + num}>
        {night ? "Night " : "Day "}{num}
      </ListSubheader>);
    }
    who_nominated = [];
    who_voted = [];
    return ret;
  }

  function TimelineNomsVotes({ nom_note, vote_note }) {
    const nominator = nom_note.find(
      (element) => Array.isArray(element) && element[0] == ChipType.Player)?.at(1);
    const nominee = nom_note.findLast(
      (element) => Array.isArray(element) && element[0] == ChipType.Player)?.at(1);

    if (nominator == undefined || nominee == undefined)
      return <></>;

    const voters = vote_note.filter(
      (element) => Array.isArray(element) && element[0] == ChipType.Player).map(
        (element) => element[1]
      );

    who_nominated.push(nominator);
    who_voted.push(...voters);

    return <ListItem>
      <div className="flex flex-row flex-wrap w-full">
        <div className="grow">
          <div className="flex flex-row ">
            <div>{players[nominator].name}</div>
            <div><Icon path={mdiHandPointingRight} size={1} /></div>
            <div>{players[nominee].name} :</div>
            <div></div>
          </div>
        </div>
        <div className="grow-[4]">
          {voters.length === 0 ? "nobody" : ""}
          {voters.map((voter, index) => { return players[voter].name + (index < voters.length - 1 ? ", " : ""); })}
        </div>
      </div>
    </ListItem>;
  }

  function TimelineLifeDeath({ note }) {
    const player = note.find(
      (element) => Array.isArray(element) && element[0] == ChipType.Player)?.at(1);

    if (player == undefined)
      return <></>;

    if (who_is_dead.includes(player)) {
      who_is_dead.splice(who_is_dead.indexOf(player), 1);
      return <ListItem>
        {players[player].name} came back to life
      </ListItem>;
    } else {
      who_is_dead.push(player);
      return <ListItem>
        {players[player].name} died
      </ListItem>;
    }
  }

  const rows = notes.map((n, index) => {
    switch (n.tag) {
      case null:
        return <></>;
      case NoteTagType.Time:
        last_nomination_index = -1;
        return TimelineTime({ note: n.note });
      case NoteTagType.Nomination:
        last_nomination_index = index;
        return <></>;
      case NoteTagType.Vote:
        if (last_nomination_index != -1) {
          const row = TimelineNomsVotes({
            nom_note: notes[last_nomination_index].note,
            vote_note: n.note
          });
          last_nomination_index = -1;
          return row;
        } else {
          return <></>;
        }
      case NoteTagType.LifeDeath:
        return TimelineLifeDeath({ note: n.note });
    }
  });
  rows.push(TimelineTime({ note: [] }));

  return <div className="flex flex-col max-h-screen">
    <div className="h-fit">
      <Button id="townsquare" name="townsquare"
        onClick={() => { return navigate('/play'); }}>
        Back to townsquare
      </Button>
    </div>
    <div className="grow w-full max-h-full overflow-scroll">
      <List>
        {rows}
      </List>
    </div>
    
  </div>;
}