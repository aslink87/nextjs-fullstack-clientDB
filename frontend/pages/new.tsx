import Form from '../components/form/Form';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { ClientModel } from "../lib/new/types";
import { NextPageWithLayout } from './page';

const New: NextPageWithLayout = () => {


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
  }

  return (
  <div className="new py-6">
    <Form onSaveEnteredData={saveEnteredDataHandler} />
  </div>
  )
}

export default New;

New.getLayout = (page) => {
  return <PrimaryLayout justify="items-start">{page}</PrimaryLayout>;
};
