import React, { useState } from "react";
import css from "./css/Calendar.module.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className={css["day"]}></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <div key={day} className={css["day"]}>
        {day}
      </div>
    );
  }

  return (
    <div className={css["calendar"]}>
      <div className={css["calendar-header"]}>
        <button className={css["btn"]} onClick={handlePrevMonth}>
          Prev
        </button>
        <h2>
          {monthNames[month]} {year}
        </h2>
        <button className={css["btn"]} onClick={handleNextMonth}>
          Next
        </button>
      </div>
      <div className={css["weekdays"]}>
        <div className={css["weekday"]}>Sun</div>
        <div className={css["weekday"]}>Mon</div>
        <div className={css["weekday"]}>Tue</div>
        <div className={css["weekday"]}>Wed</div>
        <div className={css["weekday"]}>Thu</div>
        <div className={css["weekday"]}>Fri</div>
        <div className={css["weekday"]}>Sat</div>
      </div>
      <div className={css["days"]}>{days}</div>
    </div>
  );
};

export default Calendar;
