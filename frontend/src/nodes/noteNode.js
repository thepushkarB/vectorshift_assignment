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
                className="bg-black/50 border-yellow-700/50 text-yellow-400 focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.2)] placeholder-yellow-800"
            />
        </BaseNode>
    );
}