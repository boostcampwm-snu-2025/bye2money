import { Icon } from "./shared/ui/Icon/Icon";
import { CheckBox } from "./shared/ui/CheckBox/CheckBox";
import { useState } from "react";
import { CategoryBadge } from "./entities/category/ui/categoryBadge";
import { Button } from "./shared/ui/Button";
import { TextInput } from "./shared/ui/TextInput";

function App() {
  const [checked, setChecked] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-2">
        <h2 className="text-serif-24">CheckBox</h2>
        <CheckBox checked={checked} label="CheckBox" onChange={setChecked} />
      </div>

      <div className="space-y-2">
        <h2 className="text-serif-24">Icon</h2>
        <div className="flex flex-wrap gap-4">
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
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-serif-24">CategoryBadge</h2>

        <div className="space-y-2">
          <h3 className="text-semibold-16">지출 카테고리</h3>
          <div className="flex flex-wrap gap-2">
            <CategoryBadge category="livingExpenses" />
            <CategoryBadge category="shoppingBeauty" />
            <CategoryBadge category="medicalHealth" />
            <CategoryBadge category="food" />
            <CategoryBadge category="transportation" />
            <CategoryBadge category="entertainmentLeisure" />
            <CategoryBadge category="uncategorized" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-semibold-16">수입 카테고리</h3>
          <div className="flex flex-wrap gap-2">
            <CategoryBadge category="salary" />
            <CategoryBadge category="otherIncome" />
            <CategoryBadge category="allowance" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-semibold-16">전체 카테고리</h3>
          <div className="flex flex-wrap gap-2">
            <CategoryBadge category="livingExpenses" />
            <CategoryBadge category="shoppingBeauty" />
            <CategoryBadge category="medicalHealth" />
            <CategoryBadge category="food" />
            <CategoryBadge category="transportation" />
            <CategoryBadge category="entertainmentLeisure" />
            <CategoryBadge category="uncategorized" />
            <CategoryBadge category="salary" />
            <CategoryBadge category="otherIncome" />
            <CategoryBadge category="allowance" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-serif-24">Button</h2>

        <div className="space-y-2">
          <h3 className="text-semibold-16">Flexible</h3>
          <div className="flex flex-col gap-2">
            <Button layout="text" label="버튼" flexible={true} />
            <Button layout="text" label="저장하기" flexible={true} />
            <Button layout="text" label="내역 추가하기" flexible={true} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-semibold-16">Type (Variant)</h3>
          <div className="flex gap-2">
            <Button layout="text" label="Container" variant="container" />
            <Button layout="text" label="Outlined" variant="outlined" />
            <Button layout="text" label="Ghost" variant="ghost" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-semibold-16">Element Pattern</h3>
          <div className="flex gap-2">
            <Button layout="icon" icon={<Icon name="plus" size={16} />} />
            <Button layout="text" label="Button" />
            <Button
              layout="text-icon"
              label="Button"
              icon={<Icon name="plus" size={16} />}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-semibold-16">Size</h3>
          <div className="flex items-center gap-2">
            <Button layout="text" label="Button" size="lg" />
            <Button layout="text" label="Button" size="md" />
            <Button layout="text" label="Button" size="sm" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-semibold-16">All Combinations</h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Button
                layout="text-icon"
                label="Large Container"
                icon={<Icon name="plus" size={20} />}
                variant="container"
                size="lg"
              />
              <Button
                layout="text-icon"
                label="Medium Outlined"
                icon={<Icon name="check" size={16} />}
                variant="outlined"
                size="md"
              />
              <Button
                layout="text-icon"
                label="Small Ghost"
                icon={<Icon name="minus" size={12} />}
                variant="ghost"
                size="sm"
              />
            </div>
            <div className="flex gap-2">
              <Button
                layout="icon"
                icon={<Icon name="closed" size={24} />}
                variant="container"
              />
              <Button
                layout="icon"
                icon={<Icon name="closed" size={24} />}
                variant="outlined"
              />
              <Button
                layout="icon"
                icon={<Icon name="closed" size={24} />}
                variant="ghost"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button layout="text" label="Full Width" flexible={false} />
              <Button
                layout="text-icon"
                label="Full Width with Icon"
                icon={<Icon name="plus" size={16} />}
                flexible={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-serif-24">TextInput</h2>

        <div className="space-y-2">
          <h3 className="text-semibold-16">Type</h3>
          <div className="flex flex-col gap-4">
            <TextInput
              type="default"
              label="Default"
              placeholder="placeholder"
              value={textInputValue}
              onChange={setTextInputValue}
            />
            <TextInput
              type="text-area"
              label="Text Area Only"
              placeholder="placeholder"
              value={textAreaValue}
              onChange={setTextAreaValue}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-semibold-16">States</h3>
          <div className="flex flex-col gap-4">
            <TextInput
              type="default"
              label="Enabled"
              placeholder="placeholder"
              disabled={false}
            />
            <TextInput
              type="default"
              label="Disabled"
              placeholder="placeholder"
              disabled={true}
            />
            <TextInput
              type="default"
              label="Error"
              placeholder="placeholder"
              error={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
