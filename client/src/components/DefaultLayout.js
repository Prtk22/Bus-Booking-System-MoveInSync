import React from "react";
import { useNavigate } from "react-router-dom";
import {Row, Col} from "antd"
import logo from "../assets/img/bus.jpg";

function DefaultLayout({ user, children }) {
  const navigate = useNavigate();

  const userMenu = [
    {
      name: "Home",
      path: "/bus-booking",
      icon: "ri-home-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/bus-booking",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menutoBeRendered = user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/bus-booking";
  }

  return (
    <div className="flex w-full">
      <div className="h-screen sticky top-0 flex flex-col shadow justify-start px-5 py-0" style={{backgroundColor: "#1890ff"}}>
        
        <div className="flex flex-col gap-5 justify-start mt-[100px] ">
          {menutoBeRendered.map((item, key) => {
            return (
              <div
                key={key}
                className={`${
                  activeRoute === item.path && "bg-blue-900 btn-disabled"
                } gap-2 relative inline-flex items-center justify-start px-10 py-3 overflow-hidden font-bold rounded-full group group-hover:text-black`}
              >
                <i
                  className={`${item.icon} w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-black opacity-[3%]`}
                ></i>
                <i
                  className={`${item.icon} text-white text-[20px] group-hover:text-black`}
                ></i>
                
                <span
                  onClick={() => {
                    if (item.path === "/logout") {
                      localStorage.clear();
                      navigate("/");
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black">
                    {item.name}
                  </span>
                  <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <Row>
          <Col span={21}> 
            <h1 style={{fontWeight: "bold", fontSize: "35px", marginLeft: "4rem", marginTop: "2rem", color: '#1890ff'}}>
              Welcome {user?.name}!
            </h1>
          </Col>
          <Col span={3}>
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="logo"
              style={{width: "100px", height: "auto", marginTop: "2rem", borderRadius: "50%"}}
            />
          </Col>
        </Row>
        <div className="p-[10px] px-0">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
