import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';

export function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '32rem',
        margin: '0 auto',
        transition: 'all 0.2s ease',
        ...(isFocused ? {
          boxShadow: '0 0 0 2px #3b82f6',
          borderRadius: '0.5rem'
        } : {})
      }}
    >
      <div style={{ position: 'relative' }}>
        <SearchIcon style={{
          position: 'absolute',
          left: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '1rem',
          width: '1rem',
          color: '#64748b'
        }} />
        <input
          type="text"
          placeholder="Search properties by location, features or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            paddingLeft: '2.5rem',
            paddingRight: '5rem',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            fontSize: '0.875rem',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            borderRadius: '0.375rem',
            padding: '0.25rem 0.75rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'background-color 0.2s ease',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}