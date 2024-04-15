import React, { useCallback, useEffect, useRef, useState } from "react";

const setInitialState = (settings) => {
  const { itemHeight, amount, tolerance, minIndex, maxIndex, startIndex } =
    settings;
  const viewportHeight = amount * itemHeight;
  const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
  const toleranceHeight = tolerance * itemHeight;
  const bufferHeight = viewportHeight + 2 * toleranceHeight;
  const bufferedItems = amount + 2 * tolerance;
  const itemsAbove = startIndex - tolerance - minIndex;
  const topPaddingHeight = itemsAbove * itemHeight;
  const bottomPaddingHeight = totalHeight - topPaddingHeight;
  const initialPosition = topPaddingHeight + toleranceHeight;
  return {
    settings,
    viewportHeight,
    totalHeight,
    toleranceHeight,
    bufferHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    initialPosition,
    data: [],
  };
};

const VirtualScroller = ({ get, settings, row }) => {
  const [state, setState] = useState(() => setInitialState(settings));

  const viewportElement = useRef(null);

  const runScroller = (e) => {
    const { totalHeight, toleranceHeight, bufferedItems, settings } = state;
    const index =
      settings?.minIndex +
      Math.floor(
        (e?.target?.scrollTop - toleranceHeight) / settings?.itemHeight
      );
    const data = get(index, bufferedItems);
    const topPaddingHeight = Math.max(
      (index - settings?.minIndex) * settings?.itemHeight,
      0
    );
    const bottomPaddingHeight = Math.max(
      totalHeight - topPaddingHeight - data.length * settings?.itemHeight,
      0
    );

    setState({
      ...state,
      topPaddingHeight,
      bottomPaddingHeight,
      data,
    });
  };

  console.log("scroller re-render");
  useEffect(() => {
    viewportElement.current.scrollTop = state.initialPosition;
    if (!state?.initialPosition) {
      runScroller({ target: { scrollTop: 0 } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="viewport"
      ref={viewportElement}
      onScroll={runScroller}
      style={{
        height: `${state?.viewportHeight}px`,
        overflowY: "auto",
      }}
    >
      <div style={{ height: state?.topPaddingHeight }} />
      {state?.data?.length ? state?.data?.map(row) : <>Empty!</>}
      <div style={{ height: state?.bottomPaddingHeight }} />
    </div>
  );
};

export default VirtualScroller;
