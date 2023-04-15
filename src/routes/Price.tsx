import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PriceContainer = styled.div`
  width: 100%;
  max-width: 700px;
  align-items: center;
  display: grid;
  flex-direction: row;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgb(195 178 93 / 17%);
  margin-bottom: 10rem;
  color: ${(props) => props.theme.textColor};
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 1rem;
  padding: 2rem;
`;
const TotalContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1.5rem;
`;

const PriceDetail = styled.div`
  font-size: 0.8rem;
  padding: 0.5rem;
  div {
    margin-bottom: 0.2rem;
    font-size: 1rem;
    color: rgb(161 150 51);
  }
`;

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
      market_cap: number; // 시가 총액
      market_cap_change_24h: number; // 시가총액 변동률
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
      price: number; // 현재 시세
      volume_24h: number; // 지난 24시간 거래량
      volume_24h_change_24h: number; // 지난 24시간 거래 변동률
    };
  };
}

function Price() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <TotalContainer>
      <PriceContainer>
        <PriceDetail>
          <div>가격(달러)</div>$ {priceInfo?.quotes.USD.price.toFixed(2)}
        </PriceDetail>
        <PriceDetail>
          <div>거래량 (24h)</div>
          {priceInfo?.quotes.USD.volume_24h.toFixed(2)}
        </PriceDetail>
        <PriceDetail>
          <div>거래량 변동 % (24h)</div>
          {priceInfo?.quotes.USD.volume_24h_change_24h}%
        </PriceDetail>
        <PriceDetail>
          <div>시가총액</div>
          {priceInfo?.quotes.USD.market_cap}
        </PriceDetail>
        <PriceDetail>
          <div>시가총액 변동 % (24h)</div>
          {priceInfo?.quotes.USD.market_cap_change_24h}%
        </PriceDetail>
        <PriceDetail>
          <div>변동% (12h)</div>
          {priceInfo?.quotes.USD.percent_change_12h}%
        </PriceDetail>
        <PriceDetail>
          <div>변동% (7d)</div>
          {priceInfo?.quotes.USD.percent_change_7d}%
        </PriceDetail>
      </PriceContainer>
    </TotalContainer>
  );
}

export default Price;
