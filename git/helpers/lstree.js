const path = require("path");
const { GitTree } = require("../models");

const { promisifiedExec } = require("../../utils/utils.js");

const createNode = (line) => {
  const [objType, hash, fullpath] = line.split(/\s+/).slice(1);
  const dir = path.dirname(fullpath);
  const name = path.basename(fullpath);
  const parentName = dir === "." ? null : path.basename(dir);
  return new GitTree(hash, objType, name, dir, parentName);
};

const parseGitLstreeOutput = (data) => {
  const findNodeChildren = (node, allNodes) => {
    const children = allNodes.filter(n => n.getParentName() === node.getName());
    return children;
  };
  const findNodeParent = (node, allNodes) => {
    const parent = allNodes.find(n => n.getName() === node.getParentName());
    return parent || null;
  };
  const lines = data.substr(0, data.length - 1).split("\n");
  const nodes = lines.map(createNode);
  nodes.forEach((node) => {
    const objType = node.getObjType();
    if (objType === "tree") {
      const children = findNodeChildren(node, nodes);
      node.setChildren(children);
    }
    const nodeParent = findNodeParent(node, nodes);
    node.setParent(nodeParent);
  });
  return nodes;
};

const getFs = (repoDir, hash) =>
  promisifiedExec(`git ls-tree -t ${hash}`)(repoDir).then((streams) => {
    const res = parseGitLstreeOutput(streams.stdout);
    return res;
  });

// export const getNodeChildren = (data, node) => {};
module.exports = {
  parseGitLstreeOutput,
  getFs,
};
