const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require("fs");

const app = express();

// app.use(express.static('images')); // 이미지 파일 제공

// 파일 저장 폴더 설정
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static(uploadDir)); // 업로드 파일 제공

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// DB 연동
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '111111',
  database: 'board_db'
});

const getConn = async() => {
  return await pool.getConnection(async (conn) => conn);
};

// 서버 실행
app.listen('5000', () => {
  console.log('Server started');
});

// app.get('/testSelect', async (req, res) => {
//   const conn = await getConn();
//   const query = 'SELECT * FROM posttest';
//   let [rows, fields] = await conn.query(query, []);
//   conn.release();

//   res.send(rows);
// });

// 게시판 전체 조회
app.get('/board', async (req, res) => {
  // const postID = req.params.postid;
  const conn = await getConn();
  const query = 'SELECT row_number() over (order by post_id) as no,'
              + ' post_id, user_id, title,'
              + ` CONCAT(LEFT(content, 13), '...') AS content, created_at`
              + ' FROM post ORDER BY post_id';
  let [rows, fields] = await conn.query(query, []);
  conn.release();
  // console.log(rows);

  res.send(rows);
});

// 게시글 단일 조회
app.get('/board/:postid', async (req, res) => {
  const postID = req.params.postid;
  const conn = await getConn();
  const query = 'SELECT * FROM POST where post_id = ?';
  let [rows, fields] = await conn.query(query, [postID]);
  conn.release();

  res.send(rows);
});

// 게시글 수정
app.put('/modifyboard/:postid', async (req, res) => {
  const postID = req.params.postid;
  const { title, user_id, content } = req.body;
  const conn = await getConn();

  const query = 'UPDATE post SET title = ?, user_id = ?, content = ? WHERE post_id = ?';

  try{
    await conn.query(query, [title, user_id, content, postID])
    console.log('Update Board Success!');
    conn.release();
    return res.status(200).json({ success: true, message: 'Post updated successfully'});
  } catch(err) {
    console.log(`Update Board Error : ${err}`);
    conn.release();
    return res.status(500).json({ success: false, message: 'Failed to update post' });
  }
});

// 게시글 생성
app.post('/createboard', async (req, res) => {
  const { title, user_id, content } = req.body;
  const conn = await getConn();

  const query = 'INSERT INTO post VALUES (null, ?, ?, ?, now())';

  try{
    await conn.query(query, [user_id, title, content]);
    console.log('Create Board Success!');
    conn.release();
    return res.status(200).json({ success: true, message: 'Create Board Success!'});
  } catch(err) {
    console.log(`Create Board Error : ${err}`);
    conn.release();
    return res.status(500).json({ success: false, message: 'Failed to Create post' });
  }
});

// 게시글 삭제
app.delete('/deleteboard/:postid', async (req, res) => {
  const postID = req.params.postid;
  const conn = await getConn();

  const query = 'DELETE FROM post WHERE post_id = ?';

  try{
    await conn.query(query, [postID]);
    console.log('Delete Board Success!');
    conn.release();
    return res.status(200).json({ success: true, message: 'Delete Board Success!'});
  } catch(err) {
    console.log(`Delete Board Error : ${err}`);
    conn.release();
    return res.status(500).json({ success: false, message: 'Failed to Delete post' });
  }
});

// 댓글 조회
app.get('/comment/:postid', async (req, res) => {
  const postID = req.params.postid;
  const conn = await getConn();
  // const query = 'SELECT * FROM Comment'
  //             + ' WHERE parent_id IS NULL AND post_id = ?'
  //             + ' UNION ALL'
  //             + ' SELECT * FROM Comment'
  //             + ' WHERE parent_id IS NOT NULL AND post_id = ?'
  //             + ' ORDER BY COALESCE(parent_id, comment_id), created_at';
  const query = 'WITH RECURSIVE CommentTree AS ('
              + ` SELECT a.*, CAST(LPAD(comment_id, 10, '0') AS CHAR(255)) AS path`
              + ' FROM Comment a'
              + ' WHERE post_id = ? AND parent_id IS NULL'
              + ' UNION ALL'
              + ` SELECT c.*, CONCAT(t.path, ',', LPAD(c.comment_id, 10, '0'))`
              + ' FROM Comment c'
              + ' INNER JOIN CommentTree t ON c.parent_id = t.comment_id)'
              + ' SELECT * FROM CommentTree'
              + ' ORDER BY LEFT(path, 10), path, created_at';
  let [rows, fields] = await conn.query(query, [postID]);
  conn.release();

  res.send(rows);
});

