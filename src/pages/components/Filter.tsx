
export default function Filter({data}:any){


          function onFilterValueChanged(event:any){
                    console.log(event.target.value);
                    
                    }
          let countries:any[] = []
        
          for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            const country = obj.country;
            const id = obj._id;
            const index = countries.findIndex((o) => o.country === country);
            if (index === -1) {
              countries.push({  country, id });
            }
          }
        
        return <div>
        <select name="country" id="countryFilter" title="country" onChange={onFilterValueChanged}>
            {countries.filter((obj:any)=> {
          return obj.country != null && obj.country != undefined && obj.country != ""  
          }).map((d:any)=> {
            return <option key={d.id}  value={d.country}>{d.country}</option>
            })}
        </select>
        {/* <select name="region" id="regionFilter" title="region" onChange={onFilterValueChanged}>
            {countries.filter((obj:any)=> {
          return obj.country != null && obj.country != undefined && obj.country != ""  
          }).map((d:any)=> {
            return <option key={d.id}  value={d.country}>{d.country}</option>
            })}
        </select> */}
        </div>
        }
        