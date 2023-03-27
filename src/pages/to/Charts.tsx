import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Pie } from "react-chartjs-2";
import clientPromise from "@/lib/mongodb";
import Sidebar from "../Sidebar";
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("statisticsDB");
    const res = await db.collection("worldStats").find({}).toArray()

    const stats = JSON.parse(JSON.stringify(res))
    return {
      props: {
        data: { stats }
      }
    }
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

export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Country vs Intensity",
    },
  },
};
export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Region vs Intensity",
    },
  },
};


export default function CountriesIntensity({ data }: any) {
 
  let arr: any[] = []

  function arrayMaker(a: any, b: any): any[] {
    arr = data.stats.filter((obj: any) => obj[a] != null && obj[a] != "" && obj[a] != undefined).reduce((accumulator: any, current: any) => {
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

  console.log(arrayMaker("region", "relevance"));
  // console.log(arrayMaker("region", "relevance"));

function createLabels(labelName:string){
return arrayMaker(labelName, "").map(d => d[labelName])
}
console.log(createLabels("country"));


  const backgroundColorArray = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
  ];

  const dataSet1 = {
    labels: createLabels("country"),
    datasets: [
      {
        label: "Countries Vs Intensity",
        data: arrayMaker("country", "intensity").sort((a, b) => a.intensity - b.intensity).map((d: any) => d.intensity),
        backgroundColor: backgroundColorArray,
      },
    ],
  };
  const dataSet2 = {
    labels: createLabels("region"),
    datasets: [
      {
        label: "Regions Vs Intensity",
        data: arrayMaker("region", "intensity").sort((a: any, b: any) => a.intensity - b.intensity).map((d: any) => d.intensity),
        backgroundColor: backgroundColorArray,
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <Pie data={dataSet1} options={options1} />
        <Pie data={dataSet2} options={options2} />
      </div>
    </div>
  );
}
