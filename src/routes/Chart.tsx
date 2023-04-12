import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

// data 타입 정의
interface IHistorical {
  // devTools의 Data Explorer 부분 탭을 클릭해보면 데이터가 있음 그걸 붙여넣으면 됨
  time_open: number;
  time_close: number;
  open: string; // 시작 가격
  high: string; // 하루의 가장 높은 가격
  low: string; // 하루의 가장 낮은 가격
  close: string; // 종가
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  // 여러개를 받아와야하므로 배열로!
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  // apex chart는 type에서 만들 수 있는 모든 차트 종류를 자동완성으로 보여줌
  // <ApexChart /> 안에 작성해주면 된다. type="자동완성으로 뜸 - 선택"
  // options 도 작성해주도록 한다.
  // 그다음 차트 데이터를 보내주어야 하는데 데이터는 series라는 prop에 다 들어있기 때문에
  // series 를 작성해준다.
  return (
    <div>
      {isLoading ? (
        "로딩 중입니다..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar:{show:false},
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder:{show:false},
              axisTicks: { show: false },
              labels:{show:false},
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
