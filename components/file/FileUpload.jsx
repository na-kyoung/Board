import { useState, useEffect } from "react";

function FileUpload(props) {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  console.log('FileUpload : ', props.postID);
  const post_id = props.postID;

  // 📌 저장된 파일 목록 불러오기
  const fetchFiles = async () => {
    console.log('Fetching Files ...')
    const res = await fetch(`/file/${post_id}`);
    const data = await res.json();
    setUploadedFiles(data);
    console.log('Files : ', data);
  };

  useEffect(() => {
    async function fetchFiles() {
      console.log('Fetching Files ...')
      const response = await fetch(`http://localhost:5000/file/${post_id}`);
      const resData = await response.json();
      // const res = await fetch(`/file/${post_id}`);
      // const data = await res.json();
      setUploadedFiles(resData);
      console.log('Files : ', resData);
    };

    fetchFiles();
  }, []);

  // 📌 파일 선택 시 미리보기
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    const previews = selectedFiles.map((file) =>
      file.type.startsWith("image/") || file.type === "application/pdf"
        ? URL.createObjectURL(file)
        : null
    );

    setPreviewUrls(previews);
  };

  // 📌 파일 업로드
  const handleUpload = async () => {
    if (files.length === 0) return alert("파일을 선택해주세요.");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("post_id", post_id);

    const response = await fetch("/uploadfiles", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("업로드 성공!");
      setFiles([]);
      setPreviewUrls([]);
      fetchFiles(); // 목록 갱신
    } else {
      alert("업로드 실패!");
    }
  };

  // 📌 파일 삭제
  const handleDelete = async (post_id, filename) => {
    const response = await fetch(`/deletefile/${post_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, filename }),
    });

    if (response.ok) {
      alert("파일 삭제 성공!");
      fetchFiles(); // 목록 갱신
    } else {
      alert("삭제 실패!");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-96">
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
              ) : null}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleUpload} className="mt-4 p-2 bg-blue-500 text-white rounded">
        업로드
      </button>

      {/* 📌 저장된 파일 목록 */}
      <h2 className="mt-6 text-lg font-bold">업로드된 파일</h2>
      <div className="mt-2">
        {uploadedFiles.map((file) => (
          <div key={file.file_id} className="flex justify-between items-center p-2 border-b">
            {file.file_path.endsWith(".pdf") ? (
              <embed src={file.file_path} type="application/pdf" width="50" height="50" />
            ) : (
              <img src={file.file_path} alt={file.file_name} className="w-12 h-12 object-cover" />
            )}
            {/* <button onClick={() => handleDelete(file.file_id, file.file_name)} className="ml-4 text-red-500">
              삭제
            </button> */}
          </div>
        ))}
      </div>
      {/* <div className="mt-4 flex flex-wrap gap-2">
        {uploadedFiles.map((file) => (
          <div key={file.file_id} className="w-24 h-32 flex flex-col items-center justify-between p-2 border rounded-md shadow-sm">
            <div className="w-24 h-24 flex items-center justify-center border rounded-md overflow-hidden">
              {file.file_path.endsWith(".pdf") ? (
                <embed src={file.file_path} type="application/pdf" width="100%" height="100%" />
              ) : (
                <img src={file.file_path} alt={file.file_name} className="w-full h-full object-cover" />
              )}
            </div>
            {/* <button onClick={() => handleDelete(file.file_id, file.file_name)} className="mt-2 p-1 text-sm bg-red-500 text-white rounded">
              삭제
            </button>
          </div> 
        ))} 
      </div> */}
    </div>
  );
}

export default FileUpload;