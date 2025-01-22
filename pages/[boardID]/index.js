// our-domain.com/[boardID]

import Board from "@/components/board/Board";
import { useRouter } from "next/router";

const DUMMY_DATA = [
    {
        // boardID: 'm1',
        title: 'A First Board',
        writer: 'dddd',
        date: '2024-12-24',
        content: 'This is a first Board!'
    }
];

function DetailPage(){
    const router = useRouter(); // 동적 라우팅

    const boardID = router.query.boardID;
    // console.log(boardID);

    return (
        <>
            {/* <h2>DetailPage</h2>
            <h3>{boardID}</h3> */}
            <Board boardData={DUMMY_DATA} />
        </>
    )
}

export default DetailPage;