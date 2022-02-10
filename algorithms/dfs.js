("use strict");
//import { Graph as Graph } from "../utils/graph.js";

//calcular de alguna manera en que vertice está situado?

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
  console.log(`Estamos en el vertice ${vert}`);
  result.push(vert);
  console.log(result);
  var get_neighbours = g.adjList.get(vert);
  console.log(`vecinos de ${vert}: ${get_neighbours}`);
  for (var i in get_neighbours) {
    var get_elem = get_neighbours[i];
    if (!visited[get_elem]) {
      dfsUtil(get_elem, visited, result, g);
    } else {
      console.log(`Este vertice ${get_neighbours[i]} ya ha sido visitado`);
    }
  }
}
export { dfs };
