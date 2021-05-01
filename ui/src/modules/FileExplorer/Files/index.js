import React from 'react';


const Files = ({getFiles}) => {

  const [currentPath, setCurrentPath] = React.useState('/');
  const [filesOnCurrentPath, setFilesOnCurrentPath] = React.useState([]);

  React.useEffect(() => {
    getFiles(currentPath).then((files) => {
      setFilesOnCurrentPath(files);
    });
  }, [currentPath]);

  const select = (file) => {
    console.log("Selected : ", file);
  }

  const items = filesOnCurrentPath.map((file) => {
    return (
      <li key={file.name} onClick={() => select(file)}>
        {file.name} {file.isDir ? "/" : ""}
      </li>
    );
  });

  return (
    <ul>
      {items}
    </ul>
  );
}

export default Files;
