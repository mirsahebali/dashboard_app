import { Router, useRouter } from "next/router";
import { AiOutlineLineChart } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { useState } from "react";

function Sidebar({children, styles}:any) {
  const router = useRouter()
const [selected, setSelected] = useState<string | null>(null)

const handleItemClick = (id:string) => {
  setSelected(id);
};


  return (
    <>
    <div className={`bg-gray-200 w-[100vw] p-2 `}>
      <div className="flex justify-between items-center">
      <div className="text-2xl">App</div>
      <div>
      <ul className="flex ">
        <li className={`flex  mx-2  ${selected === "item1"? "bg-black text-white": "bg-white"}   py-3 rounded-md my-2 hover:bg-black  duration-300 hover:scale-110 hover:text-red-100 px-2`} onClick={()=> {
          handleItemClick(`item1`)
          router.push("/to/Charts")}}>
          <span className="text-2xl flex justify-center items-center ">
            <AiOutlineLineChart />
          </span>
          <span className="hidden sm:flex justify-center items-center sm:py-1 sm:px-2">
            Visuals
          </span>
        </li>
        <li className={`flex  mx-2 justify-center ${selected === `bg-black text-white item2`? "bg-black text-white": "bg-white"}  py-3 rounded-md my-2 hover:bg-black  duration-300 hover:scale-110 hover:text-red-100 px-2`} onClick={()=> {
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
      
      </ul>
      </div>
      </div>
    </div>
    <main>{children}</main>
    </>
  );
}

export default Sidebar;
