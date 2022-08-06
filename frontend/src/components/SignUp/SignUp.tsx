import { useState } from "react";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    checkPassword: "",
  });

  const onChageInputs = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputs({ ...inputs, [name]: value });
  };
  const submit = () => {};

  return (
    <div className={styles.signup_container}>
      <h1>회원가입</h1>
      <div className={styles.signup}>
        <span className={styles.title}>이메일</span>
        <input
          name="email"
          className={styles.input}
          onChange={onChageInputs}
          type="text"
        />
        <span className={styles.title}>비밀번호</span>
        <input
          name="password"
          className={styles.input}
          onChange={onChageInputs}
          type="password"
        />
        <span className={styles.title}>비밀번호 확인</span>
        <input
          name="checkPassword"
          onChange={onChageInputs}
          className={styles.input}
          type="password"
        />
      </div>
      <button onClick={submit} className={styles.submit}>
        완료
      </button>
    </div>
  );
};

export default SignUp;
