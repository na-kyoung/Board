import { useEffect, useState } from "react";
import UseFetchFile from "./UseFetchFile";
import classes from './ModifyFile.module.css';

function ModifyFile({ onUpload, ...props}){
  const post_id = props.postID;
  console.log('ModifyFile postid :', post_id);

  const [files, setFiles] = useState([]); // 업로드할 파일 목록
  const [previewUrls, setPreviewUrls] = useState([]); // 미리보기 url
  const [uploadedFiles, setUploadedFiles] = useState([]); // 업로드 되어있는 파일 조회
  const [changeFile, setChangeFile] = useState(false); // 파일 삭제시 재조회 트리거

  useEffect(() => {
    // 파일 조회
    async function fetchfile() {
      const fileList = await UseFetchFile(post_id);
      setUploadedFiles(fileList);
    }
    
    fetchfile();
  }, [changeFile]);


  // 글 수정 완료 후 파일 업로드
  if(props.completedSave){
    handleUpload();
  }

  // 선택한 파일 미리보기
  const handleFileChange = (event) => {
    // console.log('선택한 파일 : ', event.target.files);
    const selectedFiles = Array.from(event.target.files);
    console.log("선택한 파일 목록:", selectedFiles);
    // setFiles(selectedFiles);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);

    const previews = selectedFiles.map((file) =>
      file.type.startsWith("image/") || file.type === "application/pdf"
        ? URL.createObjectURL(file)
        : null
    );

    setPreviewUrls(prevUrls => [...prevUrls, ...previews]);
  };

  // 선택한 파일 삭제
  const handleRemoveFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  // 파일 업로드
  async function handleUpload () {
    // if (files.length === 0) return alert("파일을 선택해주세요.");

    const formData = new FormData();
    formData.append("post_id", post_id);
    files.forEach((file) => formData.append("files", file));
    // console.log('formData:', formData);
    for (let pair of formData.entries()) {
      console.log('formData:', pair[0] + ": " + pair[1]);
    }

    const response = await fetch("http://localhost:5000/uploadfiles", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      console.log("업로드 성공!");
      setFiles([]);
      setPreviewUrls([]);
      // setChangeFile((changeFile) => !changeFile);
      onUpload(); // 상태 끌어올리기
    } else {
      alert("업로드 실패!");
      console.log('업로드 실패 : ' + result.message);
    }
  };

  // 파일 삭제
  const handleDelete = async (file_id, file_name) => {
    const isConfirmed = window.confirm('헤당 파일을 삭제하시겠습니까?');
    if (!isConfirmed) return;

    const response = await fetch(`http://localhost:5000/deletefile/${file_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_name }),
    });

    if (response.ok) {
      alert("파일 삭제 성공!");
      setChangeFile((changeFile) => !changeFile);
    } else {
      alert("삭제 실패!");
    }
  };

  return (
    <>
      <input type="file" multiple onChange={handleFileChange} />

      {previewUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {files.map((file, index) => (
            <div key={index}>
              <p>{file.name}</p>
              {file.type.startsWith("image/") ? (
                <img src={previewUrls[index]} alt="미리보기" className={classes.img} />
              ) : file.type === "application/pdf" ? (
                <embed src={previewUrls[index]} type="application/pdf" className={classes.pdf} />
              ) : null}
            <button 
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
              onClick={() => handleRemoveFile(index)}
            >
            삭제
          </button>
            </div>
          ))}
        </div>
      )}
      {/* <button onClick={handleUpload} className="mt-4 p-2 bg-blue-500 text-white rounded">
        업로드
      </button> */}

      <div className={classes.filebox}>
        {uploadedFiles.map((file) => (
          <div key={file.file_id} className={classes.files}>
            {file.file_path.endsWith(".pdf") ? (
              <div className={classes.filecard}>
                <embed src={file.file_path} type="application/pdf" className={classes.pdf} />
                <button onClick={() => handleDelete(file.file_id, file.file_name)} className={classes.delbtn}>
                  삭제
                </button>
              </div>
            ) : (
              <div className={classes.filecard}>
                <img src={file.file_path} alt={file.file_name} className={classes.img} />
                <button onClick={() => handleDelete(file.file_id, file.file_name)} className={classes.delbtn}>
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ModifyFile;