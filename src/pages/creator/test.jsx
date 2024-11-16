import React, { useState, useEffect } from 'react';
import styles from '../../styles/creator/CreatorRegistration.module.css';
import defaultProfileImage from '../../assets/images/profileImage.png';
import AddPortfolio from '../../assets/images/AddPortfolio.png';
import InputField from '../../components/creator/InputField';
import InputTextField from '../../components/creator/InputTextField';
import CheckModal from './CheckModal';
import Toggle2 from '../../components/creator/ReToggle';

const dropdownList = ['선택', '인쇄물', '영상', 'SNS'];

const CreatorRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [creatorData, setCreatorData] = useState({
    profileImage: defaultProfileImage,
    creatorName: '',
    introTitle: '',
    introContent: '',
    portfolioItems: [{ title: '', thumbnail: '', file: null }],
    workItems: [{ title: '', duration: '', price: '' }],
    kakaoId: '',
    email: '',
    category: dropdownList[0],
  });

  // 필수 필드가 모두 입력되었는지 확인하는 함수
  const checkFormComplete = () => {
    const isPortfolioComplete = creatorData.portfolioItems.every(
      (item) => item.title && item.thumbnail && item.file
    );
    const isWorkItemsComplete = creatorData.workItems.every(
      (item) => item.title && item.duration && item.price
    );
    const isBasicInfoComplete =
      creatorData.creatorName &&
      creatorData.introTitle &&
      creatorData.introContent &&
      creatorData.kakaoId &&
      creatorData.email;

    return isBasicInfoComplete && isPortfolioComplete && isWorkItemsComplete;
  };

  // 폼 상태 업데이트 시마다 필수 입력 값 확인
  useEffect(() => {
    setIsFormComplete(checkFormComplete());
  }, [creatorData]);

  const handleChange = (section, index, field, value) => {
    setCreatorData((prevData) => ({
      ...prevData,
      [section]: prevData[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddItem = (section) => {
    setCreatorData((prevData) => ({
      ...prevData,
      [section]: [
        ...prevData[section],
        { title: '', duration: '', price: '', thumbnail: '', file: null },
      ],
    }));
  };

  const handleRemoveItem = (section, index) => {
    setCreatorData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setCreatorData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormComplete) {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  const handleRemoveFile = (section, index) => {
    setCreatorData((prevData) => ({
      ...prevData,
      [section]: prevData[section].map((item, i) =>
        i === index ? { ...item, file: null, thumbnail: '' } : item
      ),
    }));
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          {/* 기본 프로필 */}
          <section className={styles.section}>
            <h2>기본 프로필</h2>
            <div className={styles.profileContainer}>
              <label htmlFor="fileInput" className={styles.label}>
                <img
                  src={creatorData.profileImage}
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
              <InputField
                label="크리에이터명"
                value={creatorData.creatorName}
                setValue={(value) =>
                  setCreatorData({ ...creatorData, creatorName: value })
                }
                placeholder="USER0000"
                maxLength={8}
                maxWidth="500px"
              />
            </div>
          </section>

          {/* 소개글 작성 */}
          <section className={styles.section}>
            <h2>소개글 작성</h2>
            <InputField
              label="소개글 제목"
              value={creatorData.introTitle}
              setValue={(value) =>
                setCreatorData({ ...creatorData, introTitle: value })
              }
              placeholder="포트폴리오의 제목을 20자 이내로 작성해주세요."
              maxLength={20}
              maxWidth="550px"
            />
            <InputTextField
              label="소개글 내용"
              value={creatorData.introContent}
              setValue={(value) =>
                setCreatorData({ ...creatorData, introContent: value })
              }
              placeholder="20자 이내의 간단한 소개글을 입력해주세요."
              maxLength={20}
              maxWidth="100%"
            />
          </section>

          {/* 포트폴리오 등록 */}
          <section className={styles.section}>
            <h2>포트폴리오 등록</h2>
            {creatorData.portfolioItems.map((item, index) => (
              <div key={index} className={styles.portfolioItem}>
                <InputField
                  label="포트폴리오 제목"
                  value={item.title}
                  setValue={(value) =>
                    handleChange('portfolioItems', index, 'title', value)
                  }
                  placeholder="포트폴리오 제목을 작성해주세요"
                  maxLength={10}
                  maxWidth="100%"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleChange(
                      'portfolioItems',
                      index,
                      'thumbnail',
                      e.target.files[0]
                    )
                  }
                  style={{ display: 'none' }}
                />
              </div>
            ))}
          </section>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormComplete}
            >
              등록하기
            </button>
          </div>
        </form>

        {isModalOpen && (
          <CheckModal onCancel={handleCancel} onConfirm={handleConfirm} />
        )}
      </div>
    </div>
  );
};

export default CreatorRegistration;
