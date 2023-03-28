import Tab from "../Tab";
import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import Card from "../components/Card";
import { Data } from "@/types";
import { FaFilter } from "react-icons/fa"
import { useState, useEffect, useId } from 'react';
import Select from "react-select"
import { Transition } from "@headlessui/react";
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
  const [pr, setPr] = useState("region");
  const insightsData: Data[] = data.stats;
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

    <div className="flex flex-col justify-center items-center ">
      <div className="text-2xl font-bold">Insights</div>
      <button className=" shadow-lg shadow-cyan-500/50 hover:shadow-orange-500 text-2xl  p-2 m-2 duration-300  rounded-full hover:text-white hover:bg-black" onClick={() => {
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



      <div className="scroll-smooth grid grid-cols-2 md:m-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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

