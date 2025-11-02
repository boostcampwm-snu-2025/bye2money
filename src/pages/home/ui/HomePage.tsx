import { useQueryState, parseAsStringLiteral } from "nuqs";
import { Header } from "../../../widgets/header";
import { TransactionListView } from "../../../widgets/transactions-list/ui/TransactionListView";

const VIEW_OPTIONS = ["doc", "calendar", "chart"] as const;

export const HomePage = () => {
  const [view] = useQueryState(
    "view",
    parseAsStringLiteral(VIEW_OPTIONS).withDefault("doc"),
  );

  const renderView = () => {
    switch (view) {
      case "doc":
        return <TransactionListView />;
      case "calendar":
        return <div>아직 구현되지 않았어요 ㅠㅠ (캘린더뷰)</div>;
      case "chart":
        return <div>아직 구현되지 않았어요 ㅠㅠ (차트뷰)</div>;
      default:
        return <TransactionListView />;
    }
  };

  return (
    <div>
      <Header />
      {renderView()}
    </div>
  );
};
