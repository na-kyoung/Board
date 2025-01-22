// import fs from 'node:fs/promises';

const express = require('express');
const bodyParser = require("body-parser");
// import bodyParser from 'body-parser';
// import express from 'express';
const mysql = require('mysql2/promise');

const app = express();

app.use(express.static('images')); // 이미지 파일 제공
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
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

app.get('/board/:postid', async (req, res) => {
    const postID = req.params.postid;
    const conn = await getConn();
    const query = 'SELECT * FROM POST where post_id = ?';
    let [rows, fields] = await conn.query(query, [postID]);
    conn.release();

    res.send(rows);
});

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