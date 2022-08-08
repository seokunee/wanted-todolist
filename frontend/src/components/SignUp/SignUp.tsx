import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    checkPassword: "",
  });

  const [token, setToken] = useState<string>("");
  const onChageInputs = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputs({ ...inputs, [name]: value });
  };

  const createUser = async () => {
    try {
      await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => setToken(data));
    } catch {
      console.error("signup error!");
    }
  };

  const submit = () => {
    const emailRegExp = /[0-9a-zA-Z._+-]+@[0-9a-zA-Z-]+\.[0-9a-zA-Z.]+/i;
    const passwordRegExp = /^[A-Za-z0-9]{8,}$/;
    if (
      emailRegExp.test(inputs.email) === true &&
      passwordRegExp.test(inputs.password) === true &&
      inputs.checkPassword === inputs.password
    ) {
      createUser();
    } else {
      alert("올바른 아이디, 비밀번호가 아닙니다.");
    }
  };

  return (
    <div className={styles.signup_container}>
      <h1>회원가입</h1>
      <div className={styles.signup}>
        <span className={styles.title}>이메일(@,. 포함)</span>
        <input
          name="email"
          className={styles.input}
          onChange={onChageInputs}
          value={inputs.email}
          type="text"
        />
        <span className={styles.title}>비밀번호 (8자리 이상)</span>
        <input
          name="password"
          className={styles.input}
          onChange={onChageInputs}
          value={inputs.password}
          type="password"
        />
        <span className={styles.title}>비밀번호 확인</span>
        <input
          name="checkPassword"
          onChange={onChageInputs}
          className={styles.input}
          value={inputs.checkPassword}
          type="password"
        />
      </div>
      <div className={styles.submit_container}>
        <Link to="/login">
          <button className={styles.submit}>이전</button>
        </Link>
        <button onClick={submit} className={styles.submit}>
          완료
        </button>
      </div>
    </div>
  );
};

export default SignUp;
