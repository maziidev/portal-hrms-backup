import { BaseUrl, api } from ".";

export const loginStaff = async (staffData) => {
  try {
    const { data } = await api.post(`${BaseUrl}core/login/`, staffData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logOutStaff = async () => {
  try {
    const { data } = await api.post(`${BaseUrl}/core/logout`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const requestPasswordReset = async () => {
  try {
    const { data } = await api.post(`${BaseUrl}/core/reset-password`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const resetPasswordComfirmation = async () => {
  try {
    const { data } = await api.post(`${BaseUrl}/core/reset-password`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Session
export const getSession = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}/hrms/session/`);
    return data;
  } catch (error) {
    throw error;
  }
};
// export const deleteSession = async () => {
//   try {
//     const { data } = await api.delete(`${BaseUrl}/hrms/session`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
