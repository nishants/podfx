const fs = require('fs');
const tar = require('tar');
const tmp = require('tmp-promise');
const { WritableStreamBuffer } = require('stream-buffers');

const uploadFileToPod = (exec, chosenNameSpace, podName, containerName, srcPath, tgtPath) => {
  const createTempFile = () => {
    const path = "/Users/dawn/projects/podfs/docs/spikes/k8s-client/lib/temp/tmp-tar";
  }
  return new Promise(async (resolve, reject) => {
    const tmpFile = tmp.fileSync();
    const tmpFileName = tmpFile.name;
    const command = ['tar', 'xf', '-', '-C', tgtPath];
    await tar.c(
      {
        file: tmpFile.name,
      },
      [srcPath],
    );
    const readStream = fs.createReadStream(tmpFileName);
    const errStream = new WritableStreamBuffer();
    await exec.exec(
      chosenNameSpace,
      podName,
      containerName,
      command,
      null,
      errStream,
      readStream,
      false,
      async () => {
        if (errStream.size()) {
          throw new Error(`Error from cpToPod - details: \n ${errStream.getContentsAsString()}`);
        }
        resolve();
      },
    );
    console.log("exec done")
  });
};

module.exports = uploadFileToPod;
