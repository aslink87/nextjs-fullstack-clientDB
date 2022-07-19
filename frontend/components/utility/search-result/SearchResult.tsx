import { ISearchData } from '../../../lib/search/types';
import UpdateClient from '../updateClient/UpdateClient';
import UpdateHousehold from '../updateHousehold/UpdateHousehold';

export type ISearchResult = ISearchData & React.ComponentPropsWithoutRef<'div'>;

const SearchResult: React.FC<ISearchResult | any> = ({
  id,
  attributes,
  ...divProps
}) => {

/*
  const birthyear = Date.parse(attributes.birthdate)
  const now = new Date().toISOString()
  const nowParsed = Date.parse(now)
  const age = Math.round(((nowParsed - birthyear) / 31557600000))
*/

  const calculateAge = () => {
    const transformedBirthdate = Date.parse(attributes.birthdate);
    let diff = Date.now() - transformedBirthdate;
    let age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - 1970);
  }

  const gender = () => {
    if (attributes.gender === 'ttf'){return 'trans male to female'}
    else if (attributes.gender === 'ttm'){return 'trans female to male'}
    else if (attributes.gender === 'nc'){return 'non conforming'}
    else if (attributes.gender === 'r'){return ' refused to answer'}
    else return attributes.gender
  }

  const source = () => {
    if (attributes.source === 'none'){return 'None Entered'}
    else if (attributes.source === 'childsupport'){return 'Child Support'}
    else if (attributes.source === 'pension'){return 'Pension'}
    else if (attributes.source === 'privatedisability'){return 'Private Disability'}
    else if (attributes.source === 'earnedincome'){return 'Earned Income'}
    else if (attributes.source === 'ssr'){return 'SSR'}
    else if (attributes.source === 'ssi'){return 'SSI'}
    else if (attributes.source === 'ssdi'){return 'SSDI'}
    else if (attributes.source === 'unemployment'){return 'Unemployment'}
    else if (attributes.source === 'other'){return 'Other'}
    else return attributes.source
  }

  return (
    <div
      {...divProps}
      className={'flex flex-col w-5/6 max-w-screen-md space-y-1 mx-auto'}
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Client Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="uppercase mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{attributes.firstname}{' '}{attributes.middlename}{' '}{attributes.lastname}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Birthdate</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{attributes.birthdate} age: {calculateAge()}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="capitalize mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{gender()}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{attributes.email}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Church</dt>
              <dd className="capitalize mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{attributes.church}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Details</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {attributes.veteran != false ? <p>Veteran</p> : null}
                {attributes.disabled != false ? <p>Disabled</p> : null}
                {attributes.ebt != false ? <p>EBT</p> : null}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Income</dt>
              <dd className="capitalize mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${attributes.income}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Income Source</dt>
              <dd className="capitalize mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{source()}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="capitalize mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{attributes.notes}</dd>
            </div>
          </dl>
        </div>
          <UpdateClient id={id}{...attributes} />
          <UpdateHousehold id={id} />
      </div>
    </div>
  );
};

export default SearchResult;
