import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ user, setUser, showLoading, hideLoading, children }) {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const validateToken = useCallback(async () => {
    try {
      showLoading();
      const response = await axios.get(
        `/api/users/${user_id} `,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      hideLoading();
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        message.error(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      message.error(error.message);
      hideLoading();
      navigate("/login");
    }
  }, [navigate, user_id]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, [navigate, validateToken]);

  return <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>;
}

export default ProtectedRoute;
