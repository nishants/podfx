const ls = require('../lib/ls');

const examples = {
  simple: {
    output: [
      "total 992K\r\n",
      "drwxr-xr-x 1 root root 4.0K Apr 24 16:46  ./\r\ndrwxr-xr-x 1 root root 4.0K Apr 24 06:20  ../\r\n-rwxr--r-- 1 root root 355K Dec 13  2019  Google.Protobuf.dll*\r\n-rwxr--r-- 1 root root  22K Feb  7  2020  Grpc.AspNetCore.Server.ClientFactory.dll*\r\n-rwxr--r-- 1 root root 124K Feb  7  2020  Grpc.AspNetCore.Server.dll*\r\n-rwxr--r-- 1 root root  50K Feb  4  2020  Grpc.Core.Api.dll*\r\n-rwxr--r-- 1 root root  87K Feb  7  2020  Grpc.Net.Client.dll*\r\n-rwxr--r-- 1 root root  30K Feb  7  2020  Grpc.Net.ClientFactory.dll*\r\n-rwxr--r-- 1 root root  18K Feb  7  2020  Grpc.Net.Common.dll*\r\n-rwxr-xr-x 1 root root  89K Nov  8 11:22  Service*\r\n-rw-r--r-- 1 root root 114K Nov  8 11:22  Service.deps.json\r\n-rw-r--r-- 1 root root  21K Nov  8 11:22  Service.dll\r\n-rw-r--r-- 1 root root  24K Nov  8 11:22  Service.pdb\r\n-rw-r--r-- 1 root root  213 Nov  8 11:22  Service.runtimeconfig.json\r\ndrwxr-xr-x 2 root root 4.0K Apr 24 16:08  alpha/",
      "\r\n-rw-r--r-- 1 root root  166 Nov  8 09:27  appsettings.Development.json\r\n-rw-r--r-- 1 root root  261 Nov  8 09:27  appsettings.json\r\ndrwxr-xr-x 2 root root 4.0K Apr 24 11:33  dir/\r\ndrwxr-xr-x 2 root root 4.0K Apr 24 11:33  hello/\r\ndrwxr-xr-x 2 root root 4.0K Apr 24 16:46 'hello world'/\r\n-rw-r--r-- 1 root root  483 Nov  8 11:22  web.config\r\n"
    ],
    expectedFiles : [
      {
        "isDir": false,
        "name": "Google.Protobuf.dll",
        "size": "355K",
        "time": "Dec 13 2019"
      },
      {
        "isDir": false,
        "name": "Grpc.AspNetCore.Server.ClientFactory.dll",
        "size": "22K",
        "time": "Feb 7 2020"
      },
      {
        "isDir": false,
        "name": "Grpc.AspNetCore.Server.dll",
        "size": "124K",
        "time": "Feb 7 2020"
      },
      {
        "isDir": false,
        "name": "Grpc.Core.Api.dll",
        "size": "50K",
        "time": "Feb 4 2020"
      },
      {
        "isDir": false,
        "name": "Grpc.Net.Client.dll",
        "size": "87K",
        "time": "Feb 7 2020"
      },
      {
        "isDir": false,
        "name": "Grpc.Net.ClientFactory.dll",
        "size": "30K",
        "time": "Feb 7 2020"
      },
      {
        "isDir": false,
        "name": "Grpc.Net.Common.dll",
        "size": "18K",
        "time": "Feb 7 2020"
      },
      {
        "isDir": false,
        "name": "Service",
        "size": "89K",
        "time": "Nov 8 11:22"
      },
      {
        "isDir": false,
        "name": "Service.deps.json",
        "size": "114K",
        "time": "Nov 8 11:22"
      },
      {
        "isDir": false,
        "name": "Service.dll",
        "size": "21K",
        "time": "Nov 8 11:22"
      },
      {
        "isDir": false,
        "name": "Service.pdb",
        "size": "24K",
        "time": "Nov 8 11:22"
      },
      {
        "isDir": false,
        "name": "Service.runtimeconfig.json",
        "size": "213",
        "time": "Nov 8 11:22"
      },
      {
        "isDir": true,
        "name": "alpha",
        "size": "4.0K",
        "time": "Apr 24 16:08"
      },
      {
        "isDir": false,
        "name": "appsettings.Development.json",
        "size": "166",
        "time": "Nov 8 09:27"
      },
      {
        "isDir": false,
        "name": "appsettings.json",
        "size": "261",
        "time": "Nov 8 09:27"
      },
      {
        "isDir": true,
        "name": "dir",
        "size": "4.0K",
        "time": "Apr 24 11:33"
      },
      {
        "isDir": true,
        "name": "hello",
        "size": "4.0K",
        "time": "Apr 24 11:33"
      },
      {
        "isDir": true,
        "name": "'hello world'",
        "size": "4.0K",
        "time": "Apr 24 16:46"
      },
      {
        "isDir": false,
        "name": "web.config",
        "size": "483",
        "time": "Nov 8 11:22"
      }
    ]
  }
}
describe("ls", () => {
  const expectedNameSpace = "my-namespace";
  const expectedPodName = "my-pod-name";
  const expectedContainerName = "my-conainter-name";
  const expectedTty = true;

  let outputs;
  let execute;
  let connectionClosed;
  let connectionTernminate;

  const exec = async (chosenNameSpace, podName, containerName, commandArgs, outStream, errorStream, inStream, tty, onDone) => {
    expect(chosenNameSpace).toBe(expectedNameSpace);
    expect(podName).toBe(expectedPodName);
    expect(containerName).toBe(expectedContainerName);
    expect(tty).toBe(expectedTty);
    const commandOutput = outputs[commandArgs.join(" ")];

    for(let outputLine of commandOutput){
      outStream.write(outputLine);
    }
    outStream.end();

    expect(commandOutput).toBeDefined()

    setTimeout(onDone, 500);
    return {
      close: () => connectionClosed = true,
      terminate: () => connectionTernminate = true,
    }
  };

  beforeEach(() => {
    outputs = {};
    connectionClosed=false;
    connectionTernminate=false;
  });

  it("should get files", async () => {
    outputs['ls -lhaF /app'] = examples.simple.output;
    const dir = '/app';
    const actual = await ls.getFiles({exec}, expectedNameSpace, expectedPodName, expectedContainerName, dir);
    expect(connectionClosed).toBe(true);
    expect(connectionTernminate).toBe(true);
    expect(actual).toEqual(examples.simple.expectedFiles);
  });
});
