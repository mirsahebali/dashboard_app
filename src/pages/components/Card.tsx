import styles from "@/styles/Card.module.css"

function Card({title, country, topic, region, source, start_year, end_year}:any) {
          return ( 
                    <div className={styles.card}>
                              <div className="bg-yellow-200 rounded-t-md p-1">{title}</div>
                              <div className="bg-yellow-100 rounded m-1 flex justify-center items-center">{country}</div>
                              <div className="bg-gradient-to-r from-cyan-500 to-blue-500">{topic}</div>
                              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-md flex justify-center">{region}</div>
                              <div>{source}</div>
                              {start_year? <div className="bg-gradient-to-r from-indigo-500">{start_year}</div>: ""}

                    </div>);
}

export default Card;