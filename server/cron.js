const testFolder = "./uploads/videos";
// const fs = require("fs");
const fs = require("fs-extra");

const removeFiles = () => {
  fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {
      console.log(file);
      const filePath = `${testFolder}/${file}`;
      const stat = fs.statSync(filePath);
      let seconds =
        Math.abs(new Date().getTime() - stat.ctime.getTime()) / 1000;
      console.log("diff", stat.ctime, "\t", seconds);
      if (seconds > 2000) {
        console.log("removing ", filePath);
        fs.removeSync(filePath);
      }
    });
  });
};

var CronJob = require("cron").CronJob;
var job = new CronJob(
  "*/10 * * * * *",
  function () {
    removeFiles();
  },
  null,
  true,
  "America/Los_Angeles"
);
