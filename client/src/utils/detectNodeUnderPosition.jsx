/**
 * Detects if the mouse position is over any node's bounding box.
 * @param {number} x - The X coordinate of the mouse (clientX).
 * @param {number} y - The Y coordinate of the mouse (clientY).
 * @returns {string|null} If a node is hit, returns the node's ID; otherwise, returns null.
 */
export const detectNodeUnderPosition = (x, y) => {
    // Query all elements with IDs starting with 'top-' or 'bottom-'
    const allNodes = [
      ...document.querySelectorAll("[id^='top-']"),
      ...document.querySelectorAll("[id^='bottom-']")
    ];
  
    // Loop through each node to check if the mouse position is within its bounding box
    for (const nodeElement of allNodes) {
      const rect = nodeElement.getBoundingClientRect();
  
      // Check if the mouse (x, y) is within the current node's bounding box
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        console.log("Detected node under position:", nodeElement.id);
        return nodeElement.id; // Return the ID of the detected node
      }
    }
    
    console.log("No node detected under position:", x, y);
    return null; // Return null if no node is detected
  };