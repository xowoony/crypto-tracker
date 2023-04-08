import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { Link } from "react-router-dom";

// 여기는 각각의 코인 페이지

const Container = styled.div`
  padding: 0px 20px;
  max-width: 900px;
  margin: 0px auto;
  // 화면을 크게 했을 때에도 모바일 화면처럼 가운데에 위치하게 됨
`;

const Header = styled.header`
  height: 15rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const HomeButton = styled.div`
  width: 5rem;
  height: 2.3rem;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LogoContainer = styled.div`
  width: 34.5rem;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 1rem;
  display: block;
`;

// detail
const Overview = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 1rem;
  padding: 1rem;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;
const DetailItem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

// description
const Description = styled.p`
  margin: 40px 0px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 600;
  div {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.accentColor};
  }
`;

const Back = styled.span`
  color: ${(props) => props.theme.textColor};
`;

// img 컴포넌트
const Img = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const Symbol = styled.span`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #726919ed;
  color: white;
  width: 5rem;
  margin-left: 2rem;
  height: 2rem;
  border-radius: 0.7rem;
`;

const InfoButton = styled(Symbol)`
  background-color: rgb(1 12 3 / 54%);
  color: white;
  width: 22rem;
  height: 3rem;
  &:hover {
    background-color: #00000090;
  }
`;

// 인터페이스
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
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams(); // coinId를 받아서 parameter로 사용
  const { state } = useLocation() as RouteState; // state 안에 있는 name을 가져오기 위한 작업
  // info state
  // useState<InfoData>(); 를 작성해줌으로써 타입스크립트는 info가 InfoData라고 인식
  const [info, setInfo] = useState<InfoData>();
  // priceInfo state
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  // useEffect - 컴포넌트가 생성될 때 한번만 실행됨
  useEffect(() => {
    // 캡슐화로 코드 한줄로 정리 - 이 한줄의 solution이 두개의 변수를 받는다.
    (async () => {
      // 2. 그 response로부터 json을 받는다.
      const infoData = await // 1. 여기에서 response를 받고
      (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();

      // 가격정보 데이터 받아오기
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      // setInfo, setPriceInfo
      setInfo(infoData); // infoData로 set
      setPriceInfo(priceData); // priceData로 set
      setLoading(false); // 로딩 후 false
    })();
  }, [coinId]); // hooks는 최선의 성능을 위해서는 적어주는 것이 좋다. coinId가 변하면 코드가 다시 실행된다.

  return (
    <Container>
      <Header>
        <HomeButton>
          <Link to={`/`}>
            <Back className="material-symbols-outlined">arrow_back_ios</Back>
          </Link>
        </HomeButton>
        <LogoContainer>
          <Img src={info?.logo}></Img>
          <Title>
            {/* loading ? "Loading..." : info?.name => 이부분은 홈페이지로부터 온게 아닌 경우 실행됨 */}
            {/* 뒤의 info 는 API로부터 받아오는 info Data 이다.*/}
            {/* home을 거쳐서 오지 않을 경우 state가 생성되지 않아서 앞부분은 실행 되지 못할 것임 */}
            {state?.name ? state.name : loading ? "Loading..." : info?.name}
          </Title>
          <Symbol>{info?.symbol}</Symbol>
        </LogoContainer>
      </Header>
      {loading ? (
        <Loader>로딩 중입니다...</Loader>
      ) : (
        <>
          <Overview>
            <DetailItem>
              <span>순위</span>
              <span>{info?.rank}</span>
            </DetailItem>
            <DetailItem>
              <span>시가총액</span>
              <span>{priceInfo?.quotes.USD.market_cap}</span>
            </DetailItem>
          </Overview>
          <Overview>
            <DetailItem>
              <span>총 공급량</span>
              <span>{priceInfo?.total_supply}</span>
            </DetailItem>
            <DetailItem>
              <span>최대 공급량</span>
              <span>{priceInfo?.max_supply}</span>
            </DetailItem>
          </Overview>
          <Description>
            <div>상세정보</div>
            {info?.description}
          </Description>
          {/* 중첩 라우팅 */}
          <Routes>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Routes>

          {/* <InfoContainer>
            <InfoButton>
              <Link to={`/${coinId}/chart`}>차트 정보 보러가기</Link>
            </InfoButton>
            <InfoButton>
              <Link to={`/${coinId}/price`}>가격 정보 보러가기</Link>
            </InfoButton>
          </InfoContainer> */}
        </>
      )}
    </Container>
  );
}

export default Coin;
