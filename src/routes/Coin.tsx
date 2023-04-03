import { useParams } from "react-router";

function Coin() {
  // react-router-dom v6 이상의 경우
  // useParams쓰는 순간 타입이 string or undefined로 설정됨.
  // 따라서 const {coinId} = useParams(); 로만 적어줘도 상관 ㄴ
  const { coinId } = useParams();

  return <h1>Coin: {coinId}</h1>;
}

export default Coin;
