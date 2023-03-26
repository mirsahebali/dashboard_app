import styles from "@/styles/Card.module.css"

function Card({title, country, topic, region, source, start_year, end_year}:any) {
          return ( 
                    <div className={styles.card}>
                              <div>{title}</div>
                              <div>{country}</div>
                              <div>{topic}</div>
                              <div>{region}</div>
                              <div>{source}</div>
                              {start_year? <div>{start_year}</div>: ""}

                    </div>);
}

export default Card;