// Switch 대신 Routes를 써주도록 한다. (버전관련 이슈)
// Routes 자식으로는 Route 밖에 올 수 없다.
// Route 자식으로 뭔가 올 수 없기 때문에 element로 추가해주도록 한다.
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* home - 코인들 */}
        <Route path={`/`} element={<Coins />} />
        {/* Coin ID - 해당 코인정보 */}
        <Route path={`/:coinId`} element={<Coin />} />
        {/* <Route path="chart" element={<Chart />} />
        <Route path="price" element={<Price />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
// 작성해주고 App.tsx로 가서 Router를 렌더링해준다.
