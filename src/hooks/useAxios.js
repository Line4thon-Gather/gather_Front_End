import axios from 'axios';

export const postData = async (formInfo) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/promotion`,
      formInfo,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.data.data;

    return data;
  } catch (error) {
    console.error('Error during post request:', error);
    return null;
  }
};

// export const costData = async (formInfo) => {
//   const token = localStorage.getItem('token');

//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_SERVER_URL}/api/promotion/cost-management`,
//       {
//         budget: formInfo.budget,
//         firstMeans: formInfo.firstMeans,
//         secondMeans: formInfo.secondMeans,
//         thirdMeans: formInfo.thirdMeans,
//         instagramPromotionPeriod: 20,
//       },
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//     const data = response.data.data;
//   } catch (error) {
//     console.error('Error during post request:', error);
//     return null;
//   }
// };
