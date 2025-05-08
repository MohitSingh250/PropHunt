import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export function SearchBar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (location) navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        placeholder="Search by city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full rounded-md border p-2"
      />
      <button type="submit" className="bg-primary text-white rounded-md px-4">
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}