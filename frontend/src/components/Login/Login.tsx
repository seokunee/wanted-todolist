import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.body}>
      <h1>LOGIN</h1>
      <div className={styles.login_box}>
        <input className={styles.input} type="text" />
        <input className={styles.input} type="password" />
        <div className={styles.btn_container}>
          <button className={styles.signin_btn}>로그인</button>
          <Link to="/login/create">
            <button className={styles.signup_btn}>회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
