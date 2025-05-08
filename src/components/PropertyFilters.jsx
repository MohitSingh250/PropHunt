import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function PropertyFilters() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('all');

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (type !== 'all') params.append('propertyType', type);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full rounded-md border p-2"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full rounded-md border p-2"
      >
        <option value="all">All</option>
        <option value="house">House</option>
        <option value="condo">Condo</option>
        <option value="apartment">Apartment</option>
      </select>
      <button onClick={applyFilters} className="w-full bg-primary text-white rounded-md py-2">
        Apply
      </button>
    </div>
  );
}