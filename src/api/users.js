import { apiRequest } from "./apiRequest";
import { BASE_URL } from "./baseUrl";

export const getUsersApi = () => {
  const config = {
    method: "GET",
    url: `users`,
  };
  return apiRequest(config);
};

export const updateUserStatus = (id, status) => {
  const config = {
    method: "PUT",
    url: `users/${id}`,
    data: {
      status,
    },
  };
  return apiRequest(config);
};

export const deleteUserApi = (id) => {
  const config = {
    method: "DELETE",
    url: `users/${id}`,
  };
  return apiRequest(config);
};

export const loginApi = (email, password) => {
  const config = {
    method: "POST",
    url: `${BASE_URL}/login`,
    data: {
      email,
      password,
    },
  };
  return apiRequest(config);
};

export const signUpApi = (name, email, password) => {
  const config = {
    method: "POST",
    url: `${BASE_URL}/signup`,
    data: {
      name,
      email,
      password,
    },
  };
  return apiRequest(config);
};
