import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../state/hooks.ts";
import React, { useEffect } from "react";


function CheckForPlay() {
    const navigate = useNavigate();
    const notes = useAppSelector(state => state.notes)

    useEffect( () => {
        if (notes.length > 0) {
            navigate('/play');
        }
    }, [navigate, notes.length])
    

    return <Outlet />;
}

export default CheckForPlay;