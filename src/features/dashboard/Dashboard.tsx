import { getUsers } from 'api/users';
import { useEffect, useState } from 'react';
import { SortOrder, SortProperty } from 'types/Sorting';
import User from 'types/User';
import { useDebounce } from 'use-debounce';
import flattenObjectValues from 'utils/flattenObjectValues';
import styles from './Dashboard.module.scss';
import UserCard from './UserCard';

function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [query, setQuery] = useState<string>('');
  const [debounceQuery] = useDebounce(query, 300);
  const [sortProperty, setSortProperty] = useState<SortProperty | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

  const sortUsers = (users: User[]): User[] => {
    if (!sortProperty) return users;

    return [...users].sort((a, b) => {
      const aValue = a[sortProperty].toLowerCase();
      const bValue = b[sortProperty].toLowerCase();

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

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
    const filterAndSortUsers = () => {
      const lowercaseQuery = debounceQuery.toLowerCase();

      const filtered = users.filter((user) => {
        const userDataString = flattenObjectValues(user).toLowerCase();
        return userDataString.includes(lowercaseQuery);
      });

      const sorted = sortUsers(filtered);
      setFilteredUsers(sorted);
    };

    filterAndSortUsers();
  }, [debounceQuery, sortProperty, sortOrder, users]);

  return (
    <div className={styles['dashboard']}>
      <h1>Dashboard</h1>

      <div className={styles['toolbar']}>
        <input
          type="text"
          placeholder="Search user..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading || !!error}
          className={styles['filter-input']}
        />

        <div className={styles['sorting']}>
          <select
            value={sortProperty || ''}
            onChange={(e) => setSortProperty(e.target.value as SortProperty)}
            disabled={loading || !!error}
          >
            <option value="">Sort by</option>
            <option value={SortProperty.NAME}>Name</option>
            <option value={SortProperty.EMAIL}>Email</option>
          </select>
          <div>
            <label>
              <input
                type="radio"
                value={SortOrder.ASC}
                checked={sortOrder === SortOrder.ASC}
                onChange={() => setSortOrder(SortOrder.ASC)}
                disabled={loading || !!error}
              />
              Ascending
            </label>
            <label>
              <input
                type="radio"
                value={SortOrder.DESC}
                checked={sortOrder === SortOrder.DESC}
                onChange={() => setSortOrder(SortOrder.DESC)}
                disabled={loading || !!error}
              />
              Descending
            </label>
          </div>
        </div>
      </div>

      {loading && <p>loading...</p>}

      {error && <p>{error}</p>}

      <div className={styles['users-list']}>
        {!error &&
          !loading &&
          (filteredUsers.length ? (
            filteredUsers.map((user) => <UserCard user={user} key={user.id} />)
          ) : (
            <p>No users matching filters</p>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
