import React from "react";
import styled from "styled-components";
import cx from "classnames";
import { themes } from "../tools/themes";
import { TbArrowBarRight, TbSeparatorVertical } from "react-icons/tb";
import { BsArrowReturnRight } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io"
import { useState } from "react";

const StyledSingleContent = styled.div`
  box-sizing:border-box ;
  padding-bottom:25px ;
  padding-top: ${({ props }) => props.index === 0 ? '25px' : 0};
  .svg-TbArrowBarRight {
    width:16px;
    height:16px ;
    margin-right:12px ;
    color:${({ props }) => props.themeColor.border};
  }
`;

export const SingleContent = ({
  theme = 'light',
  value = '',
  index = 0
}) => {
  return <StyledSingleContent
    props={{
      index: index,
      themeColor: themes[theme] || themes,
    }}
  >
    <TbArrowBarRight className="svg-TbArrowBarRight" />
    <span>{value}</span>
  </StyledSingleContent>
}

const StyledMultipleContent = styled.div`
  box-sizing:border-box ;
  border-top: ${({ props }) => props.index === 0 ? '0px' : '1px'} solid ${({ props }) => props.themeColor.border};
  
  .svg-TbSeparatorVertical {
    width:16px;
    height:16px ;
    margin-right:12px ;
    color:${({ props }) => props.themeColor.border};
  }
  .svg-BsArrowReturnRight {
    width:16px;
    height:16px;
    margin:0 12px 0 28px ;
    color:${({ props }) => props.themeColor.border};
  }
  .svg-IoMdArrowDropdown {
    position:absolute ;
    top:50% ;
    right:0 ;
    width:20px ;
    height:20px ;
    color:${({ props }) => props.themeColor.color};
    transform:translateY(-50%) ;
    transition:.3s ;
    &.active {
      transform:translateY(-50%) rotate(180deg);
    }
  }
  .mc-data-title {
    position: relative;
    display:flex ;
    align-items:center ;
    box-sizing:border-box ;
    padding:20px 0 ;
    font-size:16px ;
    cursor: pointer;
  }
  .mc-data {
    font-size:14px ;
    display:flex ;
    align-items:center ;
    box-sizing:border-box ;
    padding-bottom:18px ;
  }
`;

export const MultipleContent = ({
  theme = 'light',
  value = [],
  index = 0
}) => {
  const [status, setStatus] = useState(false);
  return <StyledMultipleContent
    props={{
      index: index,
      themeColor: themes[theme] || themes,
    }}
  >
    <div className="mc-data-title"
      onClick={() => setStatus(prev => !prev)}
    >
      <TbSeparatorVertical className="svg-TbSeparatorVertical" />
      <span>{value.title}</span>
      <IoMdArrowDropdown className={cx("svg-IoMdArrowDropdown", { "active": status })} />
    </div>
    {status && <div className={cx("mc-flod-content", { "active": status })}>
      {value.data.map((val, key) => <div className="mc-data" key={key}>
        <BsArrowReturnRight className="svg-BsArrowReturnRight" />
        <span>{val}</span>
      </div>)}
    </div>}
  </StyledMultipleContent>
};