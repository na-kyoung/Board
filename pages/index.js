// our-domain.com/

import MainBoard from "@/components/board/MainBoard";

function MainPage(props){
  return <MainBoard boards={props.boards} /> ;
}

// SSR
export async function getServerSideProps(context){
  const res = await fetch(`http://localhost:5000/board`);
  const data = await res.json();

  return {
    props: {
      boards: data
    }
  };
}

export default MainPage;