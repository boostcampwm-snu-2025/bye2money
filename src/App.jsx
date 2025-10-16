import InputDate from "./pages/form/InputDate";
import SignToggleButton from "./pages/form/SignToggleButton";

const App = () => {
    return (
        <>
            <header></header>
            <form className="flex w-300 h-32 border border-black mx-auto">
                <InputDate />
                <SignToggleButton />
            </form>
            <body></body>
        </>
    );
};

export default App;
