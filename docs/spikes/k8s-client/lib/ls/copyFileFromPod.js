const fs = require('fs');
const tar = require('tar');
const { WritableStreamBuffer } = require('stream-buffers');
const tmp = require('tmp-promise');

const copyFileFromPod = (exec, chosenNameSpace, podName, containerName, srcPath, tgtPath) => {
  const tmpFile = tmp.fileSync();
  const tmpFileName = tmpFile.name;
  const command = ['tar', 'zcf', '-', srcPath];
  const writerStream = fs.createWriteStream(tmpFileName);
  const errStream = new WritableStreamBuffer();

  return new Promise(async (resolve, reject) => {
    exec.exec(
      chosenNameSpace,
      podName,
      containerName,
      command,
      writerStream,
      errStream,
      null,
      false,
      async () => {
        // if (errStream.size()) {
        //   throw new Error(`Error from cpFromPod - details: \n ${errStream.getContentsAsString()}`);
        // }
        await tar.x({
          file: tmpFileName,
          cwd: tgtPath,
        });
        resolve();
      },
    );
  });
};

module.exports = copyFileFromPod;
