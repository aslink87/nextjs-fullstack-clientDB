import type { NextApiRequest, NextApiResponse } from 'next';
import { ISearchData } from '../../lib/search/types';

interface IApiSearchRequest extends NextApiRequest {
  body: { searchTerm?: string };
}

export type IApiSearchResponseData = ISearchData[];


export default async function handler(
  req: IApiSearchRequest,
  res: NextApiResponse<IApiSearchResponseData>
) {
  const {
    body: { searchTerm },
  } = req;
  /*
  const response = await fetch(`http://localhost:1337/api/individuals?filters[lastname][$eq]=${searchTerm}`)
  const json = await response.json()
  const data = json.data
  console.log(data)
  */

  if (req.method === 'POST' && searchTerm && searchTerm.length > 0) {
    const cleanedSearchTerm = searchTerm.toLowerCase().trim()
    const response = await fetch(`http://localhost:1337/api/individuals?filters[lastname][$eq]=${cleanedSearchTerm}`)
    const json = await response.json()
    const data = json.data
    console.log("get", data)

    res.status(200).json(data)
  } else {
    res.status(400).json([]);
  }
}
