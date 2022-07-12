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
  /*
  const response = await fetch(`http://localhost:1337/api/individuals?filters[lastname][$eq]=${searchTerm}`)
  const json = await response.json()
  const data = json.data
  console.log(data)
  */
/*
  if (req.method === 'POST' && data) {
    const response = await fetch(`http://localhost:1337/api/individuals/`, {
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const json = await response.json()
    const resData = json.data
    console.log(resData)

    res.status(200).json(data)
  } else {
    res.status(400).json(data);
    console.log('failed', res)
  }
}
*/
    /*
    const response = await fetch(`http://localhost:1337/api/individuals?filters[lastname][$eq]=${cleanedSearchTerm}`)
    const json = await response.json()
    const data = json.data
    console.log("get", data)
    */
  if (req.method === 'POST' && data) {
    if (data.id != 0) {
      // new client, update household
      console.log('if')

    } else if (data.id === 0) {
      // new client, new household
      console.log('else if')
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
      console.log(resData)

      res.status(200).json(data)
    }
  } else {console.log('else')}


}
