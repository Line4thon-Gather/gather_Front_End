import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import styles from '../../styles/mypage/Mypage.module.css';
import defaultProfile from '../../assets/images/defaultProfile.png';
import Footer from '../../components/home/Footer';

const Mypage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [profileImage, setProfileImage] = useState(defaultProfile); // 기본 이미지
  const [name, setName] = useState('USER0000');
  const [email, setEmail] = useState('000000@gmail.com');
  const [showModal, setShowModal] = useState(false); // 모달 가시성 상태
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName') || 'USER0000';
    const userEmail = localStorage.getItem('userEmail') || '000000@gmail.com';
    const userProfileImage =
      localStorage.getItem('profileImgUrl') || defaultProfile;

    if (token) {
      setName(userName);
      setEmail(userEmail);
      setProfileImage(userProfileImage);
    }
  }, []);

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
      const storedUserName = localStorage.getItem('userName') || 'USER0000';
      setName(storedUserName);
    } else {
      localStorage.setItem('userName', name);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // 입력값 상태에 반영
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 정규식
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글 포함 여부 확인
    const storedUserEmail =
      localStorage.getItem('userEmail') || '000000@gmail.com';

    if (email.trim() === '') {
      setModalMessage('이메일을 빈 문자열로 설정할 수 없습니다.');
      setShowModal(true);
      setEmail(storedUserEmail); // 기존 이메일로 복원
    } else if (!emailRegex.test(email) || koreanRegex.test(email)) {
      setModalMessage(
        koreanRegex.test(email)
          ? '이메일에 한글을 포함할 수 없습니다.'
          : '유효하지 않은 이메일 형식입니다.'
      );
      setShowModal(true);
      setEmail(storedUserEmail); // 기존 이메일로 복원
    } else {
      localStorage.setItem('userEmail', email); // 이메일 업데이트
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    // 로그아웃 처리 - 토큰 삭제 및 초기화
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('profileImgUrl');
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('role');
    navigate('/login'); // useNavigate를 사용하여 로그인 페이지로 리다이렉트
  };

  const handleAccountDelete = () => {
    const confirmDelete = window.confirm(
      '정말로 회원탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
    );
    if (confirmDelete) {
      localStorage.clear();
      navigate('/'); // useNavigate를 사용하여 회원가입 페이지로 리다이렉트 또는 초기 화면
    }
  };

  return (
    <>
      <div className={styles.outContainer}>
        <div className={styles.container}>
          <div className={styles.profilePage}>
            <h2>기본 프로필</h2>
            <div className={styles.basicProfile}>
              {/* 프로필 */}
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
                {/* 이름 변경 */}
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
                {/* 이메일 변경 */}
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

          {/* 모달 */}
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
      {/* 로그아웃 및 회원탈퇴 버튼 */}
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
