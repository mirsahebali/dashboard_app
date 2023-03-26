import Sidebar from "../Sidebar";
import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import Card from "../components/Card";
import Filter from "../components/Filter";
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("statisticsDB");
    const stats = await db.collection("worldStats").find({}).toArray();

    const res = JSON.parse(JSON.stringify(stats));
    return {
      props: {
        data: { res },
      },
    };
  } catch (e) {
    console.error(e);
  }
}



function Insights({ data }: any) {
  const insightsData = data.res;

  return (
    <div className="flex">
      <Sidebar />
      <div>
        <div className="text-2xl font-bold">Insights</div>
        <Filter data={insightsData}/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
          {insightsData.map((data: any) => {
            return (
              <div key={data._id} className="m-2">
             <Card  title={data.title} country={data.country} region={data.region} />
             </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Insights;
