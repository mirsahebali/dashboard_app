import Sidebar from "../Sidebar";
import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import Card from "../components/Card";
import { Data } from "@/types";
import { useState } from "react";

interface Prop{
data: {stats: Data[]}

func: Function
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("statisticsDB");
    const res = await db.collection("worldStats").find({}).toArray();

    const stats = JSON.parse(JSON.stringify(res));
    return {
      props: {
        data: { stats },
      },
    };
  } catch (e) {
    console.error(e);
  }
}
export default function Insights({ data }: Prop) {
  const [pr, setPr] = useState("country")
  const insightsData: Data[] = data.stats;
  const [filteredList, setfilteredList] = useState(insightsData)
const [filterText, updateFilterText] = useState<string>("")
const [fList, updatefList] = useState(insightsData)
function getData(d:any[], prop:string){
let newVal = d.map((curr:any)=> {
return curr[prop]
})
 
 return newVal = ["All", ...new Set(newVal)] 
}
const arrayProps:string[] = ["country", "region", "end_year","title", "topic", "sector", "insight"]

let filteredData = insightsData.map((item:any)=> item[pr])
filteredData = [...new Set(filteredData)]


function onFilterValueSelectedProp(filterValue:any){
setPr(filterValue)
}

function returnData(value:any){
 let currData = insightsData.filter((item:any)=> item[pr] === value)
return currData
}

function onFilterValueSelected(filterValue:any){
  updateFilterText(filterValue);
updatefList(returnData(filterText))

}


  return (
    <div className="flex ">
      <Sidebar />
      <div>
        <div className="text-2xl font-bold">Insights</div>
       <Filter data={fList} p={`${pr}`} ar={arrayProps} filterValueSelectedProp={onFilterValueSelectedProp} filterValueSelected={onFilterValueSelected}/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
          {filteredList.map((data: any) => {
            return (
              <div key={data._id} className="m-2">
                <Link href={data.url}>
                  <Card
                    title={data.title}
                    country={data.country}
                    region={data.region}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface prop{
data: any[],
p: string,
ar: string[],
filterValueSelectedProp: Function,
filterValueSelected: Function
}

function Filter({data, p, ar,  filterValueSelectedProp, filterValueSelected}:prop){
  function onFilterValueChange(event:any){
  filterValueSelectedProp(event.target.value)
  }
function onFilterValueSelected(event:any){
  filterValueSelected(event.target.value);
}

return <div>
  <select name={`props`} id={`props`} title={`props`} onChange={onFilterValueChange}>
{ar.map((item: any, index)=>{
return <option key={index} value={item}>{item}</option>
})}
</select>
<select name={`${p}`} id={`${p}`}title={`${p}`} onChange={onFilterValueSelected}>
{data.map((item: any, index)=>{
return <option key={item._id} value={item[p]}>{item[p]}</option>
})}
</select>
</div>
}


