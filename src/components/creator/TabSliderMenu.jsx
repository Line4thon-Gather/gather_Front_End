import React, { useState } from 'react';
import styles from '../../styles/creator/TabSliderMenu.module.css';
import Introduction from '../../pages/creator/Introduction';
// import Services from './Services';
// import Contact from './Contact';

const TabSliderMenu = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['소개/포트폴리오', '작업 가능 항목/가격', '연락 문의'];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Introduction />;
      // case 1:
      //   return <Services />;
      // case 2:
      //   return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.tabSliderMenu}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${
              activeTab === index ? styles.active : ''
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.slider}>
        <div className={styles.tabContent}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default TabSliderMenu;
