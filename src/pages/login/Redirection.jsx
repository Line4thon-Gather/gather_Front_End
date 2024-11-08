import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Redirection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('code');

  useEffect(() => {
    console.log('현재 URL:', location.search);
    console.log('쿼리 파라미터에서 추출된 토큰:', token);

    if (token) {
      console.log('토큰이 존재, API 호출 시작');

      axios
        .get('https://backend.to-gather.info/api/test/jwt-test', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .then((response) => {
          console.log('API 호출 응답:', response);
          console.log('응답 데이터:', response.data);

          if (response.data.isSuccess === true) {
            console.log('응답 성공, 데이터 처리 완료');
            setResponse({
              ...response.data,
              message: '성공적으로 데이터가 로드되었습니다.',
            });

            if (response.data.data.includes('가입 이력 있는 사용자 식별자')) {
              navigate('/');
            } else {
              navigate('/login-select');
            }
          } else {
            setError('요청 실패');
            console.log('요청 실패:', response.data);
          }
        })
        .catch((err) => {
          setError(`네트워크 오류: ${err.message}`);
          console.error('네트워크 오류:', err);
        });
    } else {
      setError('토큰이 없습니다.');
      console.log('토큰이 없으므로 API 호출하지 않음');
    }
  }, [location, token, navigate]);

  return (
    <div>
      {error && <p>{error}</p>}
      {response && <p>응답 성공: {response.message}</p>}
    </div>
  );
};

export default Redirection;
