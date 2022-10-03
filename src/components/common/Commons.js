import styled from "styled-components";

export const BasicDropInputStyled = styled.div`
  @keyframes listDrop {
    0% {
      opacity:0 ;
      max-height:0px;
    };
    100% {
      opacity:1 ;
      max-height:200px;
    };
  }
  position: relative;
  width: ${({ props }) => props.width};
  cursor: pointer;
  .input {
    width: 100%;
    outline: 0;
    box-sizing: border-box;
    padding: 8px 16px;
    border-radius:8px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${({ props }) => props.fontSize};
    border:2px solid ${({ props }) => props.themeColor.sub};
    background-color:${({ props }) => props.themeColor.bottom};
    color: ${({ props }) => props.themeColor.color};
    transition:.2s ;
  }
  .input::placeholder {
    color: ${({ props }) => props.themeColor.placeholder};
  }
  &:hover .input {
    border:2px solid ${({ props }) => props.themeColor.main};
  }
  .search-input {
    opacity: ${({ props }) => props.dropStatus ? 1 : 0};
    position: absolute;
    left:50% ;
    top:50% ;
    width: calc(100% - 4px);
    height:calc(100% - 4px);
    border:0 ;
    margin:0 ;
    outline: 0;
    box-sizing: border-box;
    padding: 8px 16px;
    border-radius:8px;
    transform:translate(-50%,-50%) ;
    font-size: ${({ props }) => props.fontSize};
    color: ${({ props }) => props.themeColor.color};
    background-color:${({ props }) => props.themeColor.bottom};
    cursor: pointer;
  }
  .svg-IoMdArrowDropdown {
    position: absolute;
    top:50% ;
    right:10px ;
    height:${({ props }) => props.fontSize};
    width:${({ props }) => props.fontSize};
    fill: ${({ props }) => props.themeColor.color};
    transform:${({ props }) => props.dropStatus ? `translateY(-50%)rotate(180deg)` : `translateY(-50%)rotate(0deg)`
  };
    transition:.3s;
    z-index: 3;
  }
  .data-list {
    opacity:0 ;
    position: absolute;
    top: 100%;
    left: 0;
    width:100%;
    background-color:${({ props }) => props.themeColor.bottom};
    box-sizing: border-box;
    border-radius:0 0 8px 8px;
    box-shadow:0 3px 8px 0 ${({ props }) => props.themeColor.dark};
    border:2px solid ${({ props }) => props.themeColor.sub};
    overflow:auto ;
    max-height:0;
    z-index: 99;
    animation: ${({ props }) => props.dropStatus ? `listDrop ${props.dataLength > 6 ? '.2' : '0'}s forwards` : 'unset'};
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background: ${({ props }) => props.themeColor.sub};
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ props }) => props.themeColor.main};
      border-radius: 10px;
      border: 2px solid ${({ props }) => props.themeColor.sub};
    }
  }
  .data {
    padding:8px 16px;
    box-sizing:border-box ;
    color:${({ props }) => props.themeColor.color};
    font-size:${({ props }) => props.fontSize};
    transition:.2s ;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background-color: ${({ props }) => props.themeColor.main};
      color:${({ props }) => props.themeColor.bottom};
    }
  }
`