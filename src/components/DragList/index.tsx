import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { findIndex, Position } from "./find-index";
import move from "array-move";

import {
  WidgetListContext,
  WidgetListProvider
} from "../../Context/WidgetListProvider";

import { Settings, Delete, Add, Forward } from "@material-ui/icons";

const Item = ({ setPosition, moveItem, i, children, style, dragEnd, id }) => {
  const {
    removeWidget,
    selectWidget,
    insertWidget,
    updateWidget,
    selectedId
  } = React.useContext(WidgetListContext);
  const iAmSelected = selectedId === id;
  const [isDragging, setDragging] = useState(false);

  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef(null);

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginY = useMotionValue(0);

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });

  const itemStyle = {
    padding: "5px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    zIndex: isDragging ? 5 : 0
  };

  // Spring configs
  const onTop = {
    zIndex: 1,
    scale: 1.05,
    boxShadow: "3px 3px 8px black",
    cursor: "grab",
    transition: { delay: 0.1 }
  };
  const flat = {
    cursor: "pointer",
    zIndex: 0,
    scale: 1,
    boxShadow: "0px 0px 0px black",
    transition: { delay: 0.1 }
  };

  return (
    <>
      <motion.li
        ref={ref}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, scaleY: 0 }}
        // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
        style={{ ...itemStyle, ...children.style }}
        drag="y"
        dragOriginY={dragOriginY}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setDragging(false);
          dragEnd();
        }}
        onDrag={(e, { point }) => moveItem(i, point.y)}
        positionTransition={({ delta }) => {
          if (isDragging) {
            // If we're dragging, we want to "undo" the items movement within the list
            // by manipulating its dragOriginY. This will keep the item under the cursor,
            // even though it's jumping around the DOM.
            dragOriginY.set(dragOriginY.get() + delta.y);
          }

          // If `positionTransition` is a function and returns `false`, it's telling
          // Motion not to animate from its old position into its new one. If we're
          // dragging, we don't want any animation to occur.
          return !isDragging;
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginRight: "10px"
          }}
        >
          <motion.div
            animate={isDragging ? { scale: 0 } : { scale: 1 }}
            whileHover={{ scale: 1.5, rotate: 45, color: "rgb(96,125,189)" }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Settings
              onClick={() => selectWidget(iAmSelected ? null : id)}
              style={{
                cursor: "pointer"
              }}
            />
          </motion.div>
        </div>
        <motion.div
          style={{
            width: "100%",
            border: iAmSelected ? "3px solid gold" : null
          }}
          animate={isDragging ? onTop : flat}
        >
          {{
            ...children,
            props: { ...children.props, updateProps: updateWidget(id), id: id }
          }}
        </motion.div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            marginLeft: "5px"
          }}
        >
          <motion.div
            animate={isDragging ? { scale: 0 } : { scale: 1 }}
            whileHover={{ scale: 1.5, rotate: 30, color: "rgb(255,0,0)" }}
          >
            <Delete
              onClick={() => removeWidget(id)}
              style={{ cursor: "pointer" }}
            />
          </motion.div>
          <motion.div
            animate={isDragging ? { scale: 0 } : { scale: 1 }}
            whileHover={{ scale: 2, translateY: 10, color: "rgb(0,255,0)" }}
          >
            <Add
              onClick={() => insertWidget(id)}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            />
          </motion.div>
        </div>
      </motion.li>
    </>
  );
};

export const DragList = () => {
  const containerRef = useRef();
  const { widgetList, setWidgetList, getWidgetDom } = React.useContext(
    WidgetListContext
  );
  const [items, setItems] = useState(widgetList);

  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef<Position[]>([]).current;
  const setPosition = (i: number, offset: Position) => (positions[i] = offset);

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const moveItem = (i: number, dragOffset: number) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setItems(move(items, i, targetIndex));
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    listStyleType: "none",
    paddingInlineStart: "0px"
  };

  // update props to new values!
  useEffect(() => {
    if (!widgetList) return;
    setItems(widgetList);
  }, [widgetList]);

  const orderChanged = () => {
    for (var i = 0; i < items.length; i++) {
      if (widgetList[i].id !== items[i].id) return true;
    }
    return false;
  };

  return (
    <ul style={containerStyle} ref={containerRef}>
      <AnimatePresence>
        {items?.map((item, i) => (
          <Item
            key={item.id}
            id={item.id}
            i={i}
            setPosition={setPosition}
            moveItem={moveItem}
            children={getWidgetDom(item.type, item.props)}
            dragEnd={() => {
              if (orderChanged()) setWidgetList(items);
            }}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};
