import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PriceContainer = styled.div`
  align-items: center;
  display: grid;
  flex-direction: row;
  justify-content: center;
  grid-template-columns: repeat(8, 1fr);
  background-color: ${(props) => props.theme.accentColor};
  margin-bottom: 10rem;
  color: black;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 1rem;
  padding: 2rem;
`;

const PriceDetail = styled.div``;

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
    <PriceContainer>
      <PriceDetail>{priceInfo?.quotes.USD.ath_date}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.ath_price}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.market_cap}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.market_cap_change_24h}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_change_12h}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_change_15m}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_change_1h}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_change_1y}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_change_24h}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_change_30d}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_change_30m}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_change_6h}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_change_7d}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.percent_from_price_ath}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.price}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.volume_24h}</PriceDetail>
      <PriceDetail>{priceInfo?.quotes.USD.volume_24h_change_24h}</PriceDetail>
    </PriceContainer>
  );
}

export default Price;
