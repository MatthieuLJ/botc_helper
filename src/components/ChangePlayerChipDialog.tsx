import React from "react";
import Townsquare from "../Townsquare.tsx";
import { Dialog, DialogTitle } from "@mui/material";

type ChangePlayerChipDialogProps = {
    open: boolean,
    onSelected: (playerIndex: number) => void,
};

export default function ChangePlayerChipDialog(props: ChangePlayerChipDialogProps) {

    return <Dialog open={props.open}>
        <DialogTitle>Choose a player</DialogTitle>
        <Townsquare tapAction={(index: number): void => {
            props.onSelected(index);
        }} />
    </Dialog>;
}