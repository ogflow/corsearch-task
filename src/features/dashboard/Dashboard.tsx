import { getUsers } from 'api/users';
import { useEffect, useState } from 'react';
import User from 'types/User';
import { useDebounce } from 'use-debounce';
import flattenObjectValues from 'utils/flattenObjectValues';
import UserCard from './UserCard';

function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [query, setQuery] = useState<string>('');
  const [debounceQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        setError('Error fetching users!');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      const lowercaseQuery = debounceQuery.toLowerCase();

      const filtered = users.filter((user) => {
        const userDataString = flattenObjectValues(user).toLowerCase();
        return userDataString.includes(lowercaseQuery);
      });

      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [debounceQuery]);

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading || !!error}
        />
      </div>

      {loading && <p>loading...</p>}

      {error && <p>{error}</p>}

      <div>
        {!error &&
          !loading &&
          filteredUsers.map((user) => <UserCard user={user} key={user.id} />)}
      </div>
    </div>
  );
}

export default Dashboard;
