import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/mypage/Mypage.module.css';
import defaultProfile from '../../assets/images/defaultProfile.png';
import Footer from '../../components/home/Footer';
import ThumbnailCard from '../../components/creator/ThumbnailCard';

const Mypage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [recentCreators, setRecentCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryTranslations = {
    prints: '인쇄물',
    video: '영상',
    sns_post: 'SNS',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName') || '이름을 입력해주세요';
    const userEmail =
      localStorage.getItem('userEmail') || '이메일을 입력해주세요';
    const userProfileImage =
      localStorage.getItem('profileImgUrl') || defaultProfile;

    if (token) {
      setName(userName);
      setEmail(userEmail);
      setProfileImage(userProfileImage);
    }
    fetchRecentCreators();
  }, []);

  const fetchRecentCreators = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(
        'https://backend.to-gather.info/api/user/my-page',
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.isSuccess && response.data.data) {
        const { profileInfo, creatorInfo } = response.data.data;
        setRecentCreators(creatorInfo || []);
        setProfileImage(profileInfo.profileImgUrl || defaultProfile);
        setEmail(profileInfo.email || '이메일을 입력해주세요');
      } else {
        throw new Error(
          response.data.message || 'Unexpected response structure'
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setRecentCreators([]);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailClick = (nickname) => {
    navigate(`/creator/${nickname}`);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newImageURL = URL.createObjectURL(e.target.files[0]);
      setProfileImage(newImageURL);
      localStorage.setItem('profileImgUrl', newImageURL);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    if (name.trim() === '') {
      setModalMessage('이름을 빈 문자열로 설정할 수 없습니다.');
      setShowModal(true);
      const storedUserName =
        localStorage.getItem('userName') || '이름을 입력해주세요';
      setName(storedUserName);
    } else {
      localStorage.setItem('userName', name);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const storedUserEmail =
      localStorage.getItem('userEmail') || '이메일을 설정해주세요.';

    if (email.trim() === '') {
      setModalMessage('이메일을 빈 문자열로 설정할 수 없습니다.');
      setShowModal(true);
      setEmail(storedUserEmail);
    } else if (!emailRegex.test(email) || koreanRegex.test(email)) {
      setModalMessage(
        koreanRegex.test(email)
          ? '이메일에 한글을 포함할 수 없습니다.'
          : '유효하지 않은 이메일 형식입니다.'
      );
      setShowModal(true);
      setEmail(storedUserEmail);
    } else {
      localStorage.setItem('userEmail', email);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('profileImgUrl');
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleAccountDelete = () => {
    const confirmDelete = window.confirm(
      '정말로 회원탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
    );
    if (confirmDelete) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <>
      <div className={styles.outContainer}>
        <div className={styles.container}>
          <div className={styles.profilePage}>
            <h2>기본 프로필</h2>
            <div className={styles.basicProfile}>
              <div className={styles.profileImageContainer}>
                <p className={styles.profileImageLabel}>프로필 이미지</p>
                <label htmlFor="profileImageInput">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                </label>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.hiddenInput}
                />
              </div>
              <div className={styles.profileContainer}>
                <div className={styles.profileInfo}>
                  <label htmlFor="nameInput" className={styles.inputLabel}>
                    이름
                  </label>
                  <input
                    id="nameInput"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    className={styles.ChangeInput}
                  />
                </div>
                <div className={styles.profileInfo}>
                  <label htmlFor="emailInput" className={styles.inputLabel}>
                    이메일
                  </label>
                  <input
                    id="emailInput"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    className={styles.ChangeInput}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.profilePage}>
            <h2>최근에 봤던 크리에이터</h2>
            <div className={styles.creatorList}>
              {loading ? (
                <p>로딩 중...</p>
              ) : recentCreators.length === 0 ? (
                <p>최근에 본 크리에이터가 없습니다.</p>
              ) : (
                recentCreators.map((creator, index) => {
                  const uniqueCategories = [
                    ...new Set(
                      (creator.availableWork || []).map(
                        (work) =>
                          categoryTranslations[work.toLowerCase()] || work
                      )
                    ),
                  ].join(', ');

                  return (
                    <ThumbnailCard
                      key={index}
                      imageUrl={creator.thumbnailImgUrl}
                      category={uniqueCategories}
                      creatorName={creator.nickname}
                      description={creator.introductionTitle}
                      minPrice={creator.startPrice.toLocaleString()}
                      onClick={() => handleThumbnailClick(creator.nickname)}
                    />
                  );
                })
              )}
            </div>
          </div>

          {showModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>{modalMessage}</h2>
                <button onClick={closeModal} className={styles.closeButton}>
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleLogout} className={styles.clickButton}>
          로그아웃
        </button>
        <button onClick={handleAccountDelete} className={styles.clickButton}>
          회원탈퇴
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Mypage;
