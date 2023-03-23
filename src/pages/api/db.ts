import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export async function handler(req: NextApiRequest, res: NextApiResponse) {
          try {
                    const client = await clientPromise;
                    const db = client.db("statisticsDB");
             
                    const stats = await db.collection("stats").find({}).toArray()
             
                    
             
                    res.json(await stats);
          } catch (error) {
                    // return the error
                   console.log(error);
                   
          }
}