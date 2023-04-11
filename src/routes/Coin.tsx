import {
  PathMatch,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { Link } from "react-router-dom";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "react-query";

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
  font-weight: 600;
  margin-right: 2rem;
  color: ${(props) => props.theme.accentColor};
  @media screen and (max-width: 1090px) {
    font-size: 30px;
  }
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

const Symbol = styled.span`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #726919ed;
  color: white;
  padding: 1rem;
  height: 2rem;
  border-radius: 0.7rem;
`;

// Tab
const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 128px;

  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media screen {
    gap: 30px;
  }
`;

const InfoButton = styled(Symbol)<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive
      ? "rgba(114, 105, 25, 0.93);"
      : "#00000090;"}; // Active라면 accentColor를 theme에 적용;
  /* background-color: rgb(1 12 3 / 54%); */
  color: white;
  width: 22rem;
  height: 3rem;
  margin-bottom: 3rem;
  padding: 0;
  a {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;

  }
  &:hover {
    background-color: rgba(114, 105, 25, 0.93);
  }
  @media screen and (max-width: 1090px) {
    /* grid-template-columns: 1fr; */
    width: 100%;
  }
`;

const MaxSupply = styled.span`
  /* font-size: 1.3rem; */
  @media screen and (max-width: 1090px) {
    font-size: 1rem;
  }
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
  padding: 3.5rem;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 1090px) {
    padding: 0.5rem;
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
  b {
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
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  // coinId 뒤에 !
  // 확장 할당 어션셜로 값이 무조건 할당되어있다고 컴파일러에게 전달해
  // 값이 없어도 변수를 사용할 수 있게 한다
  // isLoading또한 이름이 공통이기 때문에 isLoading: infoLoading 이런식으로 이름을 바꾸는 작업을 하여 적어주도록 한다.
  // 리액트쿼리는 키를 배열로 감싸서 표현한다. 키가 coinId로 공통이 되면 안되기 때문에 아래와 같이 써준다.
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!)
  );

  /*  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await 
      (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData); 
      setLoading(false);
    })();
  }, [coinId]);
 */

  // 새로운 변수 만듦
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Header>
        <HomeButton>
          <Link to={`/`}>
            <Back className="material-symbols-outlined">arrow_back_ios</Back>
          </Link>
        </HomeButton>
        <LogoContainer>
          <Img src={infoData?.logo}></Img>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
          <Symbol>{infoData?.symbol}</Symbol>
        </LogoContainer>
      </Header>
      {loading ? (
        <Loader>로딩 중입니다...</Loader>
      ) : (
        <>
          <Overview>
            <DetailItem>
              <span>순위</span>
              <span>{infoData?.rank}</span>
            </DetailItem>
          </Overview>
          <Overview>
            <DetailItem>
              <span>총 공급량</span>
              <MaxSupply>{tickersData?.total_supply}</MaxSupply>
            </DetailItem>
            <DetailItem>
              <span>최대 공급량</span>
              <MaxSupply>{tickersData?.max_supply}</MaxSupply>
            </DetailItem>
          </Overview>
          <Description>
            <b>상세정보</b>
            {infoData?.description}
          </Description>
          <InfoContainer>
            <InfoButton isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>차트정보</Link>
            </InfoButton>
            <InfoButton isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>가격정보</Link>
            </InfoButton>
          </InfoContainer>

          {/* 중첩 라우팅*/}
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId!} />} />
            <Route path="price" element={<Price />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
