// our-domain.com/[boardID]

import Board from "@/components/board/Board";
import { useRouter } from "next/router";

function DetailPage(){
  const router = useRouter(); // 동적 라우팅

  return <Board /> ;
}

export default DetailPage;