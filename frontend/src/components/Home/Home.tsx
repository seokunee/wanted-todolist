import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>WELCOME MY TO DO LIST!</h1>
      <Link to="/login">
        <button className={styles.to_login}>Login</button>
      </Link>
    </div>
  );
};

export default Home;
