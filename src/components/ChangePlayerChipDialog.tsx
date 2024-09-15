import React from "react";
import Townsquare from "./Townsquare.tsx";
import { Box, Dialog, DialogTitle } from "@mui/material";

type ChangePlayerChipDialogProps = {
    open: boolean,
    onSelected: (playerIndex: number) => void,
};

export default function ChangePlayerChipDialog(props: ChangePlayerChipDialogProps) {

    return <Dialog open={props.open}>
        <DialogTitle>Choose a player</DialogTitle>
        <Box sx={{ width: "500px", height: "500px" }}>
            <div className="relative aspect-square w-full">
                <Townsquare tapAction={(index: number): void => {
                    props.onSelected(index);
                }} />
            </div>
        </Box>
    </Dialog>;
}