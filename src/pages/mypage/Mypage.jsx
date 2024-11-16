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
  const [nickname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [recentCreators, setRecentCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryTranslations = {
    prints: '인쇄물',
    video: '영상',
    sns_post: 'SNS',
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
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

        setProfileImage(profileInfo.profileImgUrl || defaultProfile);
        setName(profileInfo.nickname || '이름 없음');
        setEmail(profileInfo.email || '이메일 없음');
        setRole(profileInfo.role || '');
        setRecentCreators(creatorInfo || []);
      } else {
        throw new Error(
          response.data.message || 'Unexpected response structure'
        );
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setRecentCreators([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰 삭제
    navigate('/login'); // 로그인 페이지로 리다이렉트
  };

  const handleThumbnailClick = (nickname) => {
    navigate(`/creator/${nickname}`);
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
                <img
                  src={profileImage}
                  alt="Profile"
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.profileContainer}>
                <div className={styles.profileInfo}>
                  <label className={styles.inputLabel2}>
                    이름
                    {role === '크리에이터' && (
                      <div className={styles.creator}>
                        <p>크리에이터</p>
                      </div>
                    )}
                  </label>
                  <label className={styles.ChangeInput}>{nickname}</label>
                </div>
                <div className={styles.profileInfo}>
                  <label className={styles.inputLabel}>이메일</label>
                  <label className={styles.ChangeInput}>{email}</label>
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
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.clickButton} onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Mypage;
