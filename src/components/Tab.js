import { noop } from "lodash";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { themes } from "./tools/themes";
import { randomMakeId } from "./tools";

const StyledTab = styled.div`
  padding:8px;
  border-radius:6px;
  background-color: ${({ props }) => props.themeColor.tabBG};
  .tab-wrap-content {
    position: relative;
  }
  .style-tab {
    position:absolute ;
    top:0;
    left:${({ props }) => `${props.initPosition}px`};;
    width:${({ props }) => `${props.initWidth}px`};
    height:100% ;
    border-radius:6px;
    background-color: ${({ props }) => props.themeColor.main};
  }
  .tab-wrap-content .tabs {
    position: relative;
    display:flex ;
    align-items:center;
    z-index:2 ;
  }
  .tab-style {
    padding:8px 16px ;
    font-size: 16px;
    color:  ${({ props }) => props.themeColor.btnColor};
    cursor: pointer;
  }
`;

export const Tab = ({
  dataList = [],
  defaultId = 1,
  theme = 'light',
  onClick = noop
}) => {
  const [selected, setSelected] = useState(defaultId);
  const [initWidth, setInitWidth] = useState(0);
  const [initPosition, setInitPosition] = useState(0);
  const tabConetnId = `ui-tabContent-${randomMakeId(6)}`
  const tabId = `ui-tab-${randomMakeId(6)}`;
  const initId = `${tabId}-${defaultId}`;
  const styleTabChange = (id = 1) => {
    const updater = document.getElementById(`${tabId}-${id}`);
    const update = updater.getBoundingClientRect();
    const tcWidth = getContentWidth(tabConetnId);
    setInitWidth(update.width);
    setInitPosition(update.left - tcWidth);
  }
  const getContentWidth = (tabConetnId = '') => {
    const tc = document.getElementById(tabConetnId);
    const result = tc.getBoundingClientRect().left;
    return result;
  }
  useEffect(() => {
    if (initWidth > 0) {
      return;
    } else {
      // init
      const initSelected = document.getElementById(initId);
      if (initSelected) {
        const tcWidth = getContentWidth(tabConetnId);
        setInitWidth(initSelected.getBoundingClientRect().width);
        setInitPosition(initSelected.getBoundingClientRect().left - tcWidth);
        const timeout = setTimeout(() => {
          document.querySelector('.style-tab').style.transition = '0.25s';
          return () => clearTimeout(timeout);
        }, 100);
      }
    };
  }, [selected, initId, initWidth, tabConetnId])
  return <StyledTab
    props={{
      themeColor: themes[theme] || themes,
      initWidth: initWidth,
      initPosition: initPosition
    }}
  >
    <div id={tabConetnId} className="tab-wrap-content">
      <div className="style-tab"></div>
      <div className="tabs">
        {dataList.map((val, key) => {
          return <div
            id={`${tabId}-${val.id}`}
            className="tab-style" key={key}
            onClick={() => {
              setSelected(val.id);
              styleTabChange(val.id);
              onClick({
                id: val.id,
                value: val.value,
              });
            }}
          >{val.value}</div>
        })}
      </div>
    </div>
  </StyledTab >
}