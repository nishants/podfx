const k8s = require('@kubernetes/client-node');
const { createWriteStream, createReadStream } = require('../streams');

const getFiles = (exec, chosenNameSpace, podName, containerName, path = "/") => {
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

  const convertToFiles = (line) => {
    const tokens = line.split(" ");
    if(tokens.length < 7){
      return null;
    }
    const size = tokens[4];
    const time = `${tokens[5]} ${tokens[6]} ${tokens[7]}`;
    const name = tokens.slice(8).join(" ");
    if(name.endsWith("./")){
      return null;
    }
    return tokens.slice(4).join(" ").trim();
    return {
      size,
      time,
      name
    };
  };

  const getFilesFrom = (output) => {
    const lines = output
      .map(o => o.split("\r\n"))
      .reduce((all, el) => [...all, ...el], [])
      .filter(a => a.length);

    return lines.map(convertToFiles).filter(f => !!f);
  };

  return new Promise(async (resolve, reject) => {
    const connection = await exec.exec(chosenNameSpace, podName, containerName, ['ls','-lhaF' , path],
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
        resolve(getFilesFrom(output));
      }).catch(reject);
    console.log(connection);
  });
};

module.exports = {
  getFiles
};

