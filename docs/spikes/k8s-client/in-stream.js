const Readable = require('stream');

class ReadableString extends Readable {
  sent = false

  constructor(str) {
    super();
    this.str = str;
  }

  on(){
    super.on.apply(this, arguments);
  }

  _read() {
    if (!this.sent) {
      this.push(Buffer.from(this.str));
      this.sent = true
    }
    else {
      this.push(null)
    }
  }
}

module.exports = ReadableString;
