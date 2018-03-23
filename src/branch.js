// const fs = require("fs");
class GitObject {
  constructor(hash, type) {
    this.hash = hash;
    this.type = type;
  }

  getHash() {
    return this.hash;
  }

  getType() {
    return this.type;
  }
}

export class Branch extends GitObject {
  constructor(hash, name, isDefault) {
    super(hash, "branch");
    this.name = name;
    this.isDefault = isDefault;
  }

  getBranchName() {
    return this.name;
  }
}

const cp = require("child_process");

const promisifiedExec = command => dir =>
  new Promise((resolve, reject) => {
    const p = cp.exec(command, { cwd: dir }, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve({ stdout, stderr });
    });
  });

const execGitBranchForDir = promisifiedExec("git branch -v");

export const createBranchFromTextLine = (line) => {
  const hasLeadingAsterisk = l => l[0] === "*";
  const splitLine = line.split(" ");
  if (hasLeadingAsterisk(line)) {
    const [, name, shortHash, ...rest] = splitLine;
    return new Branch(shortHash, name, true);
  }
  const [, , name, shortHash, ...rest] = splitLine;
  return new Branch(shortHash, name, false);
};

export const parseGitBranchOutput = (data) => {
  const lines = data.substr(0, data.length - 2).split("\n");
  const branches = lines.map(createBranchFromTextLine);
  return branches;
};

export const getGitBranchesForDir = dir =>
  execGitBranchForDir(dir).then((streams) => {
    const parsedResult = parseGitBranchOutput(streams.stdout);
    console.log(parsedResult);
    return parsedResult;
  });

export const getRepoBranches = (repoDir) => {};
