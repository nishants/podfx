const parseLsOutput = (lsOutput) => {
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
  return getFilesFrom(lsOutput)
};

module.exports = parseLsOutput;
