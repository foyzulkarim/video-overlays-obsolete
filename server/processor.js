// ffmpeg -i 64.mkv -vcodec libx265 -crf 28 output.mkv
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

async function execute(command) {
  console.log("executing\t", command);
  const { stdout, stderr } = await exec(command);
  console.log("stdout:", stdout);
  console.error("stderr:", stderr);
  return !!stderr;
}

const split = async (inputPath) => {
  const commandStr = `ffmpeg -i ${inputPath} -vcodec copy -f segment -segment_time 00:10 out_h264_%02d.webm`;
  const isProcessed = await execute(commandStr);
  return isProcessed;
};

const convert = async (inputPath, outputPath) => {
  const commandStr = `ffmpeg -i ${inputPath} -vcodec libx265 -crf 28 ${outputPath}.mkv`;
  const isProcessed = await execute(commandStr);
  return isProcessed;
};

module.exports = { split, convert };
