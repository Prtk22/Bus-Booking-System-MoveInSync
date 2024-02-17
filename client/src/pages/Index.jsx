import { Helmet } from "react-helmet";
import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Travel from "../assets/img/travel_booking.png"

function Index() {
  return (
    <>
      <Helmet>
        <title>Bus-Booking</title>
      </Helmet>
      <div className="h-screen flex">
        <div
          className="hero min-h-screen lg:flex lg:h-full w-full lg:w-3/4"
          style={{height: "100vh"}}
        >
          <img src={Travel} alt="index" style={{width: "80%", height: "auto"}} />
        </div>

        <div className="hero-content text-center text-neutral-content flex bg-gray-900">
          <div className="max-w-md ">

            <h1 className="mb-5 text-5xl text-white font-bold ">
              Bus-Booking
            </h1>
            <p className="mb-5 text-xl text-white">
              is a platform that allows you to book your bus tickets online and
              in a very easy way.
            </p>
            <span>
              <Link
                to="/login"
              >
                <Button style={{marginRight: "10px", borderRadius: "4px"}}>Login</Button>
              </Link>
              <Link
                to="/register"
              >
                <Button style={{marginLeft: "10px", borderRadius: "4px"}}>Register</Button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
