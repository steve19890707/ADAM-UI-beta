import React from "react";
import { noop } from "lodash";
import styled from "styled-components";
import { themes } from "./tools/themes";
import { FaListUl } from "react-icons/fa";
// content style
import { SingleContent, MultipleContent } from "./common/ListContent";

const StyledList = styled.div`
  width:${({ props }) => props.width};
  border:1px solid ${({ props }) => props.themeColor.border};
  border-radius:8px ;
  background-color: ${({ props }) => props.themeColor.bottom};
  .list-header {
    padding:20px ;
    box-sizing:border-box ;
    font-size:18px ;
    color: ${({ props }) => props.themeColor.color};
    border-bottom:1px solid ${({ props }) => props.themeColor.border};
    display:flex ;
    align-items:center ;
  }
  .svg-FaListUl {
    width:16px ;
    height:16px ;
    margin-right: 12px;
    fill: ${({ props }) => props.themeColor.border};
  }
  .list-datas {
    padding:0 20px;
    box-sizing:border-box ;
  }
`;

const FetchContentType = ({
  index = 0,
  theme = "light",
  type = "",
  value = ""
}) => {
  switch (type) {
    case 'multiple':
      return <MultipleContent
        index={index} theme={theme} value={value}
      />
    default:
      return <SingleContent
        index={index} theme={theme} value={value} />
  }
};

export const List = ({
  theme = 'light',
  header = 'header',
  dataType = 'single',
  data = [],
  width = '600px',
  onClick = noop
}) => {
  return <StyledList
    props={{
      themeColor: themes[theme] || themes,
      width: width
    }}
  >
    <div className="list-header">
      <FaListUl className="svg-FaListUl" />
      <span>{header}</span>
    </div>
    <div className="list-datas">{
      data.map((val, key) => <div key={key}
        onClick={() => onClick(val)}
      >
        <FetchContentType
          index={key}
          theme={theme}
          type={dataType}
          value={val}
        />
      </div>)
    }</div>
  </StyledList>
}