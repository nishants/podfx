const Stream = require('stream');
const Readable = Stream.Readable;
const Writable = Stream.Writable;

const createWriteStream = (onData) => {
  const writeStream = new Writable({
    objectMode: true,
    write(data, encoding, done){
      onData(data, encoding).then(done);
    }
  });

  return writeStream;
};

const createReadStream = () => {
  const readStream = new Readable({
    objectMode: true,
    read(){}
  });
  return readStream;
}

module.exports = {
  createWriteStream,
  createReadStream
}
