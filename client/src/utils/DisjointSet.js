class DisjointSet {
    constructor() {
      this.parent = new Map(); // Maps each node to its parent
      this.rank = new Map();   // Tracks the rank of each node
      this.groupInfo = new Map(); // Stores group-specific information (e.g., nodes, pairs, color)
    }
  
    // Find the root of the node with path compression
    find(node) {
      if (!this.parent.has(node)) {
        // Initialize node as its own parent
        this.parent.set(node, node);
        this.rank.set(node, 0);
        this.groupInfo.set(node, { 
          nodes: new Set([node]), 
          pairs: new Map(), // Map for efficient pair management
          color: null 
        });
      }
  
      if (this.parent.get(node) !== node) {
        this.parent.set(node, this.find(this.parent.get(node))); // Path compression
      }
      return this.parent.get(node);
    }
  
    // Union two nodes into the same set
    union(node1, node2) {
      const root1 = this.find(node1);
      const root2 = this.find(node2);
  
      if (root1 !== root2) {
        const rank1 = this.rank.get(root1);
        const rank2 = this.rank.get(root2);
  
        // Union by rank
        if (rank1 > rank2) {
          this.parent.set(root2, root1);
          this.mergeGroupInfo(root1, root2);
        } else if (rank1 < rank2) {
          this.parent.set(root1, root2);
          this.mergeGroupInfo(root2, root1);
        } else {
          this.parent.set(root2, root1);
          this.rank.set(root1, rank1 + 1);
          this.mergeGroupInfo(root1, root2);
        }
      }
    }
  
    // Merge group information when two groups are united
    mergeGroupInfo(root1, root2) {
      const group1 = this.groupInfo.get(root1);
      const group2 = this.groupInfo.get(root2);
  
      // Merge nodes
      group1.nodes = new Set([...group1.nodes, ...group2.nodes]);
  
      // Merge pairs, ensuring validity and avoiding duplicates
      group2.pairs.forEach((value, key) => {
        if (validatePair(key, group1.nodes)) {
          group1.pairs.set(key, value);
        }
      });
  
      // Merge colors if applicable
      group1.color = group1.color || group2.color;
  
      // Remove merged group's information
      this.groupInfo.delete(root2);
    }
  
    // Get group information by any node in the group
    getGroup(node) {
      const root = this.find(node);
      return this.groupInfo.get(root);
    }
  
    // Update group information with a callback
    updateGroupInfo(node, updateCallback) {
      const root = this.find(node);
      const group = this.groupInfo.get(root);
      if (group) updateCallback(group);
    }
  }
  
  // Helper function to validate pairs
  function validatePair(pairKey, nodes) {
    const [node1, node2] = pairKey.split(',');
    return nodes.has(node1) && nodes.has(node2);
  }
  
  // Helper function to create a standardized key for pairs
  function createConnectionKey(node1, node2) {
    return [node1, node2].sort().join(',');
  }
  