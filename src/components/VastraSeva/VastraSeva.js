import React from "react";
import HomeHeader from "../Headers/HomeHeader";
import Footer from "../Footer";
import DietyList from "./DietyList";
import { useEffect, useState } from "react";
const VastraSeva = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/get_dieties", {
      method: "GET", // You can specify the method
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <HomeHeader />
      <DietyList data={data} />
      <Footer />
    </div>
  );
};

export default VastraSeva;
