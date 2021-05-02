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
    if(file.isDir){
      setCurrentPath(`${currentPath}${file.name}/`);
    }
  };

  const goBack = () => {
    // current path ends with "/"
    const parentPath = currentPath.split("/").slice(0, -2).join("/") + "/";
    setCurrentPath(parentPath);
  }

  const items = filesOnCurrentPath.map((file) => {
    const iconClassName = `file-type-icon ${file.isDir ? "dir" : ""}`;
    return (
      <li key={file.name} onDoubleClick={() => select(file)}>
        <span className={iconClassName}>
          {file.isDir ? (<i className="fas fa-folder"></i>) : (<i className="fas fa-file"></i>)}
        </span>
        <label className='file-name'>{file.name}</label>
      </li>
    );
  });

  return (
    <div className="file-explorer">
      <div>
        <div>PWD: ({currentPath})</div>
        <button onClick={goBack}>Back</button>
      </div>
      <ul>
        {items}
      </ul>
    </div>
  );
}

export default Files;
