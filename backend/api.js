const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');

const app = express();

// app.use(express.static('images')); // 이미지 파일 제공
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.get('/testSelect', async (req, res) => {
    const conn = await getConn();
    const query = 'SELECT * FROM posttest';
    let [rows, fields] = await conn.query(query, []);
    conn.release();

    res.send(rows);
});

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

// 게시글 조회
app.get('/board/:postid', async (req, res) => {
    const postID = req.params.postid;
    const conn = await getConn();
    const query = 'SELECT * FROM POST where post_id = ?';
    let [rows, fields] = await conn.query(query, [postID]);
    conn.release();

    res.send(rows);
});

// 게시글 수정
// app.put('/modifyboard/:postid', async (req, res) => {
//     const postID = req.params.postid;
//     const { title, user_id, content } = req.body;
//     const conn = await getConn();

//     const query = 'UPDATE post SET title = ?, user_id = ?, content = ? WHERE post_id = ?';

//     await conn.query(query, [title, user_id, content, postID], (err, results) => {
//         if (err) {
//             console.log(`query Error : ${err}`);
//             return res.status(500).json({ success: false, message: 'Failed to update post' });
//         }
//         console.log("sadfasdf");
//         return res.status(200).json({ success: true, message: 'Post updated successfully', data: results });
//     });
//     conn.release();
// });
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
        return res.status(500).json({ success: false, message: 'Failed to create post' });
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

    // db.query(query, [id], (err, results) => {
    //   if (err) {
    //     console.error('MySQL 삭제 오류:', err);
    //     return res.status(500).json({ error: 'Database deletion failed' });
    //   }
  
    //   if (results.affectedRows === 0) {
    //     return res.status(404).json({ message: 'User not found' });
    //   }
  
    //   return res.status(200).json({
    //     message: `User with ID ${id} deleted successfully`,
    //   });
    // });
});

// 게시글 댓글 조회
app.get('/comment/:postid', async (req, res) => {
    const postID = req.params.postid;
    const conn = await getConn();
    const query = 'SELECT * FROM Comment'
                + ' WHERE parent_id IS NULL AND post_id = ?'
                + ' UNION ALL'
                + ' SELECT * FROM Comment'
                + ' WHERE parent_id IS NOT NULL AND post_id = ?'
                + ' ORDER BY COALESCE(parent_id, comment_id), created_at';
    let [rows, fields] = await conn.query(query, [postID, postID]);
    conn.release();
    // console.log(rows);

    res.send(rows);
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

app.listen('5000', () => {
    console.log('Server started');
});