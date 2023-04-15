// Switch 대신 Routes를 써주도록 한다. (버전관련 이슈)
// Routes 자식으로는 Route 밖에 올 수 없다.
// Route 자식으로 뭔가 올 수 없기 때문에 element로 추가해주도록 한다.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {

}

function Router({}: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={`/`} element={<Coins/>} />
        <Route path="/:coinId/*" element={<Coin/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
