import { getUsers } from 'api/users';
import { useEffect, useState } from 'react';
import User from 'types/User';
import UserCard from './UserCard';

function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError('Error fetching users!');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {loading && <p>loading...</p>}

      {error && <p>{error}</p>}

      <div>
        {!error &&
          !loading &&
          users.map((user) => <UserCard user={user} key={user.id} />)}
      </div>
    </div>
  );
}

export default Dashboard;
