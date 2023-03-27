import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import clientPromise from "@/lib/mongodb";
import Sidebar from "../Sidebar";
import { Data } from "@/types";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


export default function CountriesIntensity({ data }: any) {
  const array1: string[] = [
    "country",
    "region",
    "end_year",
    "topic",
    "sector",
    "source"
  ];
  const array2: string[] = [
  "relevance",
  "likelihood",
  "intensity",

  ]
  const [pr1, setPr1] = useState<string>("country");
  const [pr2, setPr2] = useState<string>("intensity");
  const chartsData: Data[] = data.stats;
  const [fList, updatefList] = useState<any[]>(chartsData);

 const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${pr1} vs ${pr2}`,
      },
    },
  };
  
  function arrayMaker(a: any, b: any): any[] {
    let arr: any[] = [];
    arr = data.stats
      .filter(
        (obj: any) => obj[a] != null && obj[a] != "" && obj[a] != undefined
      )
      .reduce((accumulator: any, current: any) => {
        let existing = accumulator.find((item: any) => item[a] === current[a]);
        if (existing) {
          existing[b] += parseInt(current[b]);
        } else {
          accumulator.push({
            [a]: current[a],
            [b]: current[b],
          });
        }
        return accumulator;
      }, []);

    return arr;
  }



  function createLabels(labelName: string) {
    return arrayMaker(labelName, "").map((d) => d[labelName]);
  }

  const backgroundColorArray = [
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
  ];

  const dataSet1 = {
    labels: createLabels(`${pr1}`),
    datasets: [
      {
        label: `${pr1} vs ${pr2}`,
        data: arrayMaker(`${pr1}`, `${pr2}`)
          .sort((a, b) => a[pr2] - b[pr2])
          .map((d: any) => d[pr2]),
        backgroundColor: backgroundColorArray,
      },
    ],
  };

  function onFilterValueSelected1(filterValue: any) {
    setPr1(filterValue);
    console.log(filterValue);

  }
  function onFilterValueSelected2(filterValue: any) {
    setPr2(filterValue);
    console.log(filterValue);
    
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col">

      <Filter
          ar2={array2}
          ar1={array1}
          filterValueSelected1={onFilterValueSelected1}
filterValueSelected2={onFilterValueSelected2}
          p1={`${pr1}`}
          p2={`${pr2}`}
        /> 
        <Pie data={dataSet1} options={options1} />
      </div>
    </div>
  );
}
interface prop{
ar1: string[],
ar2: string[],
filterValueSelected1: Function,
filterValueSelected2: Function,
p1:string,
p2:string
}

export function Filter({
  ar1,
  ar2,
  filterValueSelected1,
  filterValueSelected2,
  p1,
  p2
}: prop) {
  function onFilterValueChange1(event: any) {
    filterValueSelected1(event.target.value);
  }
  function onFilterValueChange2(event: any) {
    filterValueSelected2(event.target.value);
  }

  return (
    <div className="flex flex-col">
      <div className="text-cyan-700 font-bold flex justify-center text-2xl"> Choose Your Data Chart</div>
      <select 
        id={`${p1}`}
        title={`${p1}`}
        onChange={onFilterValueChange1}
      >
        {ar1.map((item: any, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <select 
        name={`${p2}`}
        id={`${p2}`}
        title={`${p2}`}
        onChange={onFilterValueChange2}
      >
        {ar2.map((item: any, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
