import Link from 'next/link';

export interface INavigation extends React.ComponentPropsWithoutRef<'header'> {}

const Navigation: React.FC<INavigation> = ({ ...headerProps }) => {
  return (
    <header
    {...headerProps}
    className={"w-full flex flex-row justify-between"}
    >
      <nav className="w-full bg-blue-900">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link href="/">
                    <a className="bg-yellow-600 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>
                  </Link>
                  <Link href="/new">
                    <a className="text-gray-300 hover:bg-blue-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">New Client</a>
                  </Link>

                  <Link href="/search">
                    <a className="text-gray-300 hover:bg-blue-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">Search</a>
                  </Link>

                  <Link href="reports">
                    <a className="text-gray-300 hover:bg-blue-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">Reports</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
};

export default Navigation;

