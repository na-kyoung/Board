// our-domain.com/

import Link from "next/link";

function MainPage(){
  const boardID = 'test';

  return (
    <>
      <h1>The MainPage</h1>
      <ul>
          <li>
              <Link href="/1">ReactJS Is A Great Framework</Link>
          </li>
          <li>
              <Link href="/2">NextJS Is A Great Framework</Link>
          </li>
          <li>
              <Link href={`/${boardID}`}>Testing...</Link>
          </li>
      </ul>
    </>
  );
}

export default MainPage;