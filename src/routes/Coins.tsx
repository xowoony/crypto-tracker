import styled from "styled-components";

const Container = styled.div``;

const Header = styled.header``;

const CoinsList = styled.ul``;

const Coin = styled.li``;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

// Coins array
const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

function Coins() {
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {/* 코인은 symbol, name 등등이 있다. */}
      {/* coin.name, coin.symbol 로 작성하여 불러올 수 있다 */}
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>{coin.name}</Coin>
        ))}
      </CoinsList>
    </Container>
  );
}

export default Coins;
