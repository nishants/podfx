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
    const tokens = line
      .trim()
      .replace(/\s\s+/g, ' ')
      .split(" ");

    // Remove lines for total 992K", and for .. and .
    if(tokens.length < 7 || tokens[tokens.length - 1].endsWith("./")){
      return null;
    }
    const cleaned =  tokens.slice(4);

    const size = cleaned[0];
    const time = `${cleaned[1]} ${cleaned[2]} ${cleaned[3]}`;
    const nameWithSymbol = cleaned.slice(4).join(" ");
    const isDir = nameWithSymbol.endsWith("/");
    const name = nameWithSymbol
      .replace(/\*$/, '')
      .replace(/\/$/, '')

    return {
      size,
      time,
      name,
      isDir
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

