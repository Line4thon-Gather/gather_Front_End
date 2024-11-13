import axios from 'axios';

export const postData = async (formInfo) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/promotion/timeline`,
      formInfo,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.data.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error during post request:', error);
    return null;
  }
};
