import React, { useState, useEffect } from "react";
import { noop } from "lodash";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import { themes } from "./tools/themes";
import { randomMakeId, filterObjSearch } from "./tools";
import { BasicDropInputStyled } from "./common/Commons";

const StyledDropInput = styled(BasicDropInputStyled)``;

export const DropInput = ({
  datalist = [],
  theme = 'light',
  width = '180px',
  fontSize = '14px',
  placeholder = 'select',
  emptyValue = 'data not found',
  onClick = noop
}) => {
  const [inputValue, setInputValue] = useState('');
  const [dropStatus, setDropStatus] = useState(false);
  const [data, setData] = useState(datalist);
  const dropinputId = `ui-dropinput-${randomMakeId(6)}`;
  const searchInputId = `ui-searchinput-${randomMakeId(6)}`;
  useEffect(() => {
    const handler = (e) => {
      const thisDom = document.getElementById(dropinputId);
      if (thisDom && !thisDom.contains(e.target)) {
        setDropStatus(false);
        setData(datalist);
      }
    }
    // Bind the event listener
    document.addEventListener("click", handler);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handler);
    };
  })
  return <StyledDropInput
    id={dropinputId}
    props={{
      themeColor: themes[theme] || themes.light,
      width: width,
      fontSize: fontSize,
      dropStatus: dropStatus,
      dataLength: datalist.length
    }}
    onClick={() => {
      document.getElementById(searchInputId).value = '';
      setDropStatus(prev => !prev);
      setData(datalist);
    }}
  >
    <input className="input" placeholder={placeholder} readOnly value={inputValue}></input>
    <input id={searchInputId} className="search-input" onChange={(e) => {
      const val = e.target.value;
      setData(filterObjSearch(datalist, val, emptyValue));
    }}></input>
    <IoMdArrowDropdown className="svg-IoMdArrowDropdown" />
    <div className="data-list">
      {data.map((val, key) => <div key={key} className="data"
        onClick={() => {
          if (val.value === emptyValue) {
            return;
          }
          setInputValue(val.value || '');
          onClick(val);
        }}
      >{val.value}</div>)}
    </div>
  </StyledDropInput>
}