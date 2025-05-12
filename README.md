## Board 게시판
- NextJS 페이지 라우팅 (동적 경로)
- 다중 파일 업로드
- 댓글/대댓글 기능

<br />

### Start
```bash
-- FE (/)
npm run dev

-- BE (/backend)
node api.js
```
- http://localhost:3000/ - 메인 페이지 (게시판 리스트)
- http://localhost:3000/[boardID] - 글 상세 페이지 (동적 경로)
- http://localhost:3000/mopdifyboard/[boardID] - 글 수정 페이지 (동적 경로)
- http://localhost:3000/newboard - 새 글 작성 페이지
