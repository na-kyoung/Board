import { useState, useEffect } from "react";
import classes from './File.module.css';

// 저장되어 있는 파일 조회
function File(props) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // console.log('FileUpload : ', props.postID);
  const post_id = props.postID;


  useEffect(() => {
    async function fetchFiles() {
      // console.log('Fetching Files ...');
      const response = await fetch(`http://localhost:5000/file/${post_id}`);
      const resData = await response.json();
      // const res = await fetch(`/file/${post_id}`);
      // const data = await res.json();
      setUploadedFiles(resData);
      // console.log('Files : ', resData);
    };

    fetchFiles();
  }, []);

  return (
    <>
      {/* 📌 저장된 파일 목록 */}
      {/* <h2 className="mt-6 text-lg font-bold">업로드된 파일</h2> */}
      <div className={classes.filebox}>
        {uploadedFiles.map((file) => (
          <div key={file.file_id} className={classes.files}>
            {file.file_path.endsWith(".pdf") ? (
              <embed src={file.file_path} type="application/pdf" className={classes.pdf} />
            ) : (
              <img src={file.file_path} alt={file.file_name} className={classes.img} />
            )}
            {/* <button onClick={() => handleDelete(file.file_id, file.file_name)} className="ml-4 text-red-500">
              삭제
            </button> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default File;