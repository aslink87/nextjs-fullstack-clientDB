import { useRouter } from 'next/router';
import { useState } from 'react';

export interface ISearch {}

const Search: React.FC<ISearch> = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <form
      className="flex flex-col items-center gap-y-5 py-10"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/results?search=${searchTerm}`);
      }}
    >
      <input
        type="text"
        className="rounded-full border-2 w-5/6 sm:w-128 h-12 px-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default Search;

