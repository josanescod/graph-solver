("use strict");
//import { Graph as Graph } from "../utils/graph.js";

// Main DFS method
function dfs(startingNode, g) {
  let visited = {};
  const result = [];
  dfsUtil(startingNode, visited, result, g);
  return result;
}

// Recursive function which process and explore
// all the adjacent vertex of the vertex with which it is called
function dfsUtil(vert, visited, result, g) {
  visited[vert] = true;
  result.push(vert);
  var get_neighbours = g.adjList.get(vert);
  for (var i in get_neighbours) {
    var get_elem = get_neighbours[i];
    if (!visited[get_elem]) dfsUtil(get_elem, visited, result, g);
  }
}
export { dfs };
