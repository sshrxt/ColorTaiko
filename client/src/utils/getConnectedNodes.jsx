export const getConnectedNodes = (selectedNode, connectionPairs) => {
  if (!selectedNode) return [];

  // 判断选中节点是顶部还是底部节点
  const isTopNode = selectedNode.startsWith("top");
  const isBottomNode = selectedNode.startsWith("bottom");

  // 遍历 connectionPairs，寻找与选中节点相关的连接
  return connectionPairs
    .flatMap((pair) => pair.connections || []) // 展开 connections 数组
    .filter((conn) => conn?.nodes?.includes(selectedNode)) // 找到包含选中节点的连接
    .flatMap((conn) => 
      conn.nodes.filter((node) =>
        // 如果是顶部节点，只返回底部节点，反之亦然
        isTopNode ? node.startsWith("bottom") : node.startsWith("top")
      )
    );
};
