import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie, Line, Bar,PolarArea } from "react-chartjs-2";
import clientPromise from "@/lib/mongodb";
import Tab from "../Tab";
import { Data } from "@/types";
import { FaFilter } from "react-icons/fa";
import Select from "react-select"
import { Transition } from "@headlessui/react";

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
  ArcElement,
  LineElement,
  PointElement
);


interface Option { label: string, value: string, id: number }
export default function CountriesIntensity({ data }: any) {
  const array1: Option[] = [
    { label: "Country", value: "country", id: 1 },
    { label: "Region", value: "region", id: 2 },
    { label: "Topic", value: "topic", id: 3 },
    { label: "Sector", value: "sector", id: 4 }
  ]
  const array2: Option[] = [
    { label: "Relevance", value: "relevance", id: 1 },
    { label: "Intensity", value: "intensity", id: 2 },
    { label: "Impact", value: "impact", id: 3 },
  ]
  const [pr1, setPr1] = useState<string>("country");
  const [pr2, setPr2] = useState<string>("intensity");
  const [typeChart, selectTypeChart] = useState("pie")
  const [showFilter, setShowFilters] = useState(false)

  const charts: Option[] = [
    { label: "Pie", value: "pie", id: 1 },
    { label: "Bar", value: "bar", id: 2 },
    { label: "Line", value: "line", id: 3 },
    { label: "Stack", value: "stack", id: 4 },
    { label: "Polar Area", value: "polar", id: 4 },

  ]

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

  function selected1(selected: any) {
    setPr1(selected.value);

  }
  function selected2(selected: any) {
    setPr2(selected.value);

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
  const horzontalBarOptions = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: `${pr1.toLocaleUpperCase()} vs ${pr2.toUpperCase()}`,
      },
    },
  };

  const colors = [];

  for (let i = 0; i < 30; i++) {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }

  console.log(colors);


  const dataset = {
    labels: createLabels(`${pr1}`),
    datasets: [
      {
        label: `${pr1} vs ${pr2}`,
        data: arrayMaker(`${pr1}`, `${pr2}`)
          .sort((a, b) => a[pr2] - b[pr2])
          .map((d: any) => d[pr2]),
        backgroundColor: backgroundColorArray,
        borderColor: colors
      },
    ],
  };
  const dataset2 = {
    labels: createLabels(`${pr1}`),
    datasets: [
      {
        label: `${pr1} vs ${pr2}`,
        data: arrayMaker(`${pr1}`, `${pr2}`)
          .sort((a, b) => a[pr2] - b[pr2])
          .map((d: any) => d[pr2]),
        backgroundColor: backgroundColorArray,
        borderColor: colors
      },
    ],
  };

  function chartSelected(selected: any) {
    selectTypeChart(selected.value)

  }
const pie = (typeChart === "pie")? <Pie data={dataset} options={options1} />: ""
const bar = (typeChart === "bar")? <Bar data={dataset2} options={options1}/>: ""
  return (


    <div className="flex flex-col dark:bg-slate-900 dark:text-white h-[1000vh] w-[100vw]">

      <div className="flex justify-center ">
        <div className={`w-fit flex-col flex justify-center `}>
          <button className="shadow-lg shadow-cyan-500/50 hover:shadow-orange-500 text-2xl  p-2 m-2 duration-300 w-fit  rounded-full hover:text-white hover:bg-black" onClick={() => {
            setShowFilters(!showFilter)
            console.log(showFilter);

          }}><FaFilter />{""}</button>

        </div>
        <div>
          <Transition
            show={showFilter}
            enter="duration-300"
            enterFrom=" scale-0"
            enterTo="scale-100"
            leave="duration-150"
            leaveFrom=" scale-100"
            leaveTo="scale-0"
          >
            <Select
              className="dark:text-black"
              options={array1}
              onChange={selected1}
            />
            <Select
              className="dark:text-black"

              options={array2}
              onChange={selected2}
            />
            <Select
              className="dark:text-black"

              options={charts}
              onChange={chartSelected}
            />
          </Transition>
        </div>
      </div>
   <div> {bar}{pie}
   </div> </div>

  );
}

