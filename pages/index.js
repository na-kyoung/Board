// our-domain.com/

import Link from "next/link";

function MainPage(){
  const boardID = 'test';

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Board</Link>
          </li>
          <li>
            <Link href='/newboard'>Add New Board</Link>
          </li>
        </ul>
      </nav>
      <h1>The MainPage</h1>
      <ul>
          <li>
              <Link href="/reactjs">ReactJS Is A Great Framework</Link>
          </li>
          <li>
              <Link href="/nextjs">NextJS Is A Great Framework</Link>
          </li>
          <li>
              <Link href={`/${boardID}`}>Testing...</Link>
          </li>
      </ul>
    </>
  );
}

export default MainPage;