import {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  // 상수 선언, ES6문번의 구조 분해 할당
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    //console.log(authService.currentUser);
    //setIsLoggedIn(authService.currentUser);
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    }); // 이벤트 핸들러 - 인증 정보 변경되면 실행된다.
  }, []);
  
  // 현재 접속자 확인
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}></AppRouter> : "initializing ..." }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
