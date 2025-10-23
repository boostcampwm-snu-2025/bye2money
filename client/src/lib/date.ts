export const toDateInputValue = (d:Date)=> d.toISOString().slice(0,10);
export const ym = (d:Date)=>({year:d.getFullYear(), month:d.getMonth()+1});
export const addMonth=(y:number,m:number,delta:number)=>{
  const t=new Date(y,m-1+delta,1); return {year:t.getFullYear(), month:t.getMonth()+1};
};
export const parseYMD=(s:string)=>{const [y,m,d]=s.split('-').map(Number); return {y,m,d};};
export const sameMonth=(ds:string,y:number,m:number)=>{const {y:yy,m:mm}=parseYMD(ds); return yy===y&&mm===m;};
export const weekdayLabel=(ds:string)=>['일','월','화','수','목','금','토']
  [new Date(parseYMD(ds).y,parseYMD(ds).m-1,parseYMD(ds).d).getDay()];
