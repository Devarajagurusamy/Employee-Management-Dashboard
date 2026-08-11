import API from './api';

export const getEmployees = async () => {
  const res = await API.get('/employees');
  return res.data;
};

export const getEmployeeAnalytics = async () => {
  const res = await API.get('/employees/analytics');
  return res.data;
};

export const getEmployee = async (id) => {
  const res = await API.get(`/employees/${id}`);
  return res.data;
};

export const createEmployee = async (employeeData) => {
  const res = await API.post('/employees', employeeData);
  return res.data;
};

export const updateEmployee = async (id, employeeData) => {
  const res = await API.put(`/employees/${id}`, employeeData);
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await API.delete(`/employees/${id}`);
  return res.data;
};
