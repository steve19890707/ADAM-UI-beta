import React from "react";
import { noop } from "lodash";
import { useState } from "react";
import styled from "styled-components";
import { themes } from "./tools/themes";
import { IoMdPricetag } from "react-icons/io";
import { HiHashtag } from "react-icons/hi";
import { CgTag } from "react-icons/cg";

const StyledTags = styled.div`
  .svg-react-icons {
    width: 18px;
    height: 18px;
    fill: ${({ props }) =>
    props.status ? props.themeColor.main : props.themeColor.border};
    color: ${({ props }) =>
    props.status ? props.themeColor.main : props.themeColor.border};
    transition: 0.2s;
  }
  .tag-value {
    font-size: 14px;
    color: ${({ props }) =>
    props.status ? props.themeColor.main : props.themeColor.border};
    transition: 0.2s;
  }
`;

const StyledDefaultTag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid
    ${({ props }) =>
    props.status ? props.themeColor.main : props.themeColor.border};
  transition: 0.2s;
  cursor: pointer;
  .svg-react-icons {
    margin-right: 6px;
  }
`;

const StyledHashTag = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledHorizontal = styled.div`
  display: flex;
  align-items: center;
  .svg-react-icons {
    margin-right: 6px;
  }
  cursor: pointer;
`;

const FatchTagType = ({
  type = "defalut",
  theme = "light",
  status = false,
  value = "",
}) => {
  switch (type) {
    case "hashtag":
      return (
        <StyledHashTag>
          <HiHashtag className="svg-react-icons" />
          <div className="tag-value">{value}</div>
        </StyledHashTag>
      );
    case "horizontal":
      return (
        <StyledHorizontal>
          <CgTag className="svg-react-icons" />
          <div className="tag-value">{value}</div>
        </StyledHorizontal>
      );
    default:
      return (
        <StyledDefaultTag
          props={{
            themeColor: themes[theme] || themes,
            status: status,
          }}
        >
          <IoMdPricetag className="svg-react-icons" />
          <div className="tag-value">{value}</div>
        </StyledDefaultTag>
      );
  }
};

export const Tags = ({
  theme = "light",
  type = "defalut",
  value = "tag",
  selected = false,
  onClick = noop,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(selected);
  return (
    <StyledTags
      props={{
        themeColor: themes[theme] || themes,
        status: selectedStatus,
      }}
      onClick={() => {
        setSelectedStatus((prev) => !prev);
        onClick(!selectedStatus);
      }}
    >
      <FatchTagType
        type={type}
        theme={theme}
        status={selectedStatus}
        value={value}
      />
    </StyledTags>
  );
};
