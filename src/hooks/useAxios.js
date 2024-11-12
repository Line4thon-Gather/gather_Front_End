import axios from 'axios';

export const postData = async (formInfo) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/promotion/timeline`,
      formInfo,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imdvb2dsZSAxMTEwNzkxMDE2NDE5MDkzNDQ5ODQiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzMxNDIwNjUzLCJleHAiOjE3MzE0MjQyNTN9.vcXY2yAP4wH3ogCVTniF-ACsOV3WbLHKzwNPEL9Iwrg',
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
