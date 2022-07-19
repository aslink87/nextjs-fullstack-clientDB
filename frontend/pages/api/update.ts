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

  // update client
  const updateClient = async() => {
    const updateData = {
      "data": {
        ...data
      }
    }
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

  if (req.method === 'POST' && data) {
    updateClient()
  } else {
    console.log('else')
    return res.status(500)
  }
}
