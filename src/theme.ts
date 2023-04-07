// 이곳에 테마를 작성함으로 인해 실수를 방지할 수 있다.
import { DefaultTheme } from "styled-components";

// 이 테마들은 styled.d.ts 파일 속 속성들과 같아야 한다.
// 작성해준 후 export 를 해준다.
export const darkTheme: DefaultTheme = {
  bgColor: "rgb(62 62 45)",
  textColor: "#f5f6fa",
  accentColor: "#e1b12c",
  boxColor:  "#2b281b"
}

export const lightTheme: DefaultTheme = {
  bgColor: "#c5c4b8",
  textColor: "black",
  accentColor: "#e1b12c",
  boxColor:  "rgb(173 167 141)"
};



