import { ViewSelector } from "./ViewSelector";
import { DateSelector } from "./DateSelector";

export const Header = () => {
  return (
    <header className="flex h-52 justify-center bg-colorchip-80">
      <div className="flex h-fit items-center gap-[175px] pt-10">
        <h1 className="font-serif text-serif-24">Wise Wallet</h1>
        <DateSelector />
        <ViewSelector />
      </div>
    </header>
  );
};
