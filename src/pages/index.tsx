import Head from "next/head";
// import CountriesImpact from "./to/Charts";
import clientPromise from "@/lib/mongodb";
import Sidebar from "./Sidebar";
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
export default function Home({data}:any) {

  return (
    <>
      <Head>
        <title>DashBoard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex">
<Sidebar/>
</div>
      </main>
    </>
  );
}