// 댓글 생성
app.post('/createcomment', async (req, res) => {
  const { post_id, user_id, parent_id, content, depth } = req.body;
  const conn = await getConn();

  const query = 'INSERT INTO comment VALUES (null, ?, ?, ?, ?, ?, now())';

  try{
    await conn.query(query, [post_id, user_id, parent_id, content, depth]);
    console.log('Create Comment Success!');
    conn.release();
    return res.status(200).json({ success: true, message: 'Create Comment Success!'});
  } catch(err) {
    console.log(`Create Comment Error : ${err}`);
    conn.release();
    return res.status(500).json({ success: false, message: 'Failed to Create comment' });
  }
});

// 댓글 삭제
app.delete('/deletecomment/:commentid', async (req, res) => {
  const commentID = req.params.commentid;
  const conn = await getConn();

  const query = 'DELETE FROM comment WHERE comment_id = ?';

  try{
    await conn.query(query, [commentID]);
    console.log('Delete Comment Success!');
    conn.release();
    return res.status(200).json({ success: true, message: 'Delete Comment Success!'});
  } catch(err) {
    console.log(`Delete Comment Error : ${err}`);
    conn.release();
    return res.status(500).json({ success: false, message: 'Failed to Delete comment' });
  }
});

// 댓글 수정
app.put('/modifycomment/:commentid', async (req, res) => {
  const commentID = req.params.commentid;
  const { userInput, contentInput } = req.body;
  const conn = await getConn();

  const query = 'UPDATE comment SET user_id = ?, content = ? WHERE comment_id = ?';

  try{
    await conn.query(query, [userInput, contentInput, commentID])
    console.log('Update Comment Success!');
    conn.release();
    return res.status(200).json({ success: true, message: 'Comment updated successfully'});
  } catch(err) {
    console.log(`Update Comment Error : ${err}`);
    conn.release();
    return res.status(500).json({ success: false, message: 'Failed to Update comment' });
  }
});

// 파일 업로드 설정 (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// 파일 업로드
app.post('/uploadfile', upload.single("file"), async (req, res) => {
  const conn = await getConn();
  const filePath = `/uploads/${req.file.filename}`;

  const query = "INSERT INTO file VALUES (NULL, ?, ?, ?, now())";

  try {
    // await conn.query(query, [postID, req.file.filename, filePath]);
    // conn.release();
    // console.log('File Upload Success!');
    // res.json({ message: "파일 업로드 성공", url: filePath });
    await conn.query(query, [post_id, req.file.filename, filePath]);
    console.log('File Upload Success!');
    conn.release();
    return res.status(200).json({ success: true, message: 'Create File Success!', url: filePath});
  } catch (err) {
    // console.log(`File Upload Error : ${err}`);
    // conn.release();
    // res.status(500).json({ error: "파일 업로드 실패", message: err.message });
    console.log(`File Upload Error : ${err}`);
    conn.release();
    return res.status(500).json({ success: false, message: 'Failed to Create File' });
  }
});

