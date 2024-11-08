import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Redirection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('code');

  useEffect(() => {
    if (token) {
      axios
        .get('https://backend.to-gather.info/api/test/jwt-test', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data.isSuccess === true) {
            const tokenData = response.data.data;
            localStorage.setItem('authToken', tokenData);

            if (tokenData.includes('가입 이력 있는 사용자 식별자')) {
              navigate('/');
            } else {
              navigate('/login-select');
            }
          } else {
            setError('요청 실패');
          }
        })
        .catch((err) => {
          setError(`네트워크 오류: ${err.message}`);
        });
    } else {
      setError('토큰이 없습니다.');
    }
  }, [location, token, navigate]);

  return <div>{error && <p>{error}</p>}</div>;
};

export default Redirection;
