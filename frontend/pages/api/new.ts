import type { NextApiRequest, NextApiResponse } from 'next';
import { ClientModel } from '../../lib/new/types';

interface IApiNewPost extends NextApiRequest {
  data?: {};
}

export type IApiSearchResponseData = ClientModel[];



export default async function handler(
  req: IApiNewPost,
  res: NextApiResponse<IApiNewPost>
) {
  const {
    body: { data },
  } = req;

  // create new client
  const newClient = async(action: string, household: number) => {
    delete data.id
    const response = await fetch(`http://localhost:1337/api/individuals/`, {
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const json = await response.json()
    const resData = json.data
    const clientId = resData.id
    if (action === "new"){
      newHousehold(action, clientId)
    } else if (action === "update") {
      updateHousehold(household, clientId)
    } else {
      console.log("newclient else")
    }
  }

  // create new household
  const newHousehold = async(action: string, clientId: number) => {
    delete data.id
    const response = await fetch(`http://localhost:1337/api/households/`, {
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const json = await response.json()
    const resData = json.data
    const household = resData.id
    if (action === "new"){
      updateHousehold(household, clientId)
    } else {
      return res.status(200).json(resData)
    }
  }

  // add client to household
  const updateHousehold = async(householdId: number, clientId: number) => {
    const individualData = {
      "data": {
        "household": householdId
      }
    }
    const response = await fetch(`http://localhost:1337/api/individuals/${clientId}?populate=household`, {
      body: JSON.stringify(individualData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    const json = await response.json()
    const resData = json.data
    console.log(resData)
    return res.status(200).json(resData)
  }

  if (req.method === 'POST' && data) {
    if (data.id != 0) {
      // new client, update household
      console.log('if')
      const action = "update"
      const household = data.id
      newClient(action, household)

    } else if (data.id === 0) {
      // new client, new household
      const action = "new"
      const household = 0
      newClient(action, household)
    }
  } else {console.log('else')}
}
