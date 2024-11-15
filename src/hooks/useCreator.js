import axios from 'axios';

export const getCreatorList = async (pageParam, order, category, range) => {
  console.log(pageParam);

  // 쿼리 파라미터를 동적으로 생성
  const queryParams = [
    `page=${pageParam}`,
    order && `align=${order}`,
    category && `category=${category}`,
    range && `price=${range}`,
  ]
    .filter(Boolean) // 유효한 값만 필터링
    .join('&'); // '&'로 연결

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/creator/filtering?${queryParams}`
    );
    const data = await response.data.data;
    console.log(data);

    return data;
  } catch {
    console.error('fetching creatorList error');
  }
};
