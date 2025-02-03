// our-domain.com/modifyboard/[boardID]

import ModifyBoard from "@/components/board/ModifyBoard";
import { useRouter } from "next/router";

function ModifyPage(){
    const router = useRouter(); // 동적 라우팅

    const boardData = router.query;
    const boardID = router.query.boardID;
    // console.log(boardData);
    // console.log(boardID);

    return (
        <>
            <ModifyBoard modifyData={boardData} />
        </>
    )
}

export default ModifyPage;