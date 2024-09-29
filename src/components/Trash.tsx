import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from "@mdi/js";

export default function Trash(props) {
  const { setNodeRef: setTrashNodeRef, isOver } = useDroppable({
    id: 'trash',
  });

  return <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    ref={setTrashNodeRef} >
    <Icon path={mdiTrashCanOutline} color={isOver ? "red" : "black"} size={2} />
  </div>;
}