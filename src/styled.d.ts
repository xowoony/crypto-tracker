// 여기서 속성을 추가해주면 theme.ts에도 똑같이 작성해주어야 한다.
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor:string;
    boxColor: string;
  }
}
