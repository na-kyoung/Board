import Link from 'next/link';
import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href='/'>Board</Link>
      </div>
      <div className={classes.new}>
          <Link href='/newboard'>New Board</Link>
      </div>
    </header>
  );
}

export default MainNavigation;
