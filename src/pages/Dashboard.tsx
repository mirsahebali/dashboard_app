import Charts from "./components/CCharts"
import Insights from './components/CInsights';
import clientPromise from "@/lib/mongodb";
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