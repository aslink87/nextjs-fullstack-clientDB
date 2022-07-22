import type { NextApiRequest, NextApiResponse } from 'next';
import { HouseholdModel } from '../../lib/new/types';

interface IApiSearchHousehold extends NextApiRequest {
  body: {
    lastname? : string
  };
}

export type IApiSearchHouseholdResponseData = HouseholdModel[];



export default async function handler(
  req: IApiSearchHousehold,
  res: NextApiResponse<IApiSearchHouseholdResponseData>
) {
  const {
    body: { lastname },
  } = req;

  const getHousehold = async() => {
    const response = await fetch(`http://localhost:1337/api/households?populate=*&filters[individuals][lastname][$eq]=${lastname}`);
    const json = await response.json()
    const resData = json.data
    console.log(resData)
    return res.status(200).json(resData)
  }

  if (req.method === 'POST' && lastname) {
    getHousehold()
  } else {
    console.log('else')
    return res.status(500).json([])
  }
}
