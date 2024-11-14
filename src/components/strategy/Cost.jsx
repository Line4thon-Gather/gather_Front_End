import ResultHeader from './ResultHeader';
import styles from '../../styles/strategy/Cost.module.css';
import PropTypes from 'prop-types';

export default function Cost({ data }) {
  const totalCost = new Intl.NumberFormat('ko-KR').format(
    parseInt(data[0].cost.replace(/,/g, '')) +
      (data[1] ? parseInt(data[1].cost.replace(/,/g, '')) : 0) +
      (data[2] ? parseInt(data[2].cost.replace(/,/g, '')) : 0)
  );
  return (
    <div className={styles.costWrapper}>
      <div className={styles.contentWrapper}>
        <ResultHeader
          title="멋쟁이 사자처럼 13기 모집"
          type="비용관리"
          data={data}
        />
        <div className={styles.cardWrapper}>
          {data.map((item, index) => (
            <div key={index} className={styles.card}>
              <div>
                <div className={styles.cardImg}>
                  <img src={'/' + item.means + '.png'} />
                </div>
                <div className={styles.cost}>
                  <span>{item.means}</span>
                  <span>{item.cost}원</span>
                  <span>{item.rate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.totalWrapper}>
          <span>총 사용 비용 </span>
          <span>{totalCost}</span>
        </div>
      </div>
    </div>
  );
}

Cost.propTypes = {
  data: PropTypes.array,
};
