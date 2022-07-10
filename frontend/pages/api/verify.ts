import type { NextApiRequest, NextApiResponse } from 'next';
import { ISearchData } from '../../lib/search/types';

interface IApiSearchRequest extends NextApiRequest {
  body: { userLastname?: string };
}

export type IApiSearchResponseData = ISearchData[];


export default async function handler(
  req: IApiSearchRequest,
  res: NextApiResponse<IApiSearchResponseData>
) {
  const {
    body: { userLastname },
  } = req;
  /*
  const response = await fetch(`http://localhost:1337/api/individuals?filters[lastname][$eq]=${searchTerm}`)
  const json = await response.json()
  const data = json.data
  console.log(data)
  */

  if (req.method === 'POST' && userLastname && userLastname.length >= 3) {
    const cleanedSearchName = userLastname.toLowerCase().trim()
    const response = await fetch(`http://localhost:1337/api/individuals?populate=*&filters[lastname][$eq]=${cleanedSearchName}`)
    const json = await response.json()
    const data = json.data
    res.status(200).json(data)
  } else {
    res.status(400).json([]);
  }
}

