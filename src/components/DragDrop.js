import React, { useState } from "react";
import styled from "styled-components";
import { noop } from "lodash";
import { themes } from "./tools/themes";
import { randomMakeId } from "./tools";
// dnd apis
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const StyledDroppableContainer = styled.div`
  width:${({ props }) => props.width} ;
  background-color:  ${({ props }) => props.themeColor.main} ;
  border-radius:8px ;
  box-sizing:border-box ;
  padding:24px 20px;
  margin-right:25px ;
  &:last-child {
    margin-right:0 ;
  }
  .droppable-title {
    color: ${({ props }) => props.themeColor.bottom};
    padding-bottom:16px ;
    border-bottom:1px solid  ${({ props }) => props.themeColor.bottom};
    font-size: 16px;
  }
`;

const DroppableElement = ({
  title = 'Droppable Title',
  theme = '',
  dataList = [],
  containerWidth = ''
}) => {
  const dndId = `dnd-${randomMakeId(6)}`;
  const filterFeatureTitle = title.slice(0, -4);
  return <StyledDroppableContainer
    props={{
      themeColor: themes[theme] || themes.light,
      width: containerWidth
    }}>
    <div className="droppable-title">{filterFeatureTitle}</div>
    <Droppable droppableId={`${title}`}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {dataList.map((val, key) =>
            <DraggableElement
              theme={theme}
              key={key}
              index={key}
              dndId={dndId}
              val={val}
            />
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable >
  </StyledDroppableContainer>

}

const StyledDraggable = styled.div`
  width:100% ;
  background-color: ${({ props }) => props.themeColor.bottom} ;
  border-radius:4px ;
  box-sizing:border-box ;
  padding:12px ;
  margin-top:10px ;
  color:  ${({ props }) => props.themeColor.main} ;
  font-size:14px ;
`;

const DraggableElement = ({
  theme = '',
  dndId = '',
  index = 0,
  val = ''
}) => {
  return <Draggable
    draggableId={`${dndId}-draggable-${index}`}
    index={index}
  >
    {(p) => (
      <StyledDraggable
        props={{
          themeColor: themes[theme] || themes.light,
        }}
        ref={p.innerRef}
        {...p.draggableProps}
        {...p.dragHandleProps}
        key={`${dndId}-${index}`}
      >
        {val}
      </StyledDraggable>
    )}
  </Draggable>
}

const StyledDnDContnet = styled.div`
  display:flex ;
  align-items:flex-start ;
`;

export const DragDrop = ({
  theme = 'light',
  containerWidth = '280px',
  dataList = [{
    title: "",
    list: []
  }],
  onChange = noop
}) => {
  const addfeatureRun = (list) => list.map(v => v = {
    ...v,
    title: `${v.title}-${randomMakeId(3)}`
  });
  const [data, setData] = useState(addfeatureRun(dataList));
  const generateLists = (lists) => {
    let update = {};
    lists.map((v) => update = { ...update, [v.title]: v.list })
    return update;
  };
  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };
  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };
  const transData = (prevData = {}, filter = false) => {
    let data = [];
    Object.keys(prevData).map((v, k) =>
      data.push({
        title: filter ? v.slice(0, -4) : v,
        list: prevData[v]
      })
    );
    return data;
  }
  return <DragDropContext
    onDragEnd={(res) => {
      const { source, destination } = res;
      if (!destination) {
        return;
      }
      const copy = generateLists(data, source.droppableId);
      const sourceList = copy[source.droppableId];
      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        source.index
      );
      copy[source.droppableId] = newSourceList;
      const destinationList = copy[destination.droppableId];
      copy[destination.droppableId] = addToList(
        destinationList,
        destination.index,
        removedElement
      );
      setData(transData(copy));
      onChange(transData(copy, true));
    }}
  >
    <StyledDnDContnet>
      {data.map((value, key) => {
        return <DroppableElement
          title={value.title}
          key={key}
          theme={theme}
          dataList={value.list}
          containerWidth={containerWidth}
        />
      })}
    </StyledDnDContnet>
  </DragDropContext>
}
