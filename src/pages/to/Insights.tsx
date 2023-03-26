import Sidebar from "../Sidebar";
import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import Card from "../components/Card";
import { Data } from "@/types";
import { useState } from "react";

interface Prop{
data:{
res: Data[]
}
}

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
function Insights({ data }: Prop) {
  const insightsData: Data[] = data.res;
  const [findCountry, setFindCountry] = useState<string>();
  const [foundedCountryList, setFoundedCountryList] =
    useState<Data[]>(insightsData);

  const filteredList = foundedCountryList.filter((obj: any) => {
    return findCountry === obj.country;
  });

  function onFilterValueSelected(filterValue: any) {
    setFindCountry(filterValue);
  }

  return (
    <div className="flex">
      <Sidebar />
      <div>
        <div className="text-2xl font-bold">Insights</div>
        <Filter
          data={insightsData}
          filterValueSelected={onFilterValueSelected}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
          {filteredList.map((data: any) => {
            return (
              <div key={data._id} className="m-2">
                <Link href={data.url}>
                  <Card
                    title={data.title}
                    country={data.country}
                    region={data.region}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

 function Filter({ data, filterValueSelected }: any) {
  function onFilterValueChanged(event: any) {
    filterValueSelected(event.target.value)
  }
interface CountryObject {
  country: string;
  id: string;
}

const countries: CountryObject[] = [];
const getCountries = (data: Data[]): CountryObject[] => {

  data.forEach((obj: any) => {
    const country = obj.country;
    const id = obj._id;
    const index = countries.findIndex((o) => o.country === country);

    if (index === -1) {
      countries.push({ country, id });
    }
  });

  return countries;
};

const cD = getCountries(data)
  return <div>
    <select name="country" id="countryFilter" title="country" onChange={onFilterValueChanged}>
      {cD.filter((obj: any) => {
        return obj.country != null && obj.country != undefined && obj.country != ""
      }).map((d: any) => {
        return <option key={d.id} value={d.country}>{d.country}</option>
      })}
    </select>
    <select name="region" id="regionFilter" title="region" onChange={onFilterValueChanged}>
      {cD.filter((obj: any) => {
        return obj.region != null && obj.region != undefined && obj.region != ""
      }).map((d: any) => {
        return <option key={d.id} value={d.region}>{d.region}</option>
      })}
    </select>
  </div>
}

export default Insights;
