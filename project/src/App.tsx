import "./App.css";
import { useState, useEffect } from "react";
import data from "./data.json";

//GPT told me about making props for types
interface HeaderProps {
  date: string;
  //to access date globally (?)
  setDate: React.Dispatch<React.SetStateAction<string>>;

}
interface Transaction {
  amount: string;
  description: string;
  method: string;
  category: string;
}
const categoryClassMap: Record<string, string> = {
  "생활": "category-life",
  "식비": "category-food",
  "교통": "category-transport",
  "쇼핑/뷰티": "category-shopping-beauty",
  "의료/건강": "category-health",
  "문화/여가": "category-leisure",
  "미분류": "category-uncategorized",
  "월급": "category-salary",
  "용돈": "category-pocket-money",
  "기타 수입": "category-other-income",
};

function HeaderDate({ date }: HeaderProps) {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthText = monthNames[parseInt(month, 10) - 1];
  return (
    <div className="Date">
      <p>{year}</p>
      <h1>{month}</h1>
      <p>{monthText}</p>
    </div>
  );
}

function HeaderDateTitle({ date, setDate }: HeaderProps) {
  //GPT generated:
  const changeMonth = (offset: number) => {
    const year = parseInt(date.slice(0, 4), 10);
    const month = parseInt(date.slice(4, 6), 10);
    const day = date.slice(6, 8);

    // create a JS Date object to handle month rollovers (e.g., Dec → Jan)
    const newDate = new Date(year, month - 1 + offset, parseInt(day, 10));

    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");

    // keep same day part
    const newDateString = `${newYear}${newMonth}${day}`;
    setDate(newDateString);
  };

  return (
    <div className = "HeaderDateTitle">
      <button className="prevBtn" onClick={() => changeMonth(-1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <HeaderDate date={date} setDate = {setDate}/>
      <button className="nextBtn" onClick={() => changeMonth(1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
function Menu(){
  return (
    <div className="Menu">
      <button className="transactions">
        T
      </button>
      <button className="graph">
        G
      </button>
      <button className="calendar">
        C
      </button>
    </div>
  )
}

function Header({date, setDate}: HeaderProps){
    return (
    <header>
      <div className="logo">
        Wise Wallet
      </div>
      <HeaderDateTitle date={date} setDate = {setDate}/>
      <Menu />
    </header>
  );
}
function InputDate(){
  return(<p>20xx.xx.xx</p>);
}
function InputAmount(){
  return(
    <div>
      <input type="text" value="입력하세요"/>
    </div>
  );
}
function InputDescription(){
  return(<input type="text" value="입력하세요"/>);
}
function InputMethod(){
  return(
    <select>
      <option>
        선택하세요
      </option>
    </select>
  );
}
function InputCategory(){
  const [category, setCategory] = useState("");
  const categories = [
        "생활",
    "식비",
    "교통",
    "쇼핑/뷰티",
    "의료/건강",
    "문화/여가",
    "미분류",
    "월급",
    "용돈",
    "기타 수입",
  ];
  return(
    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
      <option value="">선택하세요</option>
      {categories.map((cat)=>(
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
function InputBar(){
  return (
    <div className="InputBar">
      <table>
        <tr>
          <th>일자</th><th>금액</th><th>내용</th><th>결제수단</th><th>분류</th>
          <td rowSpan={2} style={{ verticalAlign: "middle", textAlign: "center" }}>
            <button>Submit</button>
          </td>
        </tr>
        <tr>
          <td><InputDate/></td>
          <td><InputAmount/></td>
          <td><InputDescription/></td>
          <td><InputMethod/></td>
          <td><InputCategory/></td>
        </tr>
      </table>
    </div>
  )
}

//could try to divide this up next time
function Transactions({date}: {date: string}){
  const year = date.slice(0,4);
  const month = date.slice(4,6);

  //filtering logic from GPT
  const monthPrefix = `${year}${month}`;
  const filtered = Object.entries(data)
    .filter(([key])=> key.startsWith(monthPrefix))
    .sort(([a],[b])=>(a>b ? -1 : 1)); //newest first
  return (
    <div className="Transactions">
      {filtered.length === 0 ? (
        <p>이번달 내역은 없습니다.</p>
      ) : (
        filtered.map(([key, entries])=>(
          <div key={key} className="DayBlock">
            <h3>
              {key.slice(4,6)}월 {key.slice(6,8)}일
            </h3>
            <table>
              {entries.map((t: Transaction, i: number)=>(
                <tr key={i}>
                  <th className={categoryClassMap[t.category] || "category-default"}>{t.category}</th>
                  <td className="description">{t.description}</td>
                  <td>{t.method}</td>
                  <td className="amount">{Number(t.amount).toLocaleString()}원</td>
                </tr>
              ))}
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default function App() {
  const [date, setDate] = useState("20251019");
  const [menu, setMenu] = useState("transactions");
  return (
    <div className="App">
      <Header date={date} setDate={setDate} />
      <InputBar/>
      <Transactions date={date}/>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
