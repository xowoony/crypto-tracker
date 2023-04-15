import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  /* padding: 0px 20px; */
  /* max-width: 900px; */
  margin: 0px auto;
  // 화면을 크게 했을 때에도 모바일 화면처럼 가운데에 위치하게 됨
`;

const Header = styled.header`
  width: 100%;
  position: fixed;
  height: 15rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  background-color: rgb(31 25 2 / 36%);
  @media screen and (max-width: 1090px) {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem 2rem;
  padding: 8rem 2rem;
  @media screen and (max-width: 1090px) {
    grid-template-columns: 4fr;
    width: 100%;
    
  }
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: rgb(255 255 255);
  border-radius: 15px;
  margin-bottom: 10px;
  font-weight: 600;
  a {
    height: 7rem;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    align-items: center;
    display: flex;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  // react router link들이 결국 anchor로 바뀐다.
  &:hover {
    transform: translateY(-3px);
    transition: 0.2s ease-in;
    a {
      color: ${(props) => props.theme.accentColor};
      background-color: #7e853a46;
      border-radius: 15px;
    }
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-left: 5rem;

  color: ${(props) => props.theme.accentColor};
  @media screen and (max-width: 1090px) {
    margin-left: 0rem;
    margin-bottom: 0.2rem;
  }
`;

const Loader = styled.div`
  text-align: center;
  font-size: 1rem;
  display: block;
  margin-top: 3rem;
`;

// img 컴포넌트
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const SubTitle = styled.span`
  margin-left: 5rem;
  color: rgb(222 220 220);
  @media screen and (max-width: 1090px) {
    margin-left: 0px;
  }
`;

const ThemeContainer = styled.div`
  margin-left: auto;
  @media screen and (max-width: 1090px) {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    /* height: 100%; */
    position: absolute;
    margin-right: 3rem;
  }
`;

const ThemeButton = styled.button`
  width: 5rem;
  height: 2rem;
  background-color: #00000052;
  color: white;
  margin-left: auto;
  margin-right: 5rem;
  border: 0.0625rem solid rgba(255, 255, 255, 0.24);
  border-radius: 0.3rem;
  cursor: pointer;
  @media screen and (max-width: 1090px) {
    position: absolute;
    margin-right: 0;
    width: 3.5rem;
    font-size: 0.5rem;
    height: 2rem;
  }
`;
// interface (API로부터 받아오는 정보도 적어주어야 한다.)
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {}

function Coins() {
  // useQuery를 통해 Coins 를 fetch
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // 버튼누르면 state가 변경되고 theme을 변경시키기 위한 useSetRecoilState();
  // setter function은 value를 설정(set) 하는 function이다.
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Container>
      <Helmet>
        <title>Thorn Coin</title>
      </Helmet>
      <Header>
        <Link to={"/"}>
          <Title>Thorn Coin</Title>
        </Link>
        <SubTitle>Grab Your Own Coin!</SubTitle>
        <ThemeContainer>
          <ThemeButton onClick={toggleDarkAtom}>테마변경</ThemeButton>
        </ThemeContainer>
      </Header>
      {isLoading ? (
        <Loader>로딩중입니다...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt=""
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
