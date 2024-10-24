import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HomeHeader from "../../Headers/HomeHeader";
import Footer from "../../Footer";
import Calendar from "./Calendar";
import AddToCart from "./AddToCart";

const Diety = () => {
  return (
    <div>
      <HomeHeader />
      <div className="container">
        <div className="row mt-3 border">
          <div className="col-7 border">
            <Calendar />
          </div>

          <div className="col-3 border">
            <AddToCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diety;
