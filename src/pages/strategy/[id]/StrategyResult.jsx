import Loading from '../../../components/common/Loading';
import ResultHeader from '../../../components/strategy/ResultHeader';
import Chart from 'react-apexcharts';
import styles from '../../../styles/strategy/StrategyResult.module.css';
import { useState, useEffect } from 'react';
import domtoimage from 'dom-to-image-more';

export default function StrategyResult() {
  const chartId = 'strategy-chart';
  const [isLoading, setIsLoading] = useState(false);
  const [barPositions, setBarPositions] = useState([]);
  const number = 20;
  const [gap, setGap] = useState(0);
  // const chartRef = useRef(null); // 차트 부분을 참조하는 ref 생성
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [
          { x: 'Task A', y: [0, 6] },
          { x: 'Task B', y: [6, 10] },
          { x: 'Task C', y: [10, 13] },
          { x: 'Task D', y: [12, 17] },
          { x: 'Task E', y: [15, 20] },
        ],
      },
    ],
    options: {
      chart: {
        id: chartId,
        type: 'rangeBar',
        height: 1000,
        zoom: { enabled: false },
        toolbar: { show: false },
        background: 'white',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '24px',
          colors: {
            ranges: [
              { from: 1, to: number + 1, color: '#D0E8FF' }, // 홀수 색상
            ],
          },
        },
      },
      xaxis: {
        type: 'numeric',
        min: 0,
        max: number,
        tickAmount: number,
        labels: {
          rotate: -45,
          style: {
            fontSize: '12px',
            colors: '#ADB3BA',
            backgroundColor: '#ADB3BA',
            padding: 5,
            borderRadius: 3,
          },
          className: 'custom-xaxis-label',
        },
        position: 'top',
      },
      yaxis: {
        show: false,
        offsetY: 2,
      },
      grid: {
        borderColor: '#EAECEE',
        strokeDashArray: 0,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const data = w.globals.series[seriesIndex][dataPointIndex];
          const label = w.globals.labels[dataPointIndex];

          // HTML 형태의 커스텀 툴팁
          return `
            <div style="padding: 10px; color: #333; background: #fff; border: 1px solid #ccc;">
              <strong>${label}</strong>
              <p>Start: ${data[0]}</p>
              <p>End: ${data[1]}</p>
            </div>
          `;
        },
      },
    },
  });

  const saveChartAsImage = () => {
    // ApexCharts.exec(chartId, 'dataURI').then(({ imgURI }) => {
    //   const link = document.createElement('a');
    //   link.href = imgURI;
    //   link.download = 'chart.png';
    //   link.click();
    // });

    const element = document.getElementById('#chart');

    const style = {
      width: document.documentElement.scrollWidth + 'px', // 전체 너비로 설정
      height: document.documentElement.scrollHeight + 'px', // 전체 높이로 설정
    };

    domtoimage
      .toPng(element, { style })
      .then((dataUrl) => {
        // 이미지 다운로드
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'capture.png';
        link.click();
      })
      .catch((error) => {
        console.error('캡처 오류:', error);
      });
  };

  const calculateBarPositions = () => {
    const chartContainer = document.querySelector(`#apexchartsstrategy-chart`);
    const bars = document.querySelectorAll('.apexcharts-rangebar-area');

    const positions = Array.from(bars).map((bar) => {
      const { top, left, width, height } = bar.getBoundingClientRect();
      const containerRect = chartContainer.getBoundingClientRect();

      return {
        x: left - containerRect.left,
        y: top - containerRect.top,
        width,
        height,
      };
    });

    setBarPositions(positions);
  };

  const getXAxisTickLength = () => {
    const xAxisLabels = document.querySelectorAll('.apexcharts-xaxis-tick');

    if (xAxisLabels.length > 0) {
      const firstTick = xAxisLabels[1].getBoundingClientRect();
      const lastTick = xAxisLabels[2].getBoundingClientRect();

      const tickLength = Math.abs(lastTick.left - firstTick.right);
      setGap(tickLength - 15);
    }
    return 0;
  };

  useEffect(() => {
    getXAxisTickLength();
    calculateBarPositions();
  }, [isLoading]);

  if (isLoading) {
    return <Loading width="100vw" height="100vh" />;
  }

  return (
    <div className={styles.pageWrapper}>
      <div>
        <ResultHeader type="홍보 타임라인" title="멋쟁이 사자처럼 13기 모집" />
        <div className={styles.scrollable} id="#chart">
          <div className={styles.planHeader} style={{ gap: gap }}>
            {Array.from({ length: number + 1 }).map((_, index) => (
              <span key={index}>{index}</span>
            ))}
          </div>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="rangeBar"
            width={1000}
            height={800}
          />
          {/* 차트 위에 커스텀 바 그리기 */}
          {barPositions.map((pos, index) => (
            <div
              className={styles.descriptionBar}
              key={index}
              style={{
                position: 'absolute',
                left: `${pos.x}px`,
                top: `${pos.y + 30}px`,
                width: `${pos.width}px`,
                height: `${pos.height * 2}px`,
              }}
            >
              {chartData.series[0].data[index].y.join(' - ')}
            </div>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={saveChartAsImage}>타임라인 이미지로 저장하기</button>
        </div>
      </div>
    </div>
  );
}
