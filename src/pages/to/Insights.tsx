import Sidebar from "../Sidebar";
import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import Card from "../components/Card";
import { Data } from "@/types";
import { useState, useEffect } from 'react';
import styles from "@/styles/Insights.module.css"
interface Prop {
  data: { stats: Data[] };

  func: Function;
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
  const [pr, setPr] = useState("country");
  const insightsData: Data[] = data.stats;
  const [filteredList, setfilteredList] = useState(insightsData);
  const [filterText, updateFilterText] = useState<string>("");
  const [fList, updatefList] = useState(insightsData);
  let arr: any[] = []



  const arrayProps: string[] = [
    "All",
    "country",
    "region",
    "end_year",
    "topic",

  ];



  function onFilterValueSelectedProp(filterValue: any) {
    setPr(filterValue);
    
  }

  function onFilterValueSelected(filterValue: any) {
   
    updateFilterText(filterValue);
    
  }

  function arrayMaker(a: any, b: any): any[] {
    let arr = []
    arr = insightsData.filter((obj: any) => obj[a] != null && obj[a] != "" && obj[a] != undefined).reduce((accumulator: any, current: any) => {
      let existing = accumulator.find((item: any) => item[a] === current[a]

      );
      if (existing) {
        existing[b] += parseInt(current[b])
      } else {

        accumulator.push(
          {
            [a]: current[a],
            [b]: current[b]
          })
      }
      return accumulator
    }, [])

    return arr
  }
useEffect( ()=> {
  if (pr === "All")
    updatefList(insightsData)
  else
  updatefList(insightsData.filter((item: any) => item[pr] === filterText))

} , [filterText, insightsData, pr])
  return (
    <div className="flex ">
      <Sidebar />
      <div>
        <div className="text-2xl font-bold">Insights</div>
        <Filter
          data={arrayMaker(`${pr}`, `intensity`)}
          p={`${pr}`}
          ar={arrayProps}
          filterValueSelectedProp={onFilterValueSelectedProp}
          filterValueSelected={onFilterValueSelected}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
          {fList.map((data: any) => {
            return (
              <div key={data._id} className="m-2">
                <Card
                  title={data.title}
                  country={data.country}
                  region={data.region}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface prop {
  data: any[];
  p: string;
  ar: string[];
  filterValueSelectedProp: Function;
  filterValueSelected: Function;
}

function Filter({
  data,
  p,
  ar,
  filterValueSelectedProp,
  filterValueSelected,
}: prop) {
  function onFilterValueChange(event: any) {
    filterValueSelectedProp(event.target.value);
  }
  function onFilterValueSelected(event: any) {
    filterValueSelected(event.target.value);
  }

  return (
    <div className={styles.select}>
      <select className={styles._select}
        name={`props`}
        id={`props`}
        title={`props`}
        onChange={onFilterValueChange}
      >
        {ar.map((item: any, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <select className={styles.select}
        name={`${p}`}
        id={`${p}`}
        title={`${p}`}
        onChange={onFilterValueSelected}
      >
        {data.map((item: any, index) => {
          return (
            <option key={index} value={item[p]}>
              {item[p]}
            </option>
          );
        })}
      </select>
    </div>
  );
}
