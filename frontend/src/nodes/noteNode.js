import { useState } from "react";
import { BaseNode } from "./BaseNode.js";

export const NoteNode = ({id, data }) => {
    // no handle for this one, jus a sticky note note for users

    const [currNote, setCurrNote] = useState(data?.note || "");

    const handleNoteChange = (e) => {
        setCurrNote(e.target.value);
    };


    return (
        <BaseNode title="Note" handles={[]} theme="note">
            <textarea
                placeholder="write a note..."
                rows={3}
                value={currNote}
                onChange={handleNoteChange}
            />
        </BaseNode>
    );
}