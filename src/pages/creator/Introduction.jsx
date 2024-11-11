import React from 'react';
import styles from '../../styles/creator/Introduction.module.css';
import WorkDetail from '../../components/creator/WorkDetail';
import Defaultportfolio from '../../assets/images/Defaultportfolio.png';
import ExampleImage from '../../assets/images/ModalImage.png';
import Downoload from '../../assets/images/downloadPortfolio.png';

const Introduction = () => {
  const introductionContent =
    '크리에이터의 간단한 자기소개글이 작성되는 공간입니다. 크리에이터의 간단한 자기소개글이 작성되는 공간입니다. 크리에이터의 간단한 자기소개글이 작성되는 공간입니다.';

  const portfolioItems = [
    {
      id: 1,
      title: '포트폴리오 제목',
      thumbnail: ExampleImage,
      fileUrl: '/path/to/file1.pdf',
    },
    {
      id: 2,
      title: '포트폴리오 제목',
      fileUrl: '/path/to/file2.pdf',
    },
    {
      id: 3,
      title: '포트폴리오 제목',
      fileUrl: '/path/to/file2.pdf',
    },
  ];

  const workItems = [
    { id: 1, workName: '그래픽 디자인', price: 30000, duration: 5 },
    { id: 2, workName: '웹 개발', price: 50000, duration: 10 },
    { id: 3, workName: '모바일 앱 개발', price: 70000, duration: 15 },
    { id: 4, workName: 'SEO 최적화', price: 40000, duration: 7 },
    { id: 5, workName: '브랜딩', price: 60000, duration: 12 },
    { id: 6, workName: '영상 편집', price: 45000, duration: 8 },
  ];

  const contactKakaoId = 'exampleKakaoId';
  const contactEmail = 'example@example.com';

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <h2>소개</h2>
        <p>{introductionContent}</p>
      </div>
      <div className={styles.subcontainer}>
        <h2>
          포트폴리오
          <span className={styles.itemCount}>{portfolioItems.length}</span>
        </h2>

        <div className={styles.portfolioList}>
          {portfolioItems.map((item) => (
            <div key={item.id} className={styles.portfolioItem}>
              <img
                src={item.thumbnail ? item.thumbnail : Defaultportfolio}
                alt={item.title}
                className={styles.thumbnail}
              />
              <h4>{item.title}</h4>
              <a href={item.fileUrl} download>
                <img
                  src={Downoload}
                  alt="다운로드"
                  className={styles.downloadIcon}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.subcontainer}>
        <h2>
          작업 가능 항목 및 가격
          <span className={styles.itemCount}>{workItems.length}</span>
        </h2>
        <div className={styles.services}>
          {workItems.map((item) => (
            <div key={item.id} className={styles.serviceItem}>
              <WorkDetail
                imageUrl="../../assets/images/ModalImage.png"
                workName={item.workName}
                price={item.price}
                duration={item.duration}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.subcontainer}>
        <h2>연락 문의</h2>
        <div className={styles.connectionContainer}>
          <p className={styles.connection}>카카오톡 아이디</p>
          <p className={styles.howconnection}> &nbsp;| {contactKakaoId}</p>
        </div>
        <div className={styles.connectionContainer}>
          <p className={styles.connection}>이메일 주소</p>
          <p className={styles.howconnection}>&emsp;&emsp;| {contactEmail} </p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
