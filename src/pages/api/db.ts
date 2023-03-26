import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(req:NextApiRequest, res:NextApiResponse)   {
   try {
       const client = await clientPromise;
       const db = client.db("statisticsDB");
       const stats = await db.collection("worldStats").find({}).toArray()
       res.json(await stats);
   } catch (e) {
       console.error(e);
   }
};