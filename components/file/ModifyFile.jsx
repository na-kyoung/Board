import { useEffect, useState } from "react";
import UseFetchFile from "./UseFetchFile";
import classes from './ModifyFile.module.css';

function ModifyFile(props){
  const post_id = props.postID;

  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [changeFile, setChangeFile] = useState(false);

  useEffect(() => {
    // 파일 조회
    async function fetchfile() {
      const fileList = await UseFetchFile(post_id);
      setUploadedFiles(fileList);
    }
    
    fetchfile();
  }, [changeFile]);

  // 📌 파일 선택 시 미리보기
  const handleFileChange = (event) => {
    // console.log('선택한 파일 : ', event.target.files);
    const selectedFiles = Array.from(event.target.files);
    console.log("선택한 파일 목록:", selectedFiles);
    setFiles(selectedFiles);

    const previews = selectedFiles.map((file) =>
      file.type.startsWith("image/") || file.type === "application/pdf"
        ? URL.createObjectURL(file)
        : null
    );

    setPreviewUrls(previews);

    // // 로컬 미리보기 URL 생성
    // const previews = selectedFiles.map((file) => {
    //   // console.log("파일명:", file.name);
    //   // console.log("파일 MIME 타입:", file.type);

    //   // 📌 파일명이 .jpg.html이면 확장자를 확인하여 이미지로 처리
    //   const isImage = file.name.match(/\.(jpg|jpeg|png|gif)(\.html)?$/i);
    //   const isPdf = file.name.match(/\.pdf$/i);

    //   // console.log(isImage, isPdf);

    //   return {
    //     id: URL.createObjectURL(file), // 고유한 URL 생성 (임시)
    //     file,
    //     previewUrl: URL.createObjectURL(file),
    //     type: isImage ? "image" : isPdf ? "pdf" : "unknown",
    //   };
    // });

    setFiles(selectedFiles);
  };

  // 📌 파일 업로드
  const handleUpload = async () => {
    if (files.length === 0) return alert("파일을 선택해주세요.");

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
      alert("업로드 성공!");
      setFiles([]);
      setPreviewUrls([]);
      setChangeFile((changeFile) => !changeFile);
    } else {
      alert("업로드 실패!");
      console.log('업로드 실패 : ' + result.message);
    }
  };

  // 📌 파일 삭제
  const handleDelete = async (file_id, file_name) => {
    const isConfirmed = window.confirm('헤당 글을 삭제하시겠습니까?');
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

      {/* 📌 선택한 파일 미리보기 */}
      {previewUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {previewUrls.map((url, index) => (
            <div key={index}>
              {files[index]?.type.startsWith("image/") ? (
                <img src={url} alt="미리보기" className="w-20 h-20 object-cover" />
              ) : files[index]?.type === "application/pdf" ? (
                <embed src={url} type="application/pdf" width="50" height="50" />
              ) : files[index]?.type.startsWith("text/html") ? (
                <img src={url} alt="미리보기" className="w-20 h-20 object-cover" />
              ) : null}
            </div>
          ))}
        </div>
      )}
      {/* {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {files.map(({ id, previewUrl, file }) => (
            <div key={id} className="w-24 h-24 flex items-center justify-center border rounded-md overflow-hidden">
              {file.type.startsWith("image/") ? (
                <img src={previewUrl} alt="미리보기" className="w-full h-full object-cover" />
              ) : file.type === "application/pdf" ? (
                <embed src={previewUrl} type="application/pdf" width="100%" height="100%" />
              ) : file.type.startsWith("text/html") ? (
                <img src={previewUrl} alt="미리보기" className="w-20 h-20 object-cover" />
              ) : null}
            </div>
          ))}
        </div>
      )} */}


      <button onClick={handleUpload} className="mt-4 p-2 bg-blue-500 text-white rounded">
        업로드
      </button>

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