import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "a" && password === "a") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/"); // トップページにリダイレクト
    } else {
      alert("ログイン情報が間違っています");
    }
  };

  return (
    <div style={{ flexGrow: 1, marginLeft: "250px", padding: "24px" }}>
      <h1>ログイン</h1>
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default LoginPage;
