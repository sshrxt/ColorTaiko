export const getConnectedNodes = (selectedNode, connectionPairs) => {
  if (!selectedNode) return [];

  // Determine if the selected node is from the top or bottom row
  const isTopNode = selectedNode.startsWith("top");
  const isBottomNode = selectedNode.startsWith("bottom");

  // Filter connections to find nodes from the opposite row
  return connectionPairs
    .flat() // Flatten connection pairs into a single array of connections
    .filter((conn) => conn.nodes.includes(selectedNode)) // Find connections involving the selected node
    .flatMap((conn) =>
      conn.nodes.filter((node) =>
        isTopNode ? node.startsWith("bottom") : node.startsWith("top")
      )
    );
};