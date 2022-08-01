import type { NextApiRequest, NextApiResponse } from 'next';
import { HouseholdModel } from '../../lib/new/types';

interface IApiSearchHousehold extends NextApiRequest {
  data: HouseholdModel
}

export type IApiSearchHouseholdResponseData = HouseholdModel[];



export default async function handler(
  req: IApiSearchHousehold,
  res: NextApiResponse<IApiSearchHouseholdResponseData>
) {
  const {
    body: { data },
  } = req;

  const updateHousehold = async() => {
    const id = data.id
    const postData = {
      "data": {
        ...data
      }
    }
    const response = await fetch(`http://localhost:1337/api/households/${id}`, {
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    const json = await response.json()
    const resData = json.data
    console.log(postData, json)
    return res.status(200).json(resData)
  }

  if (req.method === 'POST' && data) {
    // console.log('if')
    updateHousehold();
  } else {
    console.log('updatehousehole else')
    return res.status(500).json([])
  }
}
