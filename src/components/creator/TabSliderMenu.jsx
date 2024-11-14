import React from 'react';
import styles from '../../styles/creator/TabSliderMenu.module.css';
import Defaultportfolio from '../../assets/images/Defaultportfolio.png';
import Downoload from '../../assets/images/downloadPortfolio.png';
import WorkDetail from '../../components/creator/WorkDetail';

const TabSliderMenu = ({ creator }) => {
  const {
    introductionContent,
    getPortfolioResList,
    getWorkResList,
    contactKakaoId,
    contactEmail,
  } = creator;

  return (
    <div>
      <div className={styles.content}>
        {/* 소개 섹션 */}
        <div className={styles.subcontainer}>
          <h2>소개</h2>
          <p>
            {introductionContent
              ? introductionContent
              : '크리에이터의 간단한 소개가 없습니다.'}
          </p>
        </div>

        {/* 포트폴리오 섹션 */}
        <div className={styles.subcontainer}>
          <h2>
            포트폴리오
            <span className={styles.itemCount}>
              {getPortfolioResList.length}
            </span>
          </h2>
          <div className={styles.portfolioList}>
            {getPortfolioResList && getPortfolioResList.length > 0 ? (
              getPortfolioResList.map((item, index) => (
                <div key={index} className={styles.portfolioItem}>
                  <img
                    src={item.thumbnail ? item.thumbnail : Defaultportfolio}
                    alt={item.title}
                    className={styles.thumbnail}
                  />
                  <h4>{item.title ? item.title : '포트폴리오 제목 없음'}</h4>
                  {item.fileUrl && (
                    <a href={item.fileUrl} download>
                      <img
                        src={Downoload}
                        alt="다운로드"
                        className={styles.downloadIcon}
                      />
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p>포트폴리오가 없습니다.</p>
            )}
          </div>
        </div>

        {/* 작업 가능 항목 및 가격 섹션 */}
        <div className={styles.subcontainer}>
          <h2>
            작업 가능 항목 및 가격
            <span className={styles.itemCount}>{getWorkResList.length}</span>
          </h2>
          <div className={styles.services}>
            {getWorkResList && getWorkResList.length > 0 ? (
              getWorkResList.map((item, index) => (
                <div key={index} className={styles.serviceItem}>
                  <WorkDetail
                    imageUrl="../../assets/images/ModalImage.png"
                    workName={item.workName}
                    price={item.price}
                    duration={item.duration}
                  />
                </div>
              ))
            ) : (
              <p>작업 가능한 항목이 없습니다.</p>
            )}
          </div>
        </div>

        {/* 연락 정보 섹션 */}
        <div className={styles.subcontainer}>
          <h2>연락 문의</h2>
          <div className={styles.connectionContainer}>
            <p className={styles.connection}>카카오톡 아이디</p>
            <p className={styles.howconnection}>
              &nbsp;|
              {contactKakaoId ? contactKakaoId : '카카오톡 아이디가 없습니다.'}
            </p>
          </div>
          <div className={styles.connectionContainer}>
            <p className={styles.connection}>이메일 주소</p>
            <p className={styles.howconnection}>
              &emsp;&emsp;|
              {contactEmail ? contactEmail : '이메일 주소가 없습니다.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSliderMenu;
