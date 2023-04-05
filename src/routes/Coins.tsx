import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};

  border-radius: 15px;
  margin-bottom: 10px;
  font-weight: 600;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
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
  color: ${(props) => props.theme.accentColor};
`;

// interface(API로부터 받아오는 정보도 적어주어야 한다.)
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
  // useEffect
  // 특정한 시기에만 코드를 실행하기 위해선useEffect를 사용하면 된다.
  // 마지막에 빈배열을 전달해주면 컴포넌트가 시작할 때 한번만 실행된다.
  useEffect(() => {
    // URL을 복사하여 fetch에 붙여준다.
    //위에는 async, 아래는 API의 response를 받기 위해 await을 사용
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json(); // 그런다음 response로부터 json을 받아옴
      console.log(json);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {/* 코인은 symbol, name 등등이 있다. */}
      {/* coin.name, coin.symbol 로 작성하여 불러올 수 있다 */}
      {/* &rarr 은 화살표이다. */}
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
}

export default Coins;
