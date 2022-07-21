import type { NextApiRequest, NextApiResponse } from 'next';
import { HouseholdModel } from '../../lib/new/types';

interface IApiSearchHousehold extends NextApiRequest {
  body: {
      enteredData: HouseholdModel
  };
}

export type IApiSearchHouseholdResponseData = HouseholdModel[];



export default async function handler(
  req: IApiSearchHousehold,
  res: NextApiResponse<IApiSearchHouseholdResponseData>
) {
  const {
    body: { enteredData },
  } = req;

  const updateHousehold = async() => {
    const id = +enteredData.id
    console.log(id)
    const postData = {
      "data": {
        ...enteredData
      }
    }
    const response = await fetch(`http://localhost:1337/api/households/${id}`, {
      body: JSON.stringify({postData}),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    const json = await response.json()
    const resData = json.data
    return res.status(200).json(resData)
  }

  if (req.method === 'POST' && enteredData) {
    updateHousehold();
  } else {
    console.log('else')
    return res.status(500).json([])
  }
}


/*
  // update client
  const updateClient = async() => {
    const updateData = {
      "data": {
        ...data
      }
    }
    console.log(updateData)
    const response = await fetch(`http://localhost:1337/api/individuals/${data.id}`, {
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    const json = await response.json()
    const resData = json.data
    return res.status(200).json(resData)
  }
*/
