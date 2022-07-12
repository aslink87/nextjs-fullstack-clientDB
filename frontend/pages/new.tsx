import Form from '../components/form/Form';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { ClientModel } from "../lib/new/types";
import { NextPageWithLayout } from './page';

const New: NextPageWithLayout = () => {

  const saveEnteredDataHandler = (enteredData: ClientModel, household: number) => {
    const data: ClientModel = {
      ...enteredData,
    }
    const householdId = household

    // POST new client and new household

    // POST new client PUT household
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
