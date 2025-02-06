import { useState, useEffect } from "react";
import UseFetchFile from "./UseFetchFile";
import classes from './File.module.css';

// 저장되어 있는 파일 조회
function File(props) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // console.log('FileUpload : ', props.postID);
  const post_id = props.postID;

  useEffect(() => {
    // 파일 조회
    async function fetchFiles() {
      const fileList = await UseFetchFile(post_id);
      setUploadedFiles(fileList);
    }
    
    fetchFiles();
  }, []);

  return (
    <>
      <div className={classes.filebox}>
        {uploadedFiles.map((file) => (
          <div key={file.file_id} className={classes.files}>
            {file.file_path.endsWith(".pdf") ? (
              <embed src={file.file_path} type="application/pdf" className={classes.pdf} />
            ) : (
              <img src={file.file_path} alt={file.file_name} className={classes.img} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default File;