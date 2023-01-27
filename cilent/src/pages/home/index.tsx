import axios from "axios";
import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { CountContext } from "../../auth/provider";
import Data from "./view";

const Home = () => {
  const navigate = useNavigate();
  const { current: myArray } = useRef(["one", "two", "three"]);
  const [coin, setCoin] = useState(0);
  const [showModal, setShowModal] = useState<string>("");
  const [coinid, setCoinId] = useState(0);
  const { id, username } = useContext(CountContext);
  const token = localStorage.getItem("Token") as string;
  const userData = async () => {
    const data: any = await axios.get(`http://localhost:4000/users/user`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    setCoin(data?.data?.message?.coin?.totalcoin);
    setCoinId(data?.data?.message?.coin?.coinid);
    initSocket(data?.data?.message?.coin?.coinid);
  };

  const initSocket = (ider: any) => {
    const socket = io("http://localhost:4000");
    socket.on("connect", () => {
      console.log("connected");
      console.log(`coin-${ider}`);
      socket.on(`coin-${ider}`, (res) => {
        console.log("test coin", res);
        setCoin(res);
      });
    });
  };

  const deleteUser = () => {
    axios
      .delete(`http://localhost:4000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        navigate("/");
      });
  };

  useEffect(() => {
    userData();
  }, [myArray]);

  const Logout = () => {
    localStorage.removeItem("Token");

    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-6 md:px-8 sm:py-14  rounded-xl mt-9 bg-white dark:bg-slate-800">
      <header className=" space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6  bg-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">SEC-COIN {coin}</h2>

          <div className="flex items-center justify-center space-x-4">
            <h2 className="font-semibold text-slate-900">USER {username}</h2>
            <button
              onClick={() => setShowModal("delete")}
              className="h-10 px-6 font-semibold rounded-md bg-red-300 border border-slate-200 text-slate-900"
            >
              Delete
            </button>
          </div>

          <a
            href="/"
            className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            onClick={() => Logout()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </a>
        </div>
      </header>

      <Data />

      {showModal === "delete" ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gray-50   px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Delete
                      </h3>
                      <div className="mt-2">
                        <div className="mt-4">
                          <span className="text-gray-700">
                            You want delete User {username}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => deleteUser()}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal("")}
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
