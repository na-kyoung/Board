import { useState } from "react";
import axios from 'axios';
// import * as pdfjsLib from 'pdfjs-dist';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

function FileUpload(props){
    console.log('FileUpload Start!');
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const postID = props.postID;
    console.log(postID);

    // 파일 목록 초기 로드
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/files');
                setUploadedFiles(response.data);
            } catch (error) {
                console.error('파일 목록을 가져오는 중 오류 발생:', error);
            }
        };
        fetchFiles();
    }, []);
    
    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('파일을 선택하세요!');
            return;
        }

        const formData = new FormData();
        formData.append('file', files[0]); // 한 번에 하나의 파일 업로드

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setUploadedFiles(prev => [...prev, response.data]);
        } catch (err) {
            console.error(err);
            alert('파일 업로드 실패');
        }
    };

    // const renderPdfThumbnail = async (pdfPath) => {
    //     const pdf = await pdfjsLib.getDocument(pdfPath).promise;
    //     const page = await pdf.getPage(1);

    //     const viewport = page.getViewport({ scale: 1 });
    //     const canvas = document.createElement('canvas');
    //     canvas.width = viewport.width;
    //     canvas.height = viewport.height;

    //     const context = canvas.getContext('2d');
    //     await page.render({ canvasContext: context, viewport }).promise;

    //     return canvas.toDataURL(); // 썸네일로 사용할 Data URL 반환
    // };

    // return (
    //     <div>
    //         <h1>파일 업로드</h1>
    //         <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
    //         <button onClick={handleUpload}>업로드</button>

    //         <h2>업로드된 파일</h2>
    //         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    //             {uploadedFiles.map(file => (
    //                 <div key={file.id} style={{ margin: '10px', textAlign: 'center' }}>
    //                     {file.filename.endsWith('.pdf') ? (
    //                         <PdfThumbnail filePath={`http://localhost:5000/${file.filePath}`} />

    //                     ) : (
    //                         <img src={`http://localhost:5000/${file.filePath}`} alt={file.filename} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
    //                     )}
    //                     <p>{file.filename}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );

    return (
        <div>
            <h1>파일 업로드 및 조회</h1>
            {/* <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} /> */}
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>업로드</button>

            <h2>업로드된 파일</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {uploadedFiles.map((file) => (
                    <FileThumbnail key={file.id} file={file} />
                ))}
            </div>
        </div>
    );
}

const FileThumbnail = ({ file }) => {
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        if (file.type === 'application/pdf') {
            generatePdfThumbnail(`http://localhost:5000/${file.path}`);
        } else {
            setThumbnail(`http://localhost:5000/${file.path}`);
        }
    }, [file]);

    const generatePdfThumbnail = async (pdfPath) => {
        const pdf = await pdfjsLib.getDocument(pdfPath).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext('2d');
        await page.render({ canvasContext: context, viewport }).promise;

        setThumbnail(canvas.toDataURL());
    };

    return (
        <div style={{ margin: '10px', textAlign: 'center' }}>
            {thumbnail ? (
                <img src={thumbnail} alt={file.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            ) : (
                <div
                    style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#ddd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <span>Loading...</span>
                </div>
            )}
            <p>{file.name}</p>
        </div>
    );
};


// function PdfThumbnail({ filePath }) {
//     const [thumbnail, setThumbnail] = useState(null);

//     useEffect(() => {
//         const generateThumbnail = async () => {
//             const pdfThumbnail = await renderPdfThumbnail(filePath);
//             setThumbnail(pdfThumbnail);
//         };
//         generateThumbnail();
//     }, [filePath]);

//     return (
//         <div>
//             {thumbnail ? (
//                 <img src={thumbnail} alt="PDF 썸네일" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//             ) : (
//                 <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <span>Loading...</span>
//                 </div>
//             )}
//         </div>
//     );
// }

export default FileUpload;