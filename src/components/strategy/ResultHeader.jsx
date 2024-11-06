import logo from '../../assets/images/logo.png';
import { getTagInfo, getTitle } from '../../hooks/useStrategy';
import PropTypes from 'prop-types';
import styles from '../../styles/strategy/ResultHeader.module.css';

export default function ResultHeader({ title, type }) {
  const data = {
    period: 10,
    budget: 10000,
    target: 50,
  };
  const tagInfos = getTagInfo(data, type);

  return (
    <div className={styles.pageWrapper}>
      <img src={logo} />
      <div className={styles.header}>
        <span>{title ? '투개더가 추천하는' : '예산에 맞는'} </span>
        <span>{type}</span>
        <span> 이에요</span>
      </div>
      <div className={styles.header2}>
        <div>
          <span>{title} </span>
          <span>의 {getTitle(type)}</span>
        </div>
        <div className={styles.tagWrapper}>
          {tagInfos.map((item, index) => (
            <div className={styles.tag} key={index}>
              <img src={'src/assets/images/' + item.src} />
              <span>{item.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ResultHeader.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
};
