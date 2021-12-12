/*
  https://adventofcode.com/2021/day/12
*/

export const prepare = (input) => {
  return input.split(/\n/).map((line) => {
    return line.split("-");
  });
};

const toGraph = (directions) => {
  const graph = {};
  directions.forEach(([from, to]) => {
    if (!graph[from]) {
      graph[from] = [];
    }
    graph[from].push(to);

    if (!graph[to]) {
      graph[to] = [];
    }
    graph[to].push(from);
  });
  return graph;
};

const isLargeCave = (node) => {
  return /[A-Z]/.test(node);
};

const canVisitOneSmallCaveTwice = (node, visited) => {
  if (isLargeCave(node)) return true;

  const visitCounts = visited.reduce(
    (visitCounts, visitedNode) => {
      if (isLargeCave(visitedNode)) return visitCounts;
      visitCounts[visitedNode] = (visitCounts[visitedNode] ?? 0) + 1;
      return visitCounts;
    },
    {
      [node]: 1,
    }
  );

  if ((visitCounts["start"] ?? 0) > 1 || (visitCounts["end"] ?? 0) > 1)
    return false;

  const nodesVisitedMoreThanOnce = Object.values(visitCounts)
    .filter((visitCount) => visitCount > 1)
    .reduce((sum, visitCount) => sum + visitCount, 0);

  if (nodesVisitedMoreThanOnce > 2) return false;

  return true;
};

const canVisitSmallCavesOnce = (node, visited) => {
  return !visited.includes(node) || isLargeCave(node);
};

export const traverse = (graph, canVisitNode) => {
  const paths = [];

  const visit = (node, path) => {
    if (!canVisitNode(node, path)) return;
    if (node === "end") {
      paths.push([...path, node]);
      return;
    }
    for (const nodeToVisit of graph[node]) {
      visit(nodeToVisit, [...path, node]);
    }
  };
  visit("start", []);
  return paths;
};

export const a = (directions) => {
  const graph = toGraph(directions);
  const paths = traverse(graph, canVisitSmallCavesOnce);
  return paths.length;
};

export const b = (directions) => {
  const graph = toGraph(directions);
  const paths = traverse(graph, canVisitOneSmallCaveTwice);
  return paths.length;
};
