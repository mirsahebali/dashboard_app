import clientPromise from "@/lib/mongodb";
import React, { useEffect, useId, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie, Bar, PolarArea } from "react-chartjs-2";
import { FaFilter } from "react-icons/fa";
import Select from "react-select"
import { Transition } from "@headlessui/react";
import Card from "./components/Card";
import { Data } from "@/types";
interface Prop {
  data: { stats: Data[] };

}


ChartJS.register(
  CategoryScale,
  RadialLinearScale,
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

export default function DashBoard({data}:any){
          
return <div className="md:flex dark:bg-slate-900">
          <Charts data={data.stats}></Charts>
          <Insights data={data.stats}/>
</div>
}



 function Charts({ data }: any) {
  const array1: Option[] = [
    { label: "Country", value: "country", id: 1 },
    { label: "Region", value: "region", id: 2 },
    { label: "Topic", value: "topic", id: 3 },
    { label: "Sector", value: "sector", id: 4 }
  ]
  const array2: Option[] = [
    { label: "Relevance", value: "relevance", id: 1 },
    { label: "Intensity", value: "intensity", id: 2 },
    { label: "Likelihood", value: "likelihood", id: 3 },
  ]
  const [pr1, setPr1] = useState<string>("country");
  const [pr2, setPr2] = useState<string>("intensity");
  const [typeChart, selectTypeChart] = useState("pie")
  const [showFilter, setShowFilters] = useState(false)

  const charts: Option[] = [
    { label: "Pie", value: "pie", id: 1 },
    { label: "Bar", value: "bar", id: 2 },
    { label: "Stack", value: "stack", id: 4 },
    { label: "Polar Area", value: "polar", id: 4 },

  ]

  function arrayMaker(a: any, b: any): any[] {
    let arr: any[] = [];
    arr = data.filter(
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
    // responsive: true,
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
        borderWidth: 1
      },
    ],
  };
  const dataSet3 = {
    labels: createLabels(`${pr1}`),
    datasets: [
      {
        label: 'Intensity',
        data: arrayMaker(`${pr1}`, "intensity"),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Likelihood',
        data: arrayMaker(`${pr1}`, "likelihood").sort((a, b) => a["likelihood"] - b["likelihood"])
        .map((d: any) => d["likelihood"]),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Relevance',
        data: arrayMaker(`${pr1}`, "relevance").sort((a, b) => a["relevance"] - b["relevance"])
        .map((d: any) => d["relevance"]),
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };
  const stackOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    // responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
   
  function chartSelected(selected: any) {
    selectTypeChart(selected.value)

  }
  const pie = (typeChart === "pie") ? <Pie data={dataset} options={options1} /> : ""
  const bar = (typeChart === "bar") ? <Bar data={dataset} options={options1} /> : ""
  const polar = (typeChart === "polar")? <PolarArea data={dataset2} />: ""
  const  stack = (typeChart === "stack")? <Bar data={dataSet3} options={stackOptions}/> : ""
  return (


    <div className="flex flex-col dark:bg-slate-900 dark:text-white h-[100vh] w-[100vw]">

      <div className="flex justify-center ">
        <div className={`w-fit flex-col flex justify-center `}>
          <button className="shadow-lg shadow-cyan-500/50 hover:shadow-orange-500 text-2xl  p-2 m-4 duration-300 w-fit  rounded-full hover:text-white hover:bg-black" onClick={() => {
            setShowFilters(!showFilter)

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

      <div className=" flex justify-center items-center"> 
        {bar}{pie}{polar}{stack}
      </div>
       </div>

  );
}

 function Insights({ data }: Prop) {
  const [pr, setPr] = useState("region");
  const insightsData:any = data;
  const [filterText, updateFilterText] = useState<string | number | undefined>("World");
  const [fList, updatefList] = useState(insightsData);
  const [showFilters, setShowFilters] = useState(false)
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

  const options1 = arrayMaker(`${pr}`, "intensity").map((item: any) => {
    return {
      label: item[pr],
      value: item[pr],
    }
  })
  useEffect(() => {
    updatefList(insightsData.filter((item: any) => item[pr] === filterText))
  }, [filterText, insightsData, pr,])

  //Select filter 
  const arr = ["country", "region", "topic", "sector", "source"]
  const options2 = arr.map((item: string) => {
    return {
      label: item,
      value: item
    }
  })
  function selectProp(propSelected: any) {
    setPr(propSelected.value)


  }

  function selected(selected: any) {
    updatefList(insightsData.filter((item: any) => item[pr] === selected.value))

  }
  const id = useId()
  const id2 = useId()
  return (

    <div className="flex flex-col justify-center items-center dark:bg-slate-900 ">
      <div className="text-2xl font-bold dark:text-white">Insights</div>
      <button className=" shadow-lg shadow-cyan-500/50 hover:shadow-orange-500 text-2xl dark:hover:bg-white dark:hover:text-black p-2 m-2 duration-300 dark:bg-blue-700  rounded-full hover:text-white hover:bg-black" onClick={() => {
        setShowFilters(!showFilters)
        console.log(showFilters);
        
      }}><FaFilter />{""}</button>
      <Transition 
      show={showFilters}
      enter="duration-300"
        enterFrom=" scale-0"
        enterTo="scale-100"
        leave="duration-150"
        leaveFrom=" scale-100"
        leaveTo="scale-0"
      >
        <Select
        onChange={selectProp}
        options={options2}
        instanceId={id}
        className="font-bold text-xl"
        defaultValue={options2[1]}
      />
        <Select
          onChange={selected}
          options={options1}
          instanceId={id2}
          className="font-bold text-xl"
          defaultValue={options1[2]}

        /></Transition>



      <div className="scroll-smooth grid grid-cols-2 md:m-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {fList.map((data: any) => {
          return (
            <div key={data._id} className="scroll-smooth m-2 ">
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
  );
}
