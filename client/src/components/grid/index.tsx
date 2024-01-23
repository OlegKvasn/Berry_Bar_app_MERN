import React from "react";
import styles from "./grid.module.scss";

const Grid = (props: React.ComponentProps<"ul">) => {
  if (!React.Children.count(props.children)) return null;
  return (
    <ul {...props} className={`${styles.gridContainer} ${props.className}`}>
      {props.children}
    </ul>
  );
};

function GridItem(props: React.ComponentProps<"li">) {
  return (
    <li {...props} className={`${styles.gridItem} ${props.className}`}>
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;
export default Grid;
