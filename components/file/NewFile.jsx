import { useState } from "react";
import classes from './NewFile.module.css';

function NewFile({ onUpload, ...props}){
  const post_id = props.postID;
  console.log('ModifyFile postid :', post_id);

  const [files, setFiles] = useState([]); // 업로드할 파일 목록
  const [previewUrls, setPreviewUrls] = useState([]); // 미리보기 url

  // 글 수정 완료 후 파일 업로드
  if(props.completedSave){
    handleUpload();
  }

  // 파일 선택 시 미리보기
  const handleFileChange = (event) => {
    // console.log('선택한 파일 : ', event.target.files);
    const selectedFiles = Array.from(event.target.files);
    // console.log("선택한 파일 :", selectedFiles);

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
      // setFiles([]);
      // setPreviewUrls([]);
      onUpload(); // 상태 끌어올리기
    } else {
      alert("업로드 실패!");
      console.log('업로드 실패 : ' + result.message);
    }
  };

  return (
    <>
      <input type="file" multiple onChange={handleFileChange} />

      {/* 선택한 파일 미리보기 */}
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
    </>
  );
}

export default NewFile;