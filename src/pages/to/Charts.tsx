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
    const stats = await db.collection("worldStats").find({}).toArray()

    const res = JSON.parse(JSON.stringify(stats))
    return {
      props: {
        data: {res}
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

interface cI {
  country: string;
  intensity: number;
}
interface rI {
  region: string;
  intensity: number;
}

export default function CountriesIntensity({ data }: any) {
  const countriesAndIntensity: cI[] = data.res.filter((d: any) => d.country !== "" && d.country !== undefined)
  .reduce((accumulator: any, current: any) => {
    let existing = accumulator.find(
      (item: any) => item.country === current.country
    );
    if (existing) {
      existing.intensity += parseInt(current.intensity);
    } else {
      accumulator.push({
        country: current.country,
        intensity: parseInt(current.intensity),
      });
    }
    return accumulator;
  }, []);

  console.log(countriesAndIntensity.sort((a, b) => a.intensity - b.intensity));

  const regionsAndIntensity = data.res
    .filter((d: rI) => d.region != "" && d.region != undefined)
    .reduce((accumulator: any, current: any) => {
      let existing: { country: string; intensity: number | string } = accumulator.find(
        (item: { region: string }) => item.region === current.region
      );

      if (existing != null || existing != undefined) {
        existing.intensity = existing.intensity + current.intensity;
      } else {
        accumulator.push({
          region: current.region,
          intensity: current.intensity,
        });
      }
      return accumulator;
    }, []);

  const countryLabels = countriesAndIntensity.map((d: any) => d.country);

  const regionLabels = regionsAndIntensity.map((d: any) => d.region);
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
    labels: countryLabels,
    datasets: [
      {
        label: "Countries Vs Intensity",
        data: countriesAndIntensity.sort((a, b) => a.intensity - b.intensity).map((d: any) => d.intensity),
        backgroundColor: backgroundColorArray,
      },
    ],
  };
  const dataSet2 = {
    labels: regionLabels,
    datasets: [
      {
        label: "Regions Vs Intensity",
        data: regionsAndIntensity.sort((a:any, b:any)=> a.intensity - b.intensity).map((d: any) => d.intensity),
        backgroundColor: backgroundColorArray,
      },
    ],
  };
  
  return (
    <div className="flex">
    <Sidebar/>
    <div className="flex flex-col">
      <Pie data={dataSet1} options={options1} />
      <Pie data={dataSet2} options={options2} />
    </div>
    </div>
  );
}
