import { IconType } from 'react-icons';
import styles from './Tag.module.scss';

type TagProps = {
  text: string;
  link: string;
  Icon?: IconType;
};

function Tag({ text, link, Icon }: TagProps) {
  if (!text) return null;

  return (
    <a className={styles['tag']} href={link}>
      {Icon && (
        <div className={styles['icon']}>
          <Icon />
        </div>
      )}
      {text}
    </a>
  );
}

export default Tag;
