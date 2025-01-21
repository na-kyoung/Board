// our-domain.com/modifyboard/[boardID]

import ModifyBoard from "@/components/ModifyBoard";
import { useRouter } from "next/router";

function ModifyPage(){
    const router = useRouter(); // 동적 라우팅

    const boardData = router.query;
    const boardID = router.query.boardID;
    console.log(boardData);
    console.log(boardID);

    function addBoardHandler(eneteredBoardData){
        console.log(eneteredBoardData);
    }

    return (
        <>
            <h2>ModifyPage</h2>
            <h3>{boardID}</h3>
            <ModifyBoard modifyData={boardData} onModifyBoard={addBoardHandler} />
        </>
    )
}

export default ModifyPage;