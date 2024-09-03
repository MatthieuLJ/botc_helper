import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, MenuItem, Select, Slider } from "@mui/material";
import { useAppSelector } from "../state/hooks.ts";

type ChangeTimeChipDialogProps = {
    open: boolean,
    onSelected: (time: number) => void,
};

export default function ChangeTimeChipDialog(props: ChangeTimeChipDialogProps) {
    const current_time: number = useAppSelector(
        state => state.time.time);
    const [timeOfDay, setTimeOfDay] = useState("night");
    const [dayNumber, setDayNumber] = useState(current_time + 1);

    return <Dialog open={props.open}>
        <DialogTitle>Choose a player</DialogTitle>
        <Box sx={{p:5}}>
            <Select
                value={timeOfDay}
                label="Time of Day"
                onChange={(event) => setTimeOfDay(event.target.value as string)}>
                <MenuItem value={"night"}>Night</MenuItem>
                <MenuItem value={"day"}>Day</MenuItem>
            </Select>
            <Slider
                value={dayNumber}
                min={1}
                max={current_time + 1}
                defaultValue={current_time + 1}
                marks
                valueLabelDisplay="on"
                onChange={(_event, newValue) => { if (!Array.isArray(newValue)) setDayNumber(newValue); }} />
            <Button onClick={() => { props.onSelected((dayNumber - 1) * 2 + (timeOfDay === "day" ? 1 : 0)); }}>OK</Button>
        </Box>
    </Dialog>;
}