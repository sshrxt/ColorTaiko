export const getConnectedNodes = (selectedNode, connectionPairs) => {
  if (!selectedNode) return [];

  // Determine if the selected node is from the top or bottom row
  const isTopNode = selectedNode.startsWith("top");
  const isBottomNode = selectedNode.startsWith("bottom");

  // Safeguard to ensure valid connections
  return connectionPairs
    .flatMap((pair) => pair.pair || []) // Access 'pair' inside each connection pair safely
    .filter((conn) => conn && conn.nodes && conn.nodes.includes(selectedNode)) // Check validity and find matching connections
    .flatMap((conn) =>
      conn.nodes.filter((node) =>
        isTopNode ? node.startsWith("bottom") : node.startsWith("top")
      )
    );
};
