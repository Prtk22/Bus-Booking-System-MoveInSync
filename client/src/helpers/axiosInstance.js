import axios from "axios";

export const axiosInstance = (token) => axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
