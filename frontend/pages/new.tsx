import { useRouter } from 'next/router';
import Form from '../components/form/Form';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { ClientModel } from "../lib/new/types";
import { NextPageWithLayout } from './page';

const New: NextPageWithLayout = () => {
  const router = useRouter();


  const saveEnteredDataHandler = async(enteredData: ClientModel, household: number) => {
    const data: ClientModel = {
      ...enteredData,
      id: household
    }


    await fetch(`http://localhost:3000/api/new`, {
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

/*
    if (householdId === 0) {
      // POST new client and new household
      console.log('new client and household')
      await fetch(`http://localhost:3000/api/new`, {
        body: JSON.stringify({ data }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      // await router.push(`/results?search=${data.lastname}`);
    } else {
      // POST new client PUT household
      console.log('new client, update household')
      await fetch(`http://localhost:3000/api/new`, {
        body: JSON.stringify({ data }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    }
*/
  }

  return (
  <>
    <Form onSaveEnteredData={saveEnteredDataHandler} />
  </>
  )
}

export default New;

New.getLayout = (page) => {
  return <PrimaryLayout justify="items-start">{page}</PrimaryLayout>;
};
