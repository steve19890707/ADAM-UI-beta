import React from "react";
import { noop } from "lodash";
import styled from "styled-components";
import { themes } from "./tools/themes";
import { randomMakeId } from "./tools";

const StyledButton = styled.button`
  @keyframes clickBefore 
  {
    0% { 
      transform: translate(-50%,-50%) scale(0);
    }
    100% { 
      transform: translate(-50%,-50%) scale(3);
    }
  }
  position: relative;
  box-sizing: border-box;
  padding: 10px 0;
  border-radius:50px ;
  width: ${({ props }) => props.width};
  font-size: ${({ props }) => props.fontSize};
  color: ${({ props }) => props.themeColor.btnColor};
  border:2px solid ${({ props }) => props.themeColor.btnBorder};
  background-color:${({ props }) => props.themeColor.main};
  /* transition:.3s ; */
  overflow:hidden ;
  cursor: pointer;
  span {
    position:relative;
    z-index:2 ;
    pointer-events:none;
  }
  .pop {
    opacity:0.5;
    position:absolute;
    top:0;
    left:0;
    width:50%;
    padding-bottom:50% ;
    transform: translate(-50%,-50%) scale(0);
    border-radius:50px;
    background-color: ${({ props }) => props.themeColor.btnBorder};
    z-index:1 ;
    pointer-events:none ;
  }
  &:active .pop {
    animation:clickBefore .2s linear;
  }
  &:hover {
    border:2px solid ${({ props }) => props.themeColor.btnColor};
  }
`;

export const Button = ({
  theme = 'light',
  text = 'button',
  width = '120px',
  fontSize = '16px',
  onClick = noop
}) => {
  const buttonPopId = `ui-buttonPopId-${randomMakeId(6)}`;
  return <StyledButton
    props={{
      themeColor: themes[theme] || themes.light,
      width: width,
      fontSize: fontSize
    }}
    onMouseMove={(e) => {
      const rect = e.target.getBoundingClientRect();
      const xPosition = e.clientX - rect.x;
      const yPosition = e.clientY - rect.y;
      document.getElementById(buttonPopId).style.left = `${xPosition}px`;
      document.getElementById(buttonPopId).style.top = `${yPosition}px`;
    }}
    onClick={() => onClick()}
  >
    <div id={buttonPopId} className="pop"></div>
    <span>{text}</span>
  </StyledButton>
}
