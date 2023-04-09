import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SwitchTheme = styled.button`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 7rem;
  height: 3rem;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  margin: 1rem 3rem 1rem auto;
  color: white;
  background-color: rgb(157 132 25);
  &:hover {
    background-color: rgb(49 39 22);
  }
`;

const Container = styled.div`
  padding: 0px 20px;
  /* max-width: 900px; */
  margin: 0px auto;
  // 화면을 크게 했을 때에도 모바일 화면처럼 가운데에 위치하게 됨
`;

const Header = styled.header`
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem 2rem;
  padding: 3rem;
  @media screen and (max-width: 1090px) {
    grid-template-columns: 4fr;
    width: 100%;
    padding: 0;
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
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  font-size: 1rem;
  display: block;
`;

// img 컴포넌트
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// interface (API로부터 받아오는 정보도 적어주어야 한다.)
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(false);
  const onClick = () => setTheme((prev) => !prev); // 클릭시 반댓값 리턴
  // useEffect
  // 특정한 시기에만 코드를 실행하기 위해선useEffect를 사용하면 된다.
  // 마지막에 빈배열을 전달해주면 컴포넌트가 시작할 때 한번만 실행된다.
  useEffect(() => {
    // URL을 복사하여 fetch에 붙여준다.
    //위에는 async, 아래는 API의 response를 받기 위해 await을 사용
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json(); // 그런다음 response로부터 json을 받아옴
      setCoins(json.slice(0, 100)); // 처음부터 100번째까지 잘라서 반환
      setLoading(false);
    })();
  }, []);

  // console.log(coins);

  return (
    <Container>
      <Header>
        <Title>Thorn Coin</Title>
      </Header>
      <SwitchTheme onClick={onClick}>테마 변경</SwitchTheme>
      {/* 코인은 symbol, name 등등이 있다. */}
      {/* coin.name, coin.symbol 로 작성하여 불러올 수 있다 */}
      {/* &rarr 은 화살표이다. */}
      {/* 로딩중이면 문구 출력 로딩이 끝나면 코인리스트가 뜸. 코인 클릭시 해당 코인 상세 정보 보기로 넘어감. */}
      {loading ? (
        <Loader>로딩중입니다...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                {/* 코인의 로고 img태그에 src로 {}안 ``안에 작성한다. */}
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
