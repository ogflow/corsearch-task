import Tag from 'components/Tag/Tag';
import { FaEnvelope, FaGlobe, FaPhoneAlt } from 'react-icons/fa';
import User from 'types/User';
import styles from './UserCard.module.scss';

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  return (
    <div className={styles['user-card']}>
      <div className={styles['header']}>
        <h3>{user.name}</h3>
        <p className={styles['address']}>
          {user.address.street}
          <br />
          {user.address.zipcode} {user.address.city}
        </p>
      </div>
      <div className={styles['toolbar']}>
        <Tag
          text={user.website}
          link={`https://${user.website}`}
          Icon={FaGlobe}
        />
        <Tag
          text={user.email}
          link={`mailto:${user.email}`}
          Icon={FaEnvelope}
        />
        <Tag text={user.phone} link={`tel:${user.phone}`} Icon={FaPhoneAlt} />
      </div>
    </div>
  );
}

export default UserCard;
