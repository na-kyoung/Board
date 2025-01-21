// our-domain.com/newboard

import NewBoard from "@/components/NewBoard";

function NewBoardPage(){
    function addBoardHandler(eneteredBoardData){
        console.log(eneteredBoardData);
    }

    return <NewBoard onAddBoard={addBoardHandler} />
}

export default NewBoardPage;