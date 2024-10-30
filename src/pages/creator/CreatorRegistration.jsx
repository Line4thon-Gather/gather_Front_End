import React, { useState } from 'react';
import styles from '../../styles/creator/CreatorRegistration.module.css';
import defaultProfileImage from '../../assets/images/profileImage.png';
import AddPortfolio from '../../assets/images/AddPortfolio.png';
import InputField from '../../components/creator/InputField';
import InputTextField from '../../components/creator/InputTextField';
import InputWrapper from '../../components/common/InputWrapper';

const CreatorRegistration = () => {
  const dropdownList = ['선택', '인쇄물', '영상', 'SNS'];
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [creatorName, setCreatorName] = useState('');
  const [introTitle, setIntroTitle] = useState('');
  const [introContent, setIntroContent] = useState('');
  const [portfolioItems, setPortfolioItems] = useState([
    { title: '', thumbnail: '', file: null },
  ]);
  const [workTitle, setWorkTitle] = useState('');
  const [kakaoId, setKakaoId] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(dropdownList[0]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePortfolioTitleChange = (index, event) => {
    const updatedPortfolioItems = [...portfolioItems];
    updatedPortfolioItems[index].title = event.target.value;
    setPortfolioItems(updatedPortfolioItems);
  };

  const handlePortfolioThumbnailUpload = (index, event) => {
    const file = event.target.files[0];
    const updatedPortfolioItems = [...portfolioItems];
    const reader = new FileReader();
    reader.onloadend = () => {
      updatedPortfolioItems[index].thumbnail = reader.result;
      setPortfolioItems(updatedPortfolioItems);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePortfolioFileUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedPortfolioItems = [...portfolioItems];
      updatedPortfolioItems[index].file = file;
      setPortfolioItems(updatedPortfolioItems);
    }
  };

  const addPortfolioItem = () => {
    setPortfolioItems([
      ...portfolioItems,
      { title: '', thumbnail: '', file: null },
    ]);
  };

  const removePortfolioItem = (index) => {
    const updatedPortfolioItems = portfolioItems.filter((_, i) => i !== index);
    setPortfolioItems(updatedPortfolioItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('크리에이터명:', creatorName);
    console.log('카테고리:', category);
    console.log('프로필 이미지:', profileImage);
    console.log('소개글 제목:', introTitle);
    console.log('소개글 내용:', introContent);
    console.log('포트폴리오:', portfolioItems);
    console.log('작업명:', workTitle);
    console.log('카카오톡 아이디:', kakaoId);
    console.log('이메일 주소:', email);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        {/* 기본 프로필 */}
        <section className={styles.section}>
          <h2>기본 프로필</h2>
          <div className={styles.profileContainer}>
            <div className={styles.subcontainer}>
              <h3>프로필 이미지</h3>
              <div className={styles.imageWrapper}>
                <label htmlFor="fileInput" className={styles.label}>
                  <img
                    src={profileImage}
                    alt="프로필 이미지"
                    className={styles.profileImage}
                  />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
            <div className={styles.align_container}>
              <InputField
                label="크리에이터명"
                value={creatorName}
                setValue={setCreatorName}
                placeholder="8자 이내의 크리에이터명을 입력해주세요."
                maxLength={8}
                maxWidth="500px"
              />
              <div className={styles.subcontainer}>
                <h3>카테고리</h3>
                <InputWrapper list={dropdownList} />
              </div>
            </div>
          </div>
        </section>

        {/* 소개글 작성 */}
        <section className={styles.section}>
          <h2>소개글 작성</h2>
          <div className={styles.profileContainer}>
            <div className={styles.align_container}>
              <InputField
                label="소개글 제목"
                value={introTitle}
                setValue={setIntroTitle}
                placeholder="10자 이내로 자신을 소개해주세요."
                maxLength={10}
                maxWidth="700px"
              />
              <InputTextField
                label="소개글 내용"
                value={introContent}
                setValue={setIntroContent}
                placeholder="50자 이내의 간단한 소개글을 입력해주세요."
                maxLength={50}
                maxWidth="100%"
              />
            </div>
          </div>
        </section>

        {/* 포트폴리오 등록 */}
        <section className={styles.section}>
          <h2>포트폴리오 등록</h2>
          <div className={styles.profileContaine2}>
            {portfolioItems.map((item, index) => (
              <div key={index} className={styles.portfolioItem}>
                <div className={styles.removeButtonContainer}>
                  <button
                    type="button"
                    onClick={() => removePortfolioItem(index)}
                    disabled={portfolioItems.length <= 1}
                    className={styles.removeButton}
                  >
                    삭제
                  </button>
                </div>
                <div className={styles.subcontainer}>
                  <InputField
                    label="포트폴리오 제목"
                    value={item.title}
                    setValue={(e) => handlePortfolioTitleChange(index, e)}
                    placeholder="포트폴리오 제목을 입력하세요."
                    maxLength={50}
                    maxWidth="100%"
                  />
                </div>
                <div className={styles.rowContainer}>
                  <div className={styles.subcontainer}>
                    <h3>썸네일 이미지</h3>
                    <div className={styles.imageWrapper}>
                      <label
                        htmlFor={`thumbnailInput-${index}`}
                        className={styles.label}
                      >
                        <img
                          src={item.thumbnail || AddPortfolio}
                          alt="썸네일 이미지"
                          className={styles.profileImage}
                        />
                      </label>
                      <input
                        id={`thumbnailInput-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handlePortfolioThumbnailUpload(index, e)
                        }
                        className={styles.fileInput}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                  <div className={styles.subcontainer}>
                    <h3>파일 추가</h3>
                    <label className={styles.fileButton}>
                      {item.file ? item.file.name : '+ 파일 선택'}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => handlePortfolioFileUpload(index, e)}
                        className={styles.fileInput}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addPortfolioItem}
              className={styles.addButton}
            >
              + 포트폴리오 추가
            </button>
          </div>
        </section>

        {/* 작업 가능 항목/가격 */}
        <section className={styles.section}>
          <h2>작업 가능 항목/가격</h2>
          <div className={styles.profileContainer}>
            <div className={styles.align_container}>
              <InputField
                label="작업명"
                value={workTitle}
                setValue={setWorkTitle}
                placeholder="10자 이내로 작업명을 입력해주세요."
                maxLength={10}
              />
            </div>
          </div>
        </section>

        {/* 연락 문의 */}
        <section className={styles.section}>
          <h2>연락 문의</h2>
          <div className={styles.profileContainer}>
            <div className={styles.inputFieldContainer}>
              <InputField
                label="카카오톡 아이디"
                value={kakaoId}
                setValue={setKakaoId}
                placeholder="카카오톡 아이디를 입력해주세요."
                maxLength={10}
                maxWidth="700px"
              />
              <InputField
                label="이메일 주소"
                value={email}
                setValue={setEmail}
                placeholder="이메일 주소를 입력해주세요."
                maxLength={50}
                maxWidth="700px"
              />
            </div>
          </div>
        </section>

        {/* 등록 버튼 */}
        <button type="submit" className={styles.submitButton}>
          등록하기
        </button>
      </form>
    </div>
  );
};

export default CreatorRegistration;
