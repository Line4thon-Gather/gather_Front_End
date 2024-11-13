import React, { useState, useEffect } from 'react';
import InputField from '../../components/creator/InputField';
import styles from '../../styles/creator/CreatorRegistration.module.css';
import defaultProfile from '../../assets/images/profileImage.png';
import defaultThumbnail from '../../assets/images/AddPortfolio.png';
import Toggle2 from '../../components/creator/ReToggle';
import CheckModal from '../../pages/creator/CheckModal';

const dropdownList = ['선택', '인쇄문', '영상', 'SNS'];

function CreatorRegistration() {
  const [form, setForm] = useState({
    profileImage: null,
    creatorId: '',
    introTitle: '',
    introContent: '',
    portfolios: [{ title: '', image: null, file: null }],
    skills: [{ category: '', task: '', period: '', price: '' }],
    kakaoId: '',
    email: '',
  });
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e, index, type) => {
    const { name, value, files } = e.target;

    if (name === 'profileImage' && files && files[0]) {
      const imageFile = files[0];
      setProfileImagePreview(URL.createObjectURL(imageFile));
      setForm({ ...form, profileImage: imageFile });
    } else if (type === 'portfolio') {
      const updatedPortfolios = [...form.portfolios];
      if (name === 'file' && files && files[0]) {
        updatedPortfolios[index].file = files[0];
      } else if (name === 'image' && files && files[0]) {
        updatedPortfolios[index].image = URL.createObjectURL(files[0]);
      } else {
        updatedPortfolios[index][name] = value;
      }
      setForm({ ...form, portfolios: updatedPortfolios });
    } else if (type === 'skill') {
      const updatedSkills = [...form.skills];
      updatedSkills[index][name] = value;
      setForm({ ...form, skills: updatedSkills });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFieldChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const checkEmptyFields = () => {
    const emptyFields = [];

    if (!form.creatorId.trim()) emptyFields.push('크리연터명');
    if (!form.introTitle.trim()) emptyFields.push('소개글 제목');
    if (!form.introContent.trim()) emptyFields.push('소개글 내용');
    if (!form.kakaoId.trim()) emptyFields.push('카카오톡 ID');
    if (!form.email.trim()) emptyFields.push('이메일');
    if (form.category === dropdownList[0]) emptyFields.push('카테고리');
    if (!(form.profileImage || profileImagePreview))
      emptyFields.push('프로필 이미지');

    form.portfolios.forEach((portfolio, index) => {
      if (!portfolio.title.trim())
        emptyFields.push(`포트폴리오 ${index + 1} 제목`);
    });

    form.skills.forEach((skill, index) => {
      if (!skill.category.trim())
        emptyFields.push(`기술 ${index + 1} 카테고리`);
      if (!skill.task.trim()) emptyFields.push(`기술 ${index + 1} 작업명`);
      if (!skill.period.trim()) emptyFields.push(`기술 ${index + 1} 작업일`);
      if (!skill.price.trim()) emptyFields.push(`기술 ${index + 1} 가격`);
    });

    if (emptyFields.length > 0) {
      console.log('빈 항목:', emptyFields);
    }
  };

  useEffect(() => {
    checkEmptyFields();
  }, [form]);

  const addPortfolio = () =>
    setForm({
      ...form,
      portfolios: [...form.portfolios, { title: '', image: null, file: null }],
    });

  const removePortfolio = (index) =>
    setForm({
      ...form,
      portfolios: form.portfolios.filter((_, i) => i !== index),
    });

  const addSkill = () =>
    setForm({
      ...form,
      skills: [
        ...form.skills,
        { category: '', task: '', period: '', price: '' },
      ],
    });

  const removeSkill = (index) =>
    setForm({ ...form, skills: form.skills.filter((_, i) => i !== index) });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleRegistration = () => {
    checkEmptyFields();
    openModal();
  };

  const handleConfirmRegistration = () => {
    closeModal();
    console.log('크리에이터 등록 완료:', form);
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
                label="크리연터명"
                value={form.creatorId}
                setValue={(value) => handleFieldChange('creatorId', value)}
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
            value={form.introTitle}
            setValue={(value) => handleFieldChange('introTitle', value)}
            placeholder="10자 이내로 자신을 소개해주세요."
            maxLength={10}
            maxWidth="500px"
          />
          <InputField
            label="소개글 내용"
            value={form.introContent}
            setValue={(value) => handleFieldChange('introContent', value)}
            placeholder="50자 이내의 간단한 소개글을 입력해주세요."
            maxLength={50}
          />
        </section>

        <section className={styles.section}>
          <h2>포트폴리오 등록</h2>
          <div className={styles.profileContaine2}>
            {form.portfolios.map((item, index) => (
              <div key={index} className={styles.portfolioItem}>
                <div className={styles.removeButtonContainer}>
                  <button
                    type="button"
                    onClick={() => removePortfolio(index)}
                    disabled={form.portfolios.length <= 1}
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
                </div>
                <div className={styles.rowContainer}>
                  <div className={styles.subcontainer2}>
                    <label>썬네일 이미지</label>
                    <div className={styles.imageWrapper}>
                      <label
                        htmlFor={`thumbnailInput-${index}`}
                        className={styles.label}
                      >
                        <img
                          src={item.image || defaultThumbnail}
                          alt="썬네일 이미지"
                          className={styles.thumbnailImage}
                        />
                      </label>
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
                  </div>
                  <div>
                    {item.file ? (
                      <div>
                        <span>{item.file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedPortfolios = [...form.portfolios];
                            updatedPortfolios[index].file = null;
                            setForm({ ...form, portfolios: updatedPortfolios });
                          }}
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div className={styles.fileInputContainer}>
                        <label className={styles.fileInputLabel}>
                          파일 선택
                        </label>
                        <button type="button" className={styles.addFileButton}>
                          파일 추가
                          <input
                            type="file"
                            accept="application/pdf, image/*"
                            onChange={(e) =>
                              handleChange(
                                {
                                  target: {
                                    name: 'file',
                                    files: e.target.files,
                                  },
                                },
                                index,
                                'portfolio'
                              )
                            }
                            className={styles.fileInput}
                            style={{ display: 'none' }}
                          />
                        </button>
                      </div>
                    )}
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
          {form.skills.map((item, index) => (
            <div key={index} className={styles.workItem}>
              <div className={styles.removeButtonContainer}>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  disabled={form.skills.length <= 1}
                  className={styles.removeButton}
                >
                  삭제
                </button>
              </div>
              <div className={styles.skillFieldsContainer}>
                <div className={styles.subcontainer}>
                  <label className={styles.label2}>카테고리</label>
                  <Toggle2
                    p="선택"
                    options={[
                      { value: '인쇄문', p: '인쇄문' },
                      { value: '영상', p: '영상' },
                      { value: 'SNS', p: 'SNS' },
                    ]}
                    initialValues={form.category}
                    setValue={(value) =>
                      handleChange({ target: { name: 'category', value } })
                    }
                  />
                </div>
                <div className={styles.subcontainer}>
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
                    maxWidth="100%"
                  />
                </div>
                <div className={styles.subcontainer}>
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
                    maxWidth="100%"
                    span="일"
                    spanPosition="back"
                  />
                </div>
                <div className={styles.subcontainer}>
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
                    maxWidth="100%"
                    span="부터 시작"
                    spanPosition="back"
                  />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addSkill} className={styles.addButton}>
            + 기술 추가
          </button>
        </section>

        <section className={styles.section}>
          <h2>연락처</h2>
          <div className={styles.rowContainer}>
            <InputField
              label="카카오톡 ID"
              value={form.kakaoId}
              setValue={(value) => handleFieldChange('kakaoId', value)}
              placeholder="카카오톡 ID를 입력해주세요."
              maxLength={30}
              maxWidth="100%"
            />
            <InputField
              label="이메일"
              value={form.email}
              setValue={(value) => handleFieldChange('email', value)}
              placeholder="이메일을 입력해주세요."
              maxLength={50}
              maxWidth="100%"
            />
          </div>
        </section>

        <button
          type="button"
          onClick={handleRegistration}
          className={styles.submitBtn}
        >
          제출
        </button>
      </div>

      {showModal && (
        <CheckModal
          onConfirm={handleConfirmRegistration}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default CreatorRegistration;
