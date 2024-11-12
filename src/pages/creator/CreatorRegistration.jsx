import React, { useState } from 'react';
import styles from '../../styles/creator/CreatorRegistration.module.css';
import defaultProfileImage from '../../assets/images/profileImage.png';
import AddPortfolio from '../../assets/images/AddPortfolio.png';
import InputField from '../../components/creator/InputField';
import InputTextField from '../../components/creator/InputTextField';
import InputWrapper from '../../components/common/InputWrapper';
import CheckModal from './CheckModal';
import Toggle2 from '../../components/creator/ReToggle';

const dropdownList = ['선택', '인쇄물', '영상', 'SNS'];

const CreatorRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = () => {
    console.log(creatorData);
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
          <section className={styles.section}>
            <h2>기본 프로필</h2>
            <div className={styles.profileContainer}>
              <div className={styles.subcontainer}>
                <h3>프로필 이미지</h3>
                <div className={styles.imageWrapper}>
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
                </div>
              </div>
              <div className={styles.align_container}>
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
            </div>
          </section>

          <section className={styles.section}>
            <h2>소개글 작성</h2>
            <div className={styles.profileContainer}>
              <div className={styles.align_container}>
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
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>포트폴리오 등록</h2>
            <div className={styles.profileContaine2}>
              {creatorData.portfolioItems.map((item, index) => (
                <div key={index} className={styles.portfolioItem}>
                  <div className={styles.removeButtonContainer}>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('portfolioItems', index)}
                      disabled={creatorData.portfolioItems.length <= 1}
                      className={styles.removeButton}
                    >
                      삭제
                    </button>
                  </div>
                  <div className={styles.subcontainer}>
                    <InputField
                      label="포트폴리오 제목"
                      value={item.title}
                      setValue={(value) =>
                        handleChange('portfolioItems', index, 'title', value)
                      }
                      placeholder="포트폴리오의 제목을 10자 이내로 작성해주세요"
                      maxLength={10}
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
                            className={styles.thumbnailImage}
                          />
                        </label>
                        <input
                          id={`thumbnailInput-${index}`}
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
                          className={styles.fileInput}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>

                    <div className={styles.subcontainer}>
                      <h3>파일 추가</h3>
                      <label
                        className={
                          item.file
                            ? styles.fileButtonSelected
                            : styles.fileButton
                        }
                      >
                        {item.file ? item.file.name : '+ 파일 선택'}
                        <input
                          type="file"
                          onChange={(e) =>
                            handleChange(
                              'portfolioItems',
                              index,
                              'file',
                              e.target.files[0]
                            )
                          }
                          className={styles.fileInput}
                          style={{
                            display: 'none',
                            pointerEvents: item.file ? 'none' : 'auto', // 파일이 있을 경우 클릭 막기
                          }}
                        />
                        {item.file && (
                          <button
                            className={styles.removeFileButton}
                            onClick={() =>
                              handleRemoveFile('portfolioItems', index)
                            }
                            aria-label="파일 삭제"
                          >
                            X
                          </button>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem('portfolioItems')}
                className={styles.addButton}
              >
                + 포트폴리오 항목 추가
              </button>
            </div>
          </section>

          <section className={styles.section}>
            <h2>작업 가능 항목 등록</h2>
            <div className={styles.profileContainer2}>
              {creatorData.workItems.map((item, index) => (
                <div key={index} className={styles.workItem}>
                  <div className={styles.removeButtonContainer}>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('workItems', index)}
                      disabled={creatorData.workItems.length <= 1}
                      className={styles.removeButton}
                    >
                      삭제
                    </button>
                  </div>
                  <div
                    className={styles.rowContainer}
                    style={{
                      gap: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div className={styles.subcontainer}>
                      <h4>카테고리</h4>
                      <Toggle2
                        label="선택"
                        options={[
                          { value: '인쇄물', label: '인쇄물' },
                          { value: '영상', label: '영상' },
                          { value: 'SNS', label: 'SNS' },
                        ]}
                      />
                    </div>
                    <InputField
                      label="작업명"
                      value={item.title}
                      setValue={(value) =>
                        handleChange('workItems', index, 'title', value)
                      }
                      placeholder="작업명을 작성해주세요."
                      maxLength={50}
                      maxWidth="28%"
                    />
                    <InputField
                      label="작업일"
                      value={item.duration}
                      setValue={(value) =>
                        handleChange('workItems', index, 'duration', value)
                      }
                      placeholder="작업 소요 기간"
                      maxLength={50}
                      maxWidth="20%"
                      spanPosition="back"
                      span="일"
                    />
                    <InputField
                      label="가격"
                      value={item.price}
                      setValue={(value) =>
                        handleChange('workItems', index, 'price', value)
                      }
                      placeholder="시작 가격"
                      spanPosition="back"
                      span="부터 시작"
                      maxLength={50}
                      maxWidth="21%"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem('workItems')}
                className={styles.addButton}
              >
                + 작업 가능 항목 추가
              </button>
            </div>
          </section>

          <section className={styles.section}>
            <h2>연락처 정보</h2>
            <div className={styles.profileContainer}>
              <InputField
                label="카카오톡 아이디"
                value={creatorData.kakaoId}
                setValue={(value) =>
                  setCreatorData({ ...creatorData, kakaoId: value })
                }
                placeholder="카카오톡 아이디를 입력해주세요."
                maxLength={50}
                maxWidth="100%"
              />
              <InputField
                label="이메일"
                value={creatorData.email}
                setValue={(value) =>
                  setCreatorData({ ...creatorData, email: value })
                }
                placeholder="이메일을 입력해주세요."
                maxLength={50}
                maxWidth="100%"
              />
            </div>
          </section>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
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
