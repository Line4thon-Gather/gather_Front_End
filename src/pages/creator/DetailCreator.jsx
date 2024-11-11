import React from 'react';
import DetailTop from '../../components/creator/DetailTop';
import TabSliderMenu from '../../components/creator/TabSliderMenu';
import styles from '../../styles/creator/DetailCreator.module.css';
import Footer from '../../components/home/Footer';

const DetailCreator = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.innercontainer}>
          <div className={styles.white}>
            <DetailTop />
          </div>
          <div className={styles.tabcontainer}>
            <TabSliderMenu />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailCreator;
