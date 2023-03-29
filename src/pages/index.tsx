import Head from "next/head";
import {AiFillPieChart} from "react-icons/ai"
import { MdOutlineTableChart } from "react-icons/md";
import Link from "next/link";
import { useRouter } from 'next/router';
export default function Home() {
const router = useRouter()
  return (
    <>
      <Head>
        <title>DashBoard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center dark:bg-gray-800 h-[90vh]">
        <div className="flex text-2xl font-bold">
       <div className="w-[40vw] h-[40vh] bg-pink-200 flex flex-col dark:bg-red-900 dark:text-white justify-center items-center rounded-md m-5   ease-in duration-300 cursor-pointer" onClick={()=> router.push("/to/Charts")}>View Data <Link href={`to/Charts`}><AiFillPieChart/></Link></div>
      
     <div className="w-[40vw] h-[40vh] bg-cyan-200 flex flex-col dark:bg-cyan-900 dark:text-white justify-center items-center rounded-md m-5 cursor-pointer" onClick={()=> router.push("/to/Insights")}>View Insights<MdOutlineTableChart/></div>
</div>
      </main>
    </>
  );
}

