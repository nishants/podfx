import React from 'react';


const Files = ({getFiles}) => {

  const [currentPath, setCurrentPath] = React.useState('/');
  const [filesOnCurrentPath, setFilesOnCurrentPath] = React.useState([]);
  const [selectedFileName, setSelectedFileName] = React.useState(null);

  React.useEffect(() => {
    setSelectedFileName(null);
    getFiles(currentPath).then((files) => {
      setFilesOnCurrentPath(files);
    });
  }, [currentPath]);

  const select = (file) => {
    setSelectedFileName(file.name);
  };

  const open = (file) => {
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
    const selectedClassName = selectedFileName === file.name ? "selected" : "";
    return (
      <li
        key={file.name}
        onDoubleClick={() => open(file)}
        onClick={() => select(file)}
        className={selectedClassName}>

        <span className={iconClassName}>
          {file.isDir ? (<i className="fas fa-folder"></i>) : (<i className="fas fa-file"></i>)}
        </span>
        <label className='file-name'>{file.name}</label>

      </li>
    );
  });

  return (
    <div className="file-explorer">
      <div className="navigator">
        <button className="fas fa-arrow-circle-left" onClick={goBack}></button>
        <input type="text" disabled value={currentPath}/>
      </div>
      <ul>
        {items}
      </ul>
    </div>
  );
}

export default Files;
