import React, { useState } from "react";
import { noop } from "lodash";
import styled from "styled-components";
import cx from "classnames";
import moment from "moment";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io"
import { themes } from "./tools/themes";
import { dayList, monthList, weekList } from "./tools/static";

const getLastMonthTable = (date = 'YYYY/MM/DD') => {
  const lastDate = moment(date);
  let array = [];
  for (var i = 0; i <= lastDate.day(); i++) {
    array.push({
      year: lastDate.year(),
      month: lastDate.month() + 1,
      date: lastDate.date() - (lastDate.day() - i),
      day: i
    })
  }
  return array;
}

const getNextMonthTable = (date = 'YYYY/MM/DD') => {
  const fistDate = moment(date);
  let array = [];
  for (var i = fistDate.day(); i <= 6; i++) {
    array.push({
      year: fistDate.year(),
      month: fistDate.month() + 1,
      date: fistDate.date() + (i - fistDate.day()),
      day: i
    })
  }
  return array;
}

const getMonthTable = (year = moment().year(), month = '01') => {
  let array = [];
  const lastMonth = Number(month) - 1 === 0 ? 12 : Number(month) - 1;
  const lastMonthEndOf = moment(`${lastMonth === 12 ? Number(year) - 1 : year}/${lastMonth}`).endOf('month').format('YYYY/MM/DD');
  const nextMonth = Number(month) + 1 > 12 ? 1 : Number(month) + 1;
  const nextMonthFisrtOf = moment(`${nextMonth === 1 ? Number(year) + 1 : year}/${nextMonth}/01`).format('YYYY/MM/DD');
  dayList.map((val) => {
    const day = moment(`${year}/${month}/${val}`);
    const thisMonth = Number(day.month() + 1) === Number(month);
    if (thisMonth) {
      return array.push({
        year: day.year(),
        month: day.month() + 1,
        date: day.date(),
        day: day.day()
      })
    } else return null;
  });
  const result = [...getLastMonthTable(lastMonthEndOf), ...array, ...getNextMonthTable(nextMonthFisrtOf)]
  return result;
};

const getMonth = (month = 0) => {
  const find = monthList.find(val => val.value === month);
  return find.month;
}

const StyledDatePicker = styled.div`
  width: ${({ props }) => props.width};
  border-radius:8px ;
  border:2px solid ${({ props }) => props.themeColor.sub};
  background-color:${({ props }) => props.themeColor.bottom};
  overflow:hidden ;
  .dp-caption {
    color: ${({ props }) => props.themeColor.btnColor};
    background-color:${({ props }) => props.themeColor.main};
    padding:10px 0;
    display:flex ;
    align-items:center ;
    justify-content:center ;
    box-sizing:border-box ;
  }
  .dp-title {
    font-size:16px;
    margin:0 16px;
  }
  .svg-IoMdArrow {
    width:20px;
    height:20px ;
    cursor: pointer;
  }
  .dp-week {
    display:flex ;
    align-items:center ;
    box-sizing:border-box ;
    padding:20px ;
  }
  .dp-day {
    width:calc(100% / 7) ;
    text-align:center ;
    color: ${({ props }) => props.themeColor.color};
    font-size:13px ;
  }
  .dp-content {
    box-sizing:border-box;
    padding:0 20px 20px 20px;
    color: ${({ props }) => props.themeColor.color};
    display:flex ;
    align-items:center ;
    flex-wrap:wrap ;
  }
  .dp-date-selector {
    position:relative ;
    width: calc((100% / 7));
    padding-bottom:calc((100% / 7));
    height: 0;
    cursor: pointer;
    &.other-month span {
      color: ${({ props }) => props.themeColor.dpOtherMonth};
    }
    &:hover span, &.selected-date span{
      border:${({ props }) => `1px solid ${props.themeColor.main}`};
      color: ${({ props }) => props.themeColor.main};
    }
  }
  .dp-date-selector span{
    position:absolute ;
    width:95% ;
    height:95% ;
    border-radius:50%;
    box-sizing:border-box ;
    border: 1px solid transparent;
    display:flex ;
    align-items:center;
    justify-content:center;
    font-size:13px;
    transition:.2s;
    color: ${({ props }) => props.themeColor.color};
  }
`;

export const DatePicker = ({
  theme = 'light',
  width = '300px',
  onClick = noop
}) => {
  const [selectedDate, setSelectedDate] = useState({
    year: moment().year(),
    month: moment().month() + 1,
    date: moment().date()
  });
  const [currentMonth, setCurrentMonth] = useState({
    year: moment().year(),
    month: moment().month() + 1
  });
  const [dateTable, setDateTable] = useState(getMonthTable(moment().year(), (moment().month() + 1)));
  const checkThisDate = (val) => {
    const isYear = val.year === selectedDate.year;
    const isMonth = val.month === selectedDate.month;
    const isDate = val.date === selectedDate.date;
    return isYear && isMonth && isDate;
  }
  return <StyledDatePicker
    props={{
      themeColor: themes[theme] || themes.light,
      width: width,
    }}
  >
    <div className="dp-caption">
      <IoMdArrowDropleft className="svg-IoMdArrow"
        onClick={() => {
          const isPrevYear = Number(currentMonth.month) - 1 === 0;
          const updateYear = isPrevYear ? Number(currentMonth.year) - 1 : currentMonth.year;
          const updateMonth = isPrevYear ? 12 : Number(currentMonth.month) - 1;
          const update = getMonthTable(updateYear, updateMonth)
          setCurrentMonth({
            year: updateYear,
            month: updateMonth
          });
          setDateTable(update)
        }}
      />
      <div className="dp-title">
        {currentMonth.year} , {getMonth(currentMonth.month)}
      </div>
      <IoMdArrowDropright className="svg-IoMdArrow"
        onClick={() => {
          const isNextYear = Number(currentMonth.month) + 1 > 12;
          const updateYear = isNextYear ? Number(currentMonth.year) + 1 : currentMonth.year;
          const updateMonth = isNextYear ? 1 : Number(currentMonth.month) + 1;
          const update = getMonthTable(updateYear, updateMonth)
          setCurrentMonth({
            year: updateYear,
            month: updateMonth
          });
          setDateTable(update)
        }}
      />
    </div>
    <div className="dp-week">
      {weekList.map((value, key) => <div key={key} className="dp-day">{value.day}</div>)}
    </div>
    <div className="dp-content">
      {dateTable.map((val, key) => <div key={key} className={cx(`dp-date-selector`, { 'other-month': val.month !== currentMonth.month }, { 'selected-date': checkThisDate(val) })}
        onClick={() => {
          setSelectedDate({
            year: val.year,
            month: val.month,
            date: val.date
          });
          onClick({ selected: moment(`${val.year}/${val.month}/${val.date}`) })
        }}
      >
        <span>
          {val.date}
        </span>
      </div>)}
    </div>
  </StyledDatePicker>
}