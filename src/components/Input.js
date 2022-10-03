import React, { useState, useEffect } from "react";
import { noop } from "lodash";
import styled from "styled-components";
import { themes } from "./tools/themes";
import { randomMakeId } from "./tools";
import { BasicDropInputStyled } from "./common/Commons";

const StyledInput = styled(BasicDropInputStyled)`
`;

export const Input = ({
  datalist = [],
  theme = 'light',
  width = '180px',
  fontSize = '14px',
  placeholder = 'typing',
  onChange = noop
}) => {
  const [dropStatus, setDropStatus] = useState(false);
  const [data, setData] = useState(datalist);
  const inputId = `ui-input-${randomMakeId(6)}`;
  const tyinputId = `ui-tyinput-${randomMakeId(6)}`;
  useEffect(() => {
    const handler = (e) => {
      const thisDom = document.getElementById(inputId);
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
  return <StyledInput
    id={inputId}
    props={{
      themeColor: themes[theme] || themes,
      width: width,
      fontSize: fontSize,
      dropStatus: dropStatus,
      dataLength: datalist.length
    }}
  >
    <input id={tyinputId} className="input" placeholder={placeholder}
      onChange={(e) => {
        const val = e.target.value;
        setDropStatus(
          (val && val.length > 0) ? true : false
        );
        onChange(val);
      }}
    ></input>
    <div className="data-list">
      {data.map((val, key) => <div key={key} className="data"
        onClick={() => {
          const typingInput = document.getElementById(tyinputId);
          const update = typingInput.value + val;
          typingInput.value = update;
          onChange(update);
          setDropStatus(false);
        }}
      >{val}</div>)}
    </div>
  </StyledInput>
}