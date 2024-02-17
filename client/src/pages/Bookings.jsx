import React, { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../helpers/axiosInstance";
import { message, Table } from "antd";
import PageTitle from "../components/PageTitle";
import moment from "moment"
import { Helmet } from "react-helmet";

function Bookings({ token, showLoading, hideLoading }) {
  const [bookings, setBookings] = useState([]);

  const getBookings = useCallback(async () => {
    try {
      showLoading();
      const response = await axiosInstance(token).get(
        `/api/bookings/${localStorage.getItem("user_id")}`,
        {}
      );
      hideLoading();
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
            user: booking.user.name,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      hideLoading();
      message.error(error.message);
    }
  }, []);

  const CancelBooking = async () => {
    try {
      showLoading();
      const res = await axiosInstance(token).get(
        `/api/bookings/${localStorage.getItem("user_id")}`
      );
      const bus_id = res.data.data[0].bus._id;
      const user_id = res.data.data[0].user._id;
      const booking_id = res.data.data[0]._id;
      const response = await axiosInstance(token).delete(
        `/api/bookings/${booking_id}/${user_id}/${bus_id}`,
        {}
      );
      hideLoading();
      if (response.data.success) {
        message.success(response.data.message);
        getBookings();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      hideLoading();
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Full Name",
      dataIndex: "user",
      key: "user",
    },

    {
      title: "Bus Number",
      dataIndex: "busNumber",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
      render: (journeyDate) => moment(journeyDate).format("DD/MM/YYYY"),
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
      render: (departure) => moment(departure, "HH:mm").format("hh:mm A"),
    },
    {
      title: "Seat Details",
      dataIndex: "seats",
      render: (seats) => seats.join(", "),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <button
            className="underline text-base text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => {
              CancelBooking();
            }}
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  return (
    <>
      <Helmet>
        <title>Bookings</title>
      </Helmet>

      <div className="p-5">
        <PageTitle title="Bookings" />
        <Table columns={columns} dataSource={bookings} />
      </div>
    </>
  );
}

export default Bookings;
