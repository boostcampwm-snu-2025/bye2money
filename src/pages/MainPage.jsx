import { useEffect, useRef, useState } from "react";
import EntryBar from "../components/EntryBar";
import RecordList from "../components/RecordList";

export default function MainPage() {
  const [editing, setEditing] = useState(null);
  const barRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (!editing) return;
      if (!barRef.current) return;
      if (!barRef.current.contains(e.target)) {
        setEditing(null);
      }
    };
    document.addEventListener("mousedown", onDown, true);
    return () => document.removeEventListener("mousedown", onDown, true);
  }, [editing]);

  return (
    <div className="space-y-4">
      <div ref={barRef}>
        <EntryBar editTarget={editing} onFinishEdit={() => setEditing(null)} />
      </div>
      <RecordList onPickForEdit={(r) => setEditing(r)} selectedId={editing?.id} />
    </div>
  );
}
