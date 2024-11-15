import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InputField from '../../components/creator/InputField';
import styles from '../../styles/creator/CreatorRegistration.module.css';
import defaultProfile from '../../assets/images/profileImage.png';
import CheckModal from '../../pages/creator/CheckModal';
import defaultThumbnail from '../../assets/images/AddPortfolio.png';

// const dropdownList = ['인쇄물', '영상', 'SNS'];
const dropdownList = ['PRINTS', 'VIDEO', 'SNS_POST'];

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
        updatedPortfolios[index].image = files[0];
        updatedPortfolios[index].imageName = files[0].name;
      } else {
        updatedPortfolios[index][name] = value;
      }
      setPortfolios(updatedPortfolios);
    } else if (type === 'skill') {
      const updatedSkills = [...skills];

      if (name === 'period' || name === 'price') {
        if (/^\d*$/.test(value)) {
          updatedSkills[index][name] = value;
        }
      } else {
        updatedSkills[index][name] = value;
      }
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

  const handleSubmit = async () => {
    const formData = new FormData();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    // req JSON 데이터
    const reqString = JSON.stringify({
      nickname: creatorId,
      introductionTitle: introTitle,
      introductionContent: introContent,
      contactKaKaoId: kakaoId,
      contactEmail: email,
      createPortfolioReqList: portfolios.map((portfolio) => ({
        title: portfolio.title,
      })),
      createWorkReqList: skills.map((skill) => ({
        title: skill.task,
        period: parseInt(skill.period, 10) || 0,
        startPrice: parseInt(skill.price, 10) || 0,
        category: skill.category,
      })),
    });

    formData.append('req', reqString);

    // 프로필 이미지 추가
    if (profileImage) {
      formData.append('profileImgUrl', profileImage);
    }

    // 썸네일 이미지 추가
    portfolios.forEach((portfolio, index) => {
      if (portfolio.image) {
        formData.append('thumbnailImgUrlList', portfolio.image);
      }
    });

    // 포트폴리오 파일 추가
    portfolios.forEach((portfolio, index) => {
      if (portfolio.file) {
        formData.append('portfolioPdfList', portfolio.file);
      }
    });

    // formData 확인
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axios.post(
        'https://backend.to-gather.info/api/creator',
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('등록 성공:', response.data);
      alert('등록 성공! 데이터를 성공적으로 전송했습니다.');
    } catch (error) {
      console.error('등록 실패:', error);
      if (error.response) {
        alert(
          `서버 에러: ${
            error.response.data.message || '알 수 없는 오류입니다.'
          }`
        );
      } else if (error.request) {
        alert('서버와 연결할 수 없습니다. 다시 시도해주세요.');
      } else {
        alert(`요청 설정 중 오류: ${error.message}`);
      }
    }
  };

  const handleConfirmRegistration = () => {
    handleSubmit();
    closeModal();
  };

  const handleRegistration = () => {
    checkEmptyFields();
    if (isSubmitEnabled) openModal();
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
            placeholder="한 줄로 본인을 소개해주세요."
            maxWidth="500px"
          />
          <InputField
            label="소개글 내용"
            value={introContent}
            setValue={setIntroContent}
            placeholder="소개글을 입력해주세요."
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
                  placeholder="포트폴리오 제목을 입력해주세요."
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
                          src={URL.createObjectURL(item.image)}
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
