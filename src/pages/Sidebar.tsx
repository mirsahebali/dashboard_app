import { Router, useRouter } from "next/router";
import { AiOutlineLineChart } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";

function Sidebar() {
  const router = useRouter()
const [selected, setSelected] = useState<string | null>(null)


const handleItemClick = (id:string) => {
  setSelected(id);
};


  return (
    <>
    <div className=" bg-gray-200 h-[100vh] p-2 w-fit">
      <div>
      <h1 className="text-xl font-bold justify-center items-center flex">App</h1>
      <ul className="flex flex-col">
        <li className={`flex justify-center ${selected === "item1"? "bg-black text-white": "bg-white"}   py-3 rounded-md my-2 hover:bg-black  duration-300 hover:scale-110 hover:text-red-100 px-2`} onClick={()=> {
          handleItemClick(`item1`)
          router.push("/to/Charts")}}>
          <span className="text-2xl flex justify-center items-center ">
            <AiOutlineLineChart />
          </span>
          <span className="hidden sm:flex justify-center items-center sm:py-1 sm:px-2">
            Visuals
          </span>
        </li>
        <li className={`flex justify-center ${selected === `bg-black text-white item2`? "bg-black text-white": "bg-white"}  py-3 rounded-md my-2 hover:bg-black  duration-300 hover:scale-110 hover:text-red-100 px-2`} onClick={()=> {
          handleItemClick(`bg-black text-white item2`)
          router.push("/to/Insights")}}>
          <span className="text-2xl flex justify-center items-center ">
            {" "}
            <TbReportSearch />
          </span>
          <span className="hidden sm:flex justify-center items-center sm:py-1 sm:px-2">
            Insights
          </span>{" "}
        </li>
        <li className="flex justify-center  bg-white py-3 rounded-md my-2 hover:bg-black  duration-300 hover:scale-110 hover:text-red-100" onClick={()=> router.push("/to/Charts")}>
          <span className="text-2xl flex justify-center items-center ">
            {" "}
            <FaFilter />
          </span>
          <span className="hidden sm:flex justify-center items-center sm:py-1 sm:px-2">
            Settings
          </span>{" "}
        </li>
      </ul>
      </div>
    </div>
    </>
  );
}

export default Sidebar;
