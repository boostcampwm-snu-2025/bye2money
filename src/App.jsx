import SectionForm from "./pages/form/SectionForm";
import Header from "./pages/header/Header";

import { useState } from "react";

const App = () => {
    // States shared Header and main
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState("list");

    return (
        <>
            <Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            <SectionForm />
            <main></main>
        </>
    );
};

export default App;
