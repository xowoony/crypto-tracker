// 이곳에 테마를 작성함으로 인해 실수를 방지할 수 있다.
import { DefaultTheme } from "styled-components";

// 이 테마들은 styled.d.ts 파일 속 속성들과 같아야 한다.
// 작성해준 후 export 를 해준다.
export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  btnColor: "red",
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
  btnColor: "blue",
};
