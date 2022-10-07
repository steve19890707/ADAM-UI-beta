import React from "react";
import { noop } from "lodash";
import styled from "styled-components";
import { themes } from "./tools/themes";

const StyledSwitch = styled.label`
  position: relative;
  display:block ;
  width: ${({ props }) => `calc(${props.size} * 1.2)`};
  padding:2px ;
  box-sizing:border-box ;
  border-radius:50px ;
  background-color: ${({ props }) => props.status ? props.themeColor.main : props.themeColor.switchBG};
  transition:.3s ;
  cursor: pointer;
  .trigger-btn {
    width: ${({ props }) => `calc(${props.size} / 2)`};
    height: ${({ props }) => `calc(${props.size} / 2)`};
    box-sizing:border-box ;
    border-radius:50% ;
    background-color: ${({ props }) => props.themeColor.bottom};
    transition:.3s;
    transform:${({ props }) => props.status ?
    `translateX(calc(120% + 1px))` : `translateX(0px)`};
    pointer-events:none;
  }
  .checkbox-input {
    display:none ;
  }
`;

export const Switch = ({
  theme = 'light',
  size = '50px',
  status = false,
  onChange = noop
}) => {
  return <StyledSwitch
    props={{
      themeColor: themes[theme] || themes,
      size: size,
      status: status
    }}
  >
    <div className="trigger-btn"></div>
    <input className="checkbox-input" type='checkbox'
      checked={status}
      onChange={() => onChange()}
    />

  </StyledSwitch>
}