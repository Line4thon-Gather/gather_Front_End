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
    const isRegistered = localStorage.getItem('isRegistered');
    if (isRegistered === 'true') {
      navigate('/');
      return;
    }

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
            localStorage.setItem('token', token);
            axios
              .get('https://backend.to-gather.info/api/user/header-info', {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
              })
              .then((profileResponse) => {
                if (profileResponse.data.isSuccess === true) {
                  const userName = profileResponse.data.data.name;
                  const profileImgUrl = profileResponse.data.data.profileImgUrl;

                  localStorage.setItem('userName', userName);
                  localStorage.setItem('profileImgUrl', profileImgUrl);

                  console.log('User Name:', userName);
                  console.log('Profile Image URL:', profileImgUrl);

                  if (response.data.data.isRegistered) {
                    localStorage.setItem('isRegistered', 'true');
                    navigate('/');
                  } else {
                    localStorage.setItem('isRegistered', 'false');
                    navigate('/login-select');
                  }
                } else {
                  setError('사용자 정보 요청 실패');
                }
              })
              .catch((profileErr) => {
                setError(`사용자 정보 요청 오류: ${profileErr.message}`);
              });
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
