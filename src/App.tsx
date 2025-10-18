import { Icon } from "./shared/ui/Icon/Icon";
import { CheckBox } from "./shared/ui/CheckBox/CheckBox";
import { useState } from "react";
import { CategoryBadge } from "./entities/category/ui/categoryBadge";

function App() {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <CheckBox checked={checked} label="CheckBox" onChange={setChecked} />
      <Icon name="doc" />
      <Icon name="calendar" />
      <Icon name="chart" />
      <Icon name="check" />
      <Icon name="checkbox" />
      <Icon name="chevron-left" />
      <Icon name="chevron-right" />
      <Icon name="chevron-up" />
      <Icon name="chevron-down" />
      <Icon name="minus" />
      <Icon name="plus" />
      <Icon name="closed" />
      <Icon name="uncheckbox" />
      <CategoryBadge category="livingExpenses" />
      <CategoryBadge category="shoppingBeauty" />
      <CategoryBadge category="transportation" />
    </div>
  );
}

export default App;
