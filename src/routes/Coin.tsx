import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

// 여기는 각각의 코인 페이지

const Container = styled.div`
  padding: 0px 20px;
  max-width: 700px;
  margin: 0 auto;
  // 화면을 크게 했을 때에도 모바일 화면처럼 가운데에 위치하게 됨
`;

const Header = styled.header`
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  font-size: 38px;
  display: block;
`;

interface RouteState {
  state: {
    name: string;
  };
}

// ITag 인터페이스
interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

// 쉼표 드래그 후 ctrl+D 계속 누르면 쉼표가 하나씩 선택됨
// 그다음 전체 드래그 후 alt+shift+i 누르면 문자 맨 끝에 커서가 이동해 깜빡임
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  // react-router-dom v6 이상의 경우
  // useParams쓰는 순간 타입이 string or undefined로 설정됨.
  // 따라서 const {coinId} = useParams(); 로만 적어줘도 상관 ㄴ
  const { coinId } = useParams(); // coinId를 받아서 parameter로 사용
  const [loading, setLoading] = useState(true);
  // state 안에 있는 name을 가져오기 위한 작업
  const { state } = useLocation() as RouteState;

  // info state
  // useState<InfoData>({}); 를 작성해줌으로써 타입스크립트는 info가 InfoData라고 인식
  const [info, setInfo] = useState({});

  // priceInfo state
  const [priceInfo, setPriceInfo] = useState({});

  // useEffect - 컴포넌트가 생성될 때 한번만 실행됨
  useEffect(() => {
    // 캡슐화로 코드 한줄로 정리 - 이 한줄의 solution이 두개의 변수를 받는다.
    (async () => {
      // 2. 그 response로부터 json을 받는다.
      const infoData = await // 1. 여기에서 response를 받고
      (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      console.log(infoData);

      // 가격정보 데이터 받아오기
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);

      // setInfo, setPriceInfo
      setInfo(infoData); // infoData로 set
      setPriceInfo(priceData); // priceData로 set
    })();
  }, []);

  return (
    <Container>
      <Header>
        {/* /coinID 로 바로 접속하면 시크릿모드에서 에러가 나는데 */}
        {/* 그것은 home을 거쳐서 오지 않았기 때문에 state가 생성되지 않기 때문이다 */}
        {/* ?를 붙여서 state가 존재하면 name을 가져오고, 아니라면 로딩중이라는 문구가 표시되게 함*/}
        <Title>{state?.name || "로딩 중입니다..."}</Title>
      </Header>
      {loading ? <Loader>로딩중입니다...</Loader> : null}
    </Container>
  );
}

export default Coin;
