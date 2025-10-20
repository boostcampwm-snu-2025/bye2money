import { useState } from "react";
import { EntryBar } from "../components/EntryBar";
import type { TransactionEntry } from "../types/entry";

export function MainPage() {
    const [submitted, setSubmitted] = useState<number>(0);
    const [entries, setEntries] = useState<TransactionEntry[]>([]);

    return (
        <div style={{ padding: "0 16px" }}>
            <EntryBar onSubmit={(entry) => {
                setEntries((prev) => [entry, ...prev]);
                setSubmitted((n) => n + 1);
            }} />
        </div>
    );
}