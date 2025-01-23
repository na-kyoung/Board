// our-domain.com/modifyboard/[boardID]

import ModifyBoard from "@/components/board/ModifyBoard";
import { useRouter } from "next/router";

function ModifyPage(){
    const router = useRouter(); // 동적 라우팅

    const boardData = router.query;
    const boardID = router.query.boardID;
    // console.log(boardData);
    // console.log(boardID);

    function addBoardHandler(eneteredBoardData){
        console.log(eneteredBoardData);
    }

    return (
        <>
            <ModifyBoard modifyData={boardData} onModifyBoard={addBoardHandler} />
        </>
    )
}

export default ModifyPage;