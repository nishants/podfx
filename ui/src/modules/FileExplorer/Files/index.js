import React from 'react';

const Files = ({files, openDirectory}) => {
  const items = files.map((file) => {
    return (
      <li key={file.name} onClick={() => openDirectory(file.name)}>
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
