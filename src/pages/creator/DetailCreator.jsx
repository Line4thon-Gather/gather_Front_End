import React from 'react';
import { useParams } from 'react-router-dom';
import DetailTop from '../../components/creator/DetailTop';
import TabSliderMenu from '../../components/creator/TabSliderMenu';
import styles from '../../styles/creator/DetailCreator.module.css';
import Footer from '../../components/home/Footer';

const DetailCreator = ({ creatorData }) => {
  const { nickname } = useParams();

  const creator = creatorData.find((creator) => creator.id === parseInt(id));

  if (!creator) {
    return <div>크리에이터 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.innercontainer}>
          <div className={styles.white}>
            <DetailTop creator={creator} />
          </div>
          <div className={styles.tabcontainer}>
            <TabSliderMenu creator={creator} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailCreator;