// 📌 여러 개의 파일 업로드 API
app.post("/uploadfiles", upload.array("files", 10), async (req, res) => {
  const { post_id } = req.body;
  // console.log('uploadfiles ...', post_id);
  // console.log(req.files);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "업로드된 파일이 없습니다." });
  }

  const conn = await getConn();

  const uploadedFiles = req.files.map((file) => {
    return {
      filename: file.filename,
      url: `/uploads/${file.filename}`
    };
  });

  const query = "INSERT INTO file (post_id, file_path, file_name, created_at) VALUES ?";
  // const values = uploadedFiles.map(file => [file.url, file.filename]);
  const values = uploadedFiles.map(file => [post_id, file.url, file.filename, new Date()]);
  
  try {
    if (values.length === 0) {
      throw new Error("업로드된 파일이 없습니다.");
    }

    await conn.query(query, [values]);
    console.log('Upload Files Success!');
    conn.release();
    res.json({ message: "파일 업로드 성공", files: uploadedFiles });
  } catch (err) {
    console.log(`Upload Files Error : ${err}`);
    conn.release();
    res.status(500).json({ error: "파일 업로드 실패", message: err.message });
  }
});

// 파일 조회
app.get("/file/:postid", async (req, res) => {
  const postID = req.params.postid;
  const serverUrl = "http://localhost:5000";

  const conn = await getConn();
  
  const query = "SELECT file_id, post_id, file_name, created_at,"
              + ` CONCAT('${serverUrl}', file_path) as file_path`
              + " FROM file WHERE post_id = ? ORDER BY file_id";

  try {
    const [rows] = await conn.query(query, [postID]);
    conn.release();
    console.log('Select File Success!');
    res.send(rows);
  } catch (err) {
    console.log(`Select File Error : ${err}`);
    conn.release();
    res.status(500).json({ error: "파일 목록 조회 실패", message: err.message });
  }
});

// 파일 삭제
app.delete("/deletefile/:fileid", async (req, res) => {
  const fileID = req.params.fileid;
  const { file_name } = req.body;
  const conn = await getConn();
  const filePath = path.join(uploadDir, file_name);
  console.log('delete file ...', fileID);

  const query = "DELETE FROM file WHERE file_id = ?";
  
  try {
    // 로컬 파일 삭제
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await conn.query(query, [fileID]);
    conn.release();
    console.log('Delete File Success!');
    res.json({ message: "파일 삭제 성공" });
  } catch (err) {
    console.log(`Delete File Error : ${err}`);
    conn.release();
    res.status(500).json({ error: "파일 삭제 실패", message: err.message });
  }
});


// // 파일 저장 설정 (저장경로, 파일명)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });
// const upload = multer({ storage });

// // 파일 업로드 엔드포인트
// app.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file;
//     if (!file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     const { filename, mimetype, size } = file;
//     const filePath = `uploads/${filename}`;

//     // MySQL에 저장
//     const sql = 'INSERT INTO files (name, path, type, size) VALUES (?, ?, ?, ?)';
//     db.query(sql, [filename, filePath, mimetype, size], (err, result) => {
//         if (err) throw err;
//         res.json({ id: result.insertId, filename, filePath });
//     });
// });

// // 파일 목록 조회 API
// app.get('/files', (req, res) => {
//     const sql = 'SELECT id, name, path, type, size FROM files';
//     db.query(sql, (err, results) => {
//         if (err) {
//             return res.status(500).send('Error fetching files');
//         }
//         res.json(results);
//     });
// });

// app.get('/places', async (req, res) => {
//   const fileContent = await fs.readFile('./data/places.json');

//   const placesData = JSON.parse(fileContent);

//   res.status(200).json({ places: placesData });
// });

// app.get('/user-places', async (req, res) => {
//   const fileContent = await fs.readFile('./data/user-places.json');

//   const places = JSON.parse(fileContent);

//   res.status(200).json({ places });
// });

// app.put('/user-places', async (req, res) => {
//   const places = req.body.places;

//   await fs.writeFile('./data/user-places.json', JSON.stringify(places));

//   res.status(200).json({ message: 'User places updated!' });
// });

// // 404
// app.use((req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     return next();
//   }
//   res.status(404).json({ message: '404 - Not Found' });
// });