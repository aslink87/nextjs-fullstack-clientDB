import { IForm } from './Form';

const base: IForm = {
  id: 21,
  attributes: {
    firstname: 'john',
    lastname: 'doe',
    middlename: 'g',
    birthdate: '10-5-1984'
  }
};

export const mockFormProps = {
  base,
};
