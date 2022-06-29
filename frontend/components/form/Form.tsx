export interface IForm {
  id: number;
  attributes: {
    firstname: string,
    lastname: string,
    middlename: string,
    birthdate: string
  }
}

const Form: React.FC<IForm> = ({ id, attributes}) => {
  return (
    <div className="w-full">
        <form action="#" method="POST" className="mt-5 md:mt-0 w-4/5 mx-auto">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-8 gap-6">
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    First
                  </span>
                  <input
                    type="text"
                    name="firstname-input"
                    id="firstname"
                    className="firstname focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Last
                  </span>
                  <input
                    type="text"
                    name="lastname-input"
                    id="lastname"
                    className="lastname focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    MI
                  </span>
                  <input
                    type="text"
                    name="middlename-input"
                    id="middlename"
                    className="middlename focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Birthdate
                  </span>
                  <input
                    type="date"
                    name="birthdate-input"
                    id="birthdate"
                    className="birthdate focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Address
                  </span>
                  <input
                    type="text"
                    name="address-input"
                    id="address"
                    className="address focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
    </div>
  )
};

export default Form;

/*
                  */
