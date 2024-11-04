import React, { useState, useEffect } from 'react';
import styles from '../../styles/creator/TabSliderMenu.module.css';

const TabSliderMenu = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userContent, setUserContent] = useState([]);

  const tabs = ['소개/포트폴리오', '작업 가능 항목/가격', '연락 문의'];

  // 사용자 맞춤형 콘텐츠를 불러오는 함수 (예시로 하드코딩된 데이터 사용)
  useEffect(() => {
    // API 호출 또는 데이터베이스에서 사용자 콘텐츠를 가져오는 로직
    const fetchUserContent = () => {
      // 예시 데이터
      const content = [
        '사용자 소개 및 포트폴리오 내용',
        '작업 가능 항목 및 가격 정보',
        '연락 문의 방법에 대한 설명',
      ];
      setUserContent(content);
    };

    fetchUserContent();
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
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
        {userContent.length > 0 && (
          <div className={styles.tabContent}>{userContent[activeTab]}</div>
        )}
      </div>
    </div>
  );
};

export default TabSliderMenu;
