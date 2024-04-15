import React from "react";
import VirtualScroller from "./VirtualScroller";

const MainComponent = () => {
  const SETTINGS = {
    itemHeight: 20,
    amount: 15,
    tolerance: 2,
    minIndex: 1,
    maxIndex: 3000,
    startIndex: 1,
  };

  const getData = (offset, limit) => {
    const data = [];
    const start = Math.max(SETTINGS.minIndex, offset);
    const end = Math.min(offset + limit - 1, SETTINGS.maxIndex);
    console.log(
      `request [${offset}..${offset + limit - 1}] -> [${start}..${end}] items`
    );
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        data.push({ index: i, text: `item ${i}` });
      }
    }
    return data;
  };

  const rowTemplate = (item) => (
    <div className="item" key={item.index}>
      {item.text}
    </div>
  );

  return (
    <div>
      <VirtualScroller get={getData} settings={SETTINGS} row={rowTemplate} />
    </div>
  );
};

export default MainComponent;
