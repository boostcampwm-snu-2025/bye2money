import './descriptioninput.css';

export default function DescriptionInput({ desc, setDesc }) {
  return (
    <div className="description-box">
      <div className="desc-header">
        <span>내용</span>
        <span className="char-count">{desc.length}/32</span>
      </div>
      <input
        type="text"
        className="desc-input"
        value={desc}
        onChange={e => setDesc(e.target.value.slice(0, 32))}
        placeholder="입력하세요"
      />
    </div>
  );
}
