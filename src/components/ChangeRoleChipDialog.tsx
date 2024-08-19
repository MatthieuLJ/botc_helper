import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import Characters from "./Characters.tsx";

type ChangeRoleChipDialogProps = {
    open: boolean,
    onSelected: (role: string) => void,
};

export default function ChangeRoleChipDialog(props: ChangeRoleChipDialogProps) {

    return <Dialog open={props.open}>
        <DialogTitle>Choose a player</DialogTitle>
        <Characters
            tapCharacter={(role: string): void => {
                props.onSelected(role);
            }} />
    </Dialog>;
}