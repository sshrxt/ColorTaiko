export const checkAndAddNewNodes = (topRowCount, bottomRowCount, connections, setTopRowCount, setBottomRowCount) => {
    const allTopNodesConnected = Array.from({ length: topRowCount }, (_, i) =>
      connections.some((conn) => conn.nodes.includes(`top-${i}`))
    ).every(Boolean);
    const allBottomNodesConnected = Array.from(
      { length: bottomRowCount },
      (_, i) => connections.some((conn) => conn.nodes.includes(`bottom-${i}`))
    ).every(Boolean);
    if (allTopNodesConnected || allBottomNodesConnected) {
      allTopNodesConnected ? setTopRowCount((prev) => prev + 1) : setBottomRowCount((prev) => prev + 1);
    }
  };