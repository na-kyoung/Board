// our-domain.com/modifyboard/[boardID]

import ModifyBoard from "@/components/board/ModifyBoard";
import { useRouter } from "next/router";

function ModifyPage(){
  const router = useRouter(); // 동적 라우팅
  const boardData = router.query;

  return <ModifyBoard modifyData={boardData} /> ;

}

export default ModifyPage;