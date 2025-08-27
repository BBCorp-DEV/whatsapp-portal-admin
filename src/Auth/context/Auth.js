import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { calculateTimeLeft } from "../utils";
import { getDataHandlerWithToken } from "../service";
export const AuthContext = createContext();

const setSession = (adminToken) => {
  if (adminToken) {
    localStorage.setItem("adminToken", adminToken);
    axios.defaults.headers.common.Authorization = `Bearer ${adminToken}`;
  } else {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userType");
    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin(token) {
  const accessToken = window.localStorage.getItem("adminToken")
    ? window.localStorage.getItem("adminToken")
    : token;
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState({});
  const [endTime, setEndtime] = useState();
  const [counting, setCounting] = useState([]);
  const [timeLeft, setTimeLeft] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [enrollment,setEnrollment] = useState();

  const [socket, setSocket] = useState(null);

  const getProfileData = async () => {
    try {
      const res = await getDataHandlerWithToken("profile");
      if (res) {
        console.log("sdkgfkjasdgfsad",res);
        
        setUserData(res);
        console.log("adfsdafsadfsadf",res);
        
        // localStorage.setItem("userType", res?.role);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    // setLoading(false); // done loading
  }, []);


  // useEffect(() => {
  //   const storedUser = window.localStorage.getItem("userData");
  //   console.log("asfadsgsd",storedUser);
  //   if (storedUser) {
  //     setUserData(JSON.parse(storedUser)); // or your state management logic
  //   }
  // }, []);



  useEffect(() => {
    if (localStorage.getItem("adminToken")) getProfileData();
  }, [localStorage.getItem("adminToken")]);

  useEffect(() => {
    if (endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });


 

  let data = {
    userLoggedIn: isLogin,
    userData,
    counting,
    setEndtime,
    isLoading,
    timeLeft,
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
    setIsLogin,
    getProfileData: () => {
      getProfileData();
    },
    checkLogin: (token) => {
      checkLogin(token);
    },
    socket:socket,
    setEnrollment,
    enrollment
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
