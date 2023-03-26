import { Data } from "@/types";
interface Prop {
  data: Data[],
  filterValueSelected: Function
}

export default function Filter({ data, filterValueSelected }: Prop) {
  function onFilterValueChanged(event: any) {
    filterValueSelected(event.target.value)
  }
  let countries: any[] = []
const l: number = data.length
  for (let i = 0; i < l; i++) {
    const obj = data[i];
    const country = obj.country;
    const id = obj._id;
    const index = countries.findIndex((o) => o.country === country);
    if (index === -1) {
      countries.push({ country, id });
    }
  }

  return <div>
    <select name="country" id="countryFilter" title="country" onChange={onFilterValueChanged}>
      {countries.filter((obj: any) => {
        return obj.country != null && obj.country != undefined && obj.country != ""
      }).map((d: any) => {
        return <option key={d.id} value={d.country}>{d.country}</option>
      })}
    </select>
    <select name="region" id="regionFilter" title="region" onChange={onFilterValueChanged}>
      {countries.filter((obj: any) => {
        return obj.region != null && obj.region != undefined && obj.region != ""
      }).map((d: any) => {
        return <option key={d.id} value={d.region}>{d.region}</option>
      })}
    </select>
  </div>
}
