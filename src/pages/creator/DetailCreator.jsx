import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DetailTop from '../../components/creator/DetailTop';
import TabSliderMenu from '../../components/creator/TabSliderMenu';
import styles from '../../styles/creator/DetailCreator.module.css';
import Footer from '../../components/home/Footer';

const DetailCreator = () => {
  const { nickname } = useParams(); // URL에서 nickname 파라미터 가져오기
  const [creator, setCreator] = useState(null); // 크리에이터 데이터 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 오류 상태 관리
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
    const fetchCreatorData = async () => {
      try {
        const token = localStorage.getItem('token'); // 로컬스토리지에서 토큰 가져오기

        if (!token) {
          console.error('토큰이 없습니다. 인증이 필요한 페이지입니다.');
          setError('로그인이 필요합니다.');
          setLoading(false);
          return;
        }

        // API 호출
        const response = await axios.get(
          `https://backend.to-gather.info/api/creator/${nickname}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        );

        if (response.data.isSuccess) {
          setCreator(response.data.data);
        } else {
          console.error(
            '데이터를 가져오는 데 실패했습니다. 응답 메시지:',
            response.data.message
          );
          setError('데이터를 가져오는 데 실패했습니다.');
        }
      } catch (err) {
        console.error('API 호출 중 오류가 발생했습니다:', err);
        setError('서버와의 통신에 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorData();
  }, [nickname]);

  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 오류가 발생했을 때 표시할 컴포넌트
  if (error) {
    console.error('오류 발생:', error);
    return <div>{error}</div>;
  }

  // 크리에이터 정보를 찾을 수 없는 경우
  if (!creator) {
    console.warn('크리에이터 정보를 찾을 수 없습니다.');
    return <div>크리에이터 정보를 찾을 수 없습니다.</div>;
  }

  // 크리에이터 데이터를 가져온 경우 렌더링

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.innercontainer}>
          <div className={styles.white}>
            <DetailTop creator={creator} />
          </div>
          <div className={styles.tabcontainer}>
            <TabSliderMenu creator={creator} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailCreator;
