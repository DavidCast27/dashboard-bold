import {Transaction} from "../types/types.ts";

export const fetchSales = async ():Promise<{data: Transaction[]}> => {
  const response = await fetch('https://bold-fe-api.vercel.app/api');
  return await response.json() as {data: Transaction[]};
};