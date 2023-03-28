import {  useRouter } from "next/router";
import { AiOutlineLineChart } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { useState, useEffect } from 'react';
import {BsToggleOn, BsToggleOff} from "react-icons/bs"
function Tab({children, styles}:any) {
const router = useRouter()
const [selected, setSelected] = useState<string | null>(null)
const [toggle, setToggle] = useState(false)
const handleItemClick = (id:string) => {
  setSelected(id);
};

const [theme, setTheme ] = useState('light');
useEffect(()=>{
if (window.matchMedia('prefers-color-scheme:dark').matches) {
  setTheme("dark")
}
else
setTheme("light")
}, [])

useEffect(()=>{
if (theme === 'dark') {
  document.documentElement.classList.add("dark");
}else{
  document.documentElement.classList.remove("dark");
}
}, [theme])

const switchTheme = ()=> {
const newTheme = theme === 'light'? 'dark': 'light';
setTheme(newTheme)
}
  return (
    <>
    <div className={`bg-gray-200 dark:bg-black dark:text-white w-full p-2 `} >
      <div className="flex justify-between items-center">
      <div className="text-2xl cursor-pointer" onClick={()=> router.push("/")}>App
      </div>
     <div className="text-4xl" onClick={()=> {
      switchTheme()
      setToggle(!toggle)}}>{toggle?<BsToggleOn/>: <BsToggleOff/>}</div> 
      <div>
      <ul className="flex ">
        <li className={`flex  mx-2  ${selected === "item1"? "bg-black text-white dark:text-black dark:bg-white": "bg-white dark:bg-red-100"}   py-3 rounded-md my-2 hover:bg-black dark:hover:text-black dark:hover:bg-white duration-300 hover:scale-110 hover:text-red-100 px-2 dark:text-black`} onClick={()=> {
          handleItemClick(`item1`)
          router.push("/to/Charts")}}>
          <span className="text-2xl flex justify-center items-center ">
            <AiOutlineLineChart />
          </span>
          <span className="hidden sm:flex justify-center items-center sm:py-1 sm:px-2">
            Visuals
          </span>
        </li>
        <li className={`flex  mx-2 justify-center ${selected === `bg-black text-white item2 dark:bg-white dark:text-black`? "bg-black text-white dark:bg-white dark:text-black": "bg-white dark:bg-cyan-500 dark:text-black"} dark:hover:bg-cyan-500 py-3 rounded-md my-2 hover:bg-black  duration-300 hover:scale-110 hover:text-red-100 px-2`} onClick={()=> {
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

export default Tab;
