import React, { useState, useEffect, useRef } from 'react';
import InputField from '../../components/creator/InputField';
import styles from '../../styles/creator/CreatorRegistration.module.css';
import defaultProfile from '../../assets/images/profileImage.png';
import CheckModal from '../../pages/creator/CheckModal';
import defaultThumbnail from '../../assets/images/AddPortfolio.png';
const dropdownList = ['인쇄문', '영상', 'SNS'];

function CreatorRegistration() {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [creatorId, setCreatorId] = useState('');
  const [introTitle, setIntroTitle] = useState('');
  const [introContent, setIntroContent] = useState('');
  const [portfolios, setPortfolios] = useState([
    { title: '', image: null, file: null, imageName: '', fileName: '' },
  ]);
  const [skills, setSkills] = useState([
    { category: '', task: '', period: '', price: '' },
  ]);
  const [kakaoId, setKakaoId] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e, index, type) => {
    const { name, value, files } = e.target;

    if (name === 'profileImage' && files && files[0]) {
      const imageFile = files[0];
      setProfileImagePreview(URL.createObjectURL(imageFile));
      setProfileImage(imageFile);
    } else if (type === 'portfolio') {
      const updatedPortfolios = [...portfolios];
      if (name === 'file' && files && files[0]) {
        updatedPortfolios[index].file = files[0];
        updatedPortfolios[index].fileName = files[0].name;
      } else if (name === 'image' && files && files[0]) {
        updatedPortfolios[index].image = URL.createObjectURL(files[0]);
        updatedPortfolios[index].imageName = files[0].name;
      } else {
        updatedPortfolios[index][name] = value;
      }
      setPortfolios(updatedPortfolios);
    } else if (type === 'skill') {
      const updatedSkills = [...skills];
      updatedSkills[index][name] = value;
      setSkills(updatedSkills);
    }
  };
  const removePortfolioFile = (index) => {
    const updatedPortfolios = [...portfolios];
    updatedPortfolios[index] = {
      ...updatedPortfolios[index],
      fileName: null,
      file: null,
    };
    setPortfolios(updatedPortfolios);

    const fileInput = document.getElementById(`fileInput-${index}`);
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const handleCategoryChange = (index, selectedCategory) => {
    const updatedSkills = [...skills];
    updatedSkills[index].category = selectedCategory;
    setSkills(updatedSkills);
    setDropdownOpen(null);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const checkEmptyFields = () => {
    if (
      !creatorId.trim() ||
      !introTitle.trim() ||
      !introContent.trim() ||
      !kakaoId.trim() ||
      !email.trim() ||
      !profileImage ||
      portfolios.some(
        (portfolio) =>
          !portfolio.title.trim() || !portfolio.image || !portfolio.file
      ) ||
      skills.some(
        (skill) =>
          !skill.category ||
          !skill.task.trim() ||
          !skill.period.trim() ||
          !skill.price.trim()
      )
    ) {
      setIsSubmitEnabled(false);
    } else {
      setIsSubmitEnabled(true);
    }
  };

  useEffect(() => {
    checkEmptyFields();
  }, [
    creatorId,
    introTitle,
    introContent,
    kakaoId,
    email,
    profileImage,
    portfolios,
    skills,
  ]);

  const addPortfolio = () =>
    setPortfolios([
      ...portfolios,
      { title: '', image: null, file: null, imageName: '', fileName: '' },
    ]);
  const removePortfolio = (index) =>
    setPortfolios(portfolios.filter((_, i) => i !== index));

  const addSkill = () =>
    setSkills([...skills, { category: '', task: '', period: '', price: '' }]);
  const removeSkill = (index) =>
    setSkills(skills.filter((_, i) => i !== index));

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleRegistration = () => {
    checkEmptyFields();
    if (isSubmitEnabled) openModal();
  };

  // 서버에 데이터를 저장하는 함수
  const handleSubmit = async () => {
    try {
      const response = await axios.post('/register', data);
      console.log('등록 성공:', response.data);
      // 성공 시 추가 작업
    } catch (error) {
      console.error('등록 실패:', error);
    }
  };

  const handleConfirmRegistration = () => {
    handleSubmit();
    closeModal();
    console.log('크리에이터 등록 완료:', {
      profileImage,
      creatorId,
      introTitle,
      introContent,
      portfolios,
      skills,
      kakaoId,
      email,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.outContainer}>
      <div className={styles.container}>
        <section className={styles.section}>
          <h2>기본 프로필</h2>
          <div className={styles.profileContainer}>
            <div className={styles.subcontainer}>
              <label>프로필 이미지</label>
              <div className={styles.imageWrapper}>
                <label htmlFor="fileInput" className={styles.label}>
                  {profileImagePreview ? (
                    <img
                      src={profileImagePreview}
                      alt="프로필 이미지"
                      className={styles.profileImage}
                    />
                  ) : (
                    <img
                      src={defaultProfile}
                      alt="기본 프로필 이미지"
                      className={styles.profileImage}
                    />
                  )}
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  name="profileImage"
                  onChange={(e) => handleChange(e, null, 'profile')}
                  className={styles.fileInput}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
            <div className={styles.align_container}>
              <InputField
                label="크리에이터명"
                value={creatorId}
                setValue={setCreatorId}
                placeholder="USER0000"
                maxLength={8}
                maxWidth="600px"
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>소개글 작성</h2>
          <InputField
            label="소개글 제목"
            value={introTitle}
            setValue={setIntroTitle}
            placeholder="10자 이내로 자신을 소개해주세요."
            maxLength={10}
            maxWidth="500px"
          />
          <InputField
            label="소개글 내용"
            value={introContent}
            setValue={setIntroContent}
            placeholder="50자 이내의 간단한 소개글을 입력해주세요."
            maxLength={50}
          />
        </section>

        <section className={styles.section}>
          <h2>포트폴리오 등록</h2>
          <div className={styles.profileContaine2}>
            {portfolios.map((item, index) => (
              <div key={index} className={styles.portfolioItem}>
                <div className={styles.removeButtonContainer}>
                  <button
                    type="button"
                    onClick={() => removePortfolio(index)}
                    disabled={portfolios.length <= 1}
                    className={styles.removeButton}
                  >
                    삭제
                  </button>
                </div>
                <InputField
                  label="포트폴리오 제목"
                  value={item.title}
                  setValue={(value) =>
                    handleChange(
                      { target: { name: 'title', value } },
                      index,
                      'portfolio'
                    )
                  }
                  placeholder="포트폴리오의 제목을 10자 이내로 작성해주세요"
                  maxLength={10}
                  maxWidth="100%"
                />
                <div className={styles.horizontalContainer}>
                  <div className={styles.Wrapper}>
                    <label>썸네일 이미지</label>
                    {item.imageName ? (
                      <label
                        htmlFor={`thumbnailInput-${index}`}
                        className={styles.imageLabel}
                      >
                        <img
                          src={item.image}
                          alt="썸네일 이미지 미리보기"
                          className={styles.thumbnailImage}
                        />
                      </label>
                    ) : (
                      <label
                        htmlFor={`thumbnailInput-${index}`}
                        className={styles.imageButton}
                      >
                        <img
                          className={styles.thumbnailImage}
                          src={defaultThumbnail}
                          alt="이미지 선택 버튼"
                        />
                      </label>
                    )}

                    <input
                      id={`thumbnailInput-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleChange(
                          {
                            target: { name: 'image', files: e.target.files },
                          },
                          index,
                          'portfolio'
                        )
                      }
                      className={styles.fileInput}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className={styles.Wrapper}>
                    <label style={{ minWidth: '75px' }}>파일 업로드</label>

                    {!item.fileName ? (
                      <label
                        htmlFor={`fileInput-${index}`}
                        className={styles.addButton2}
                      >
                        + 파일 추가
                      </label>
                    ) : (
                      <div className={styles.fileDisplay}>
                        <span>{item.fileName}</span>
                        <button
                          type="button"
                          onClick={() => removePortfolioFile(index)}
                          className={styles.removeButton2}
                        >
                          X
                        </button>
                      </div>
                    )}
                    <input
                      id={`fileInput-${index}`}
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        handleChange(
                          {
                            target: { name: 'file', files: e.target.files },
                          },
                          index,
                          'portfolio'
                        )
                      }
                      className={styles.fileInput}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addPortfolio}
              className={styles.addButton}
            >
              + 포트폴리오 추가
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2>작업 가능 항목/가격</h2>
          {skills.map((item, index) => (
            <div key={index} className={styles.workItem}>
              <div className={styles.removeButtonContainer}>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  disabled={skills.length <= 1}
                  className={styles.removeButton}
                >
                  삭제
                </button>
              </div>
              <div className={styles.horizontalContainer}>
                <div className={styles.dropdownContainer} ref={dropdownRef}>
                  <label>카테고리</label>
                  <button
                    type="button"
                    className={styles.dropdownButton}
                    onClick={() => toggleDropdown(index)}
                  >
                    {item.category || '카테고리 선택'}
                  </button>
                  {dropdownOpen === index && (
                    <div className={styles.dropdownMenu}>
                      {dropdownList.map((category) => (
                        <div
                          key={category}
                          className={styles.dropdownItem}
                          onClick={() => handleCategoryChange(index, category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <InputField
                  label="작업명"
                  value={item.task}
                  setValue={(value) =>
                    handleChange(
                      { target: { name: 'task', value } },
                      index,
                      'skill'
                    )
                  }
                  placeholder="작업명을 작성해주세요."
                  maxLength={50}
                  maxWidth="80%"
                />
                <InputField
                  label="작업일"
                  value={item.period}
                  setValue={(value) =>
                    handleChange(
                      { target: { name: 'period', value } },
                      index,
                      'skill'
                    )
                  }
                  placeholder="작업 소요 기간"
                  maxLength={10}
                  maxWidth="80%"
                  span="일"
                  spanPosition="back"
                />
                <InputField
                  label="가격"
                  value={item.price}
                  setValue={(value) =>
                    handleChange(
                      { target: { name: 'price', value } },
                      index,
                      'skill'
                    )
                  }
                  placeholder="시작 가격"
                  maxLength={10}
                  maxWidth="80%"
                  span="부터 시작"
                  spanPosition="back"
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addSkill} className={styles.addButton}>
            + 기술 추가
          </button>
        </section>

        <section className={styles.section}>
          <h2>연락처</h2>
          <div className={styles.horizontalContainer}>
            <InputField
              label="카카오톡 ID"
              value={kakaoId}
              setValue={setKakaoId}
              placeholder="카카오톡 ID를 입력해주세요."
              maxLength={30}
              maxWidth="100%"
            />
            <InputField
              label="이메일"
              value={email}
              setValue={setEmail}
              placeholder="이메일을 입력해주세요."
              maxLength={50}
              maxWidth="100%"
            />
          </div>
        </section>

        <div className={styles.submitcontainer}>
          <button
            type="button"
            onClick={handleRegistration}
            className={
              isSubmitEnabled
                ? styles.submitBtnEnabled
                : styles.submitBtnDisabled
            }
            disabled={!isSubmitEnabled}
          >
            등록 완료하기
          </button>

          {showModal && (
            <CheckModal
              onConfirm={handleConfirmRegistration}
              onCancel={closeModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatorRegistration;
