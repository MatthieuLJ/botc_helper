import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../state/hooks.ts";
import React, { useEffect } from "react";


function CheckForSetup() {
    const navigate = useNavigate();
    const roles_state = useAppSelector(state => state.roles);
    const notes = useAppSelector(state => state.notes);

    useEffect(() => {
        if ((roles_state.script === "") ||
            (roles_state.roles.length === 0) ||
            (notes.length == 0)) {
            navigate('/setup');
        }
    }, [navigate, roles_state.roles.length, roles_state.script, notes.length]);


    return <Outlet />;
}

export default CheckForSetup;