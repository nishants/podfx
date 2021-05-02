const { createWriteStream, createReadStream } = require('./streams');

const executeCommand = (exec, chosenNameSpace, podName, containerName, command) => {
  const inStream = createReadStream();

  const output = [];
  const errors = [];

  const errorStream = createWriteStream(async (data)=> {
    const utf8 = data.toString('utf-8');
    errors.push(utf8);
  });

  const outStream = createWriteStream(async (data)=> {
    const utf8 = data.toString('utf-8');
    output.push(utf8);
  });

  return new Promise(async (resolve, reject) => {
    const connection = await exec.exec(chosenNameSpace, podName, containerName, command,
      outStream,
      errorStream,
      inStream,
      true, //tty
      (status) => {
        connection.close();
        connection.terminate();
        if(errors.length){
          return reject(errors)
        }
        resolve(output);
      }).catch(reject);
  });
};

module.exports = executeCommand;
