const fs = require('fs');
const tar = require('tar');
const { WritableStreamBuffer } = require('stream-buffers');

const copyFileFromPod = (exec, chosenNameSpace, podName, containerName, srcPath, tgtPath) => {
  const command = ['tar', 'zcf', '-', srcPath];
  const writerStream = fs.createWriteStream(tgtPath);
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
        // The kubectl cp gives errors even if file copying succeeds so ignore it silently.
        // - https://github.com/kubernetes/kubernetes/issues/82169
        // - https://github.com/kubernetes/kubernetes/issues/58692

        // if (errStream.size()) {
        //   throw new Error(`Error from cpFromPod - details: \n ${errStream.getContentsAsString()}`);
        // }
        fs.createReadStream(tgtPath).pipe(
          tar.x({
            strip: 1,
            C: require('path').dirname(tgtPath)
          })
        )
        // await tar.x({file: '/Users/dawn/projects/podfs/docs/spikes/k8s-client/lib/temp/appsettings.json'});
        resolve();
      },
    );
  });
};

module.exports = copyFileFromPod;
