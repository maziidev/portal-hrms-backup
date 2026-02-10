import { BaseUrl, api } from ".";

export const getAllStaff = async ({ dept_code, employment_type, search }) => {
  try {
    const { data } = await api.get(`${BaseUrl}hrms/list_staff/`, {
      params: {
        dept_code,
        employment_type,
        search,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const addStaff = async (staffData) => {
  try {
    const { data } = await api.postForm(`${BaseUrl}hrms/add_staff/`, staffData);
    return data;
  } catch (error) {
    throw error;
  }
};
export const getStaffById = async (staff_id) => {
  try {
    const { data } = await api.get(`${BaseUrl}hrms/get_staff_by_id/${staff_id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const getMyStaffInfo = async () => {
  try {
    const { data } = await api.get(`${BaseUrl}hrms/get_my_staff_info/`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateStaff = async (staff_id) => {
  try {
    const { data } = await api.postForm(`${BaseUrl}hrms/update_staff/${staff_id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const deleteStaff = async (staff_id) => {
  try {
    const { data } = await api.delete(`${BaseUrl}hrms/delete_staff/${staff_id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const checkStaffImportStatus = async (task_id) => {
  try {
    const { data } = await api.get(`${BaseUrl}hrms/staff_import_status/${task_id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const importStaff = async ({ file }) => {
  try {
    const { data } = await api.postForm(`${BaseUrl}/upload_staff_csv/`, {
      file: file,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const exportStaff = async ({ dept_code, employment_type, search }) => {
  try {
    const { data } = await api.get(`${BaseUrl}hrms/export_staff_csv/`, {
      params: {
        dept_code,
        employment_type,
        search,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
