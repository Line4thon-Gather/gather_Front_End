import styles from '../../styles/strategy/StrategyResult.module.css';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisTop } from '@visx/axis';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { Text } from '@visx/text';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { handleSaveChartAsImage } from '../../hooks/useStrategy';
import PropTypes from 'prop-types';
import ResultHeader from '../strategy/ResultHeader';
import { useLocation } from 'react-router-dom';

export default function TimeLine({ data }) {
  const { showTooltip, hideTooltip, tooltipData, tooltipTop, tooltipLeft } =
    useTooltip();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });

  const location = useLocation();
  const formInfo = location.state;

  const headerData = {
    period: formInfo.period,
    budget: formInfo.budget,
    target: formInfo.targetNumberOfPeople,
  };

  // const data = [
  //   {
  //     period: 31,
  //     category: 'VIDEO',
  //     tasks: [
  //       { name: '예산 확정/기획', start: 0, end: 1 },
  //       { name: '제작사 선정', start: 1, end: 2 },
  //       { name: '협의', start: 2, end: 3 },
  //       { name: '촬영', start: 3, end: 6 },
  //       { name: '게시_틱톡', start: 6, end: 13 },
  //       { name: '게시_유튜브', start: 6, end: 13 },
  //       { name: '게시_인스타', start: 6, end: 13, tip: 'adsdds' },
  //     ],
  //   },
  //   {
  //     period: 13,
  //     category: 'SNS_POST',
  //     tasks: [
  //       { name: '기획', start: 0, end: 1 },
  //       { name: '디자인', start: 1, end: 4 },
  //       { name: '출력', start: 4, end: 5 },
  //       { name: '게시요청_캠퍼스픽', start: 5, end: 6 },
  //       { name: '승인기간_캠퍼스픽', start: 6, end: 8 },
  //       { name: '최종게시_캠퍼스픽', start: 8, end: 13 },
  //       { name: '게시_요즘것들', start: 5, end: 13 },
  //       { name: '게시_인스타그램', start: 5, end: 13 },
  //     ],
  //   },
  //   {
  //     period: 13,
  //     category: 'PRINTS',
  //     tasks: [
  //       { name: '기획', start: 0, end: 1 },
  //       { name: '디자인', start: 1, end: 4 },
  //       { name: '출력', start: 4, end: 5 },
  //       { name: '게시요청_캠퍼스픽', start: 5, end: 6 },
  //       { name: '승인기간_캠퍼스픽', start: 6, end: 8 },
  //       { name: '최종게시_캠퍼스픽', start: 8, end: 13 },
  //       { name: '게시_요즘것들', start: 8, end: 13 },
  //       { name: '게시_인스타그램', start: 8, end: 13 },
  //     ],
  //   },
  // ];

  const countPostedTasks = data
    ? data
        .flatMap((d) => d.tasks)
        .filter((task) => task.name.startsWith('게시_')).length
    : 0;

  const barWidth = 40;
  const barGap = 100;

  const flatTasks = data
    ? data.flatMap((d) => {
        let isFirst = true;
        return d.tasks.map((task) => ({
          ...task,
          category: d.category,
          yPosition:
            task.name.startsWith('게시_') && !isFirst
              ? `${d.category}-${task.name}`
              : d.category,
          isFirst:
            isFirst && task.name.startsWith('게시_')
              ? (isFirst = false)
              : false,
        }));
      })
    : [];

  const xScale = scaleLinear({
    domain: [0, data && data[0].period > 20 ? data[0].period + 1 : 21],
    range: [
      0,
      data && data[0].period > 20
        ? (data[0].period + 1) * barWidth
        : 21 * barWidth,
    ],
  });

  const yScale = scaleBand({
    domain: data
      ? Array.from(new Set(flatTasks.map((task) => task.yPosition)))
      : [],
    range: [0, countPostedTasks * barGap + 1],
    padding: 0.3,
  });

  return (
    <div>
      <ResultHeader
        type="홍보 타임라인"
        title="멋쟁이 사자처럼 13기 모집"
        data={headerData}
      />
      <div className={styles.timeLine} id="timeLine">
        <svg
          ref={containerRef}
          width={
            data && data[0].period > 20
              ? (data[0].period + 1) * barWidth + 30
              : barWidth * 21 + 40
          }
          height={countPostedTasks > 4 ? barGap * countPostedTasks : '400px'}
        >
          <rect
            x="0"
            y="30" // x축 아래부터 시작
            width={
              data && data[0].period > 20
                ? (data[0].period + 1) * barWidth + 30
                : 21 * barWidth + 40
            }
            height={countPostedTasks > 4 ? barGap * countPostedTasks : 400 - 30} // x축을 제외한 영역의 높이
            fill="white" // 원하는 배경색
          />
          <Group left={10} top={30}>
            <rect
              x="-10"
              y="-38"
              width={
                data && data[0].period > 20
                  ? (data[0].period + 1) * barWidth + 30
                  : 21 * barWidth + 40
              }
              height={38}
              fill="var(--grayscale-200)"
            />
            {data && (
              <AxisTop
                top={0}
                scale={xScale}
                tickFormat={(v) => `${v}`}
                tickLength={0}
                hideAxisLine={true}
                tickValues={Array.from(
                  { length: data[0].period > 20 ? data[0].period + 2 : 22 },
                  (_, i) => i
                )}
                numTicks={data[0].period}
                tickComponent={({ x, y, formattedValue }) => (
                  <>
                    <line
                      x1={x}
                      y1={y}
                      x2={x}
                      y2={countPostedTasks * barGap}
                      stroke="var(--grayscale-300)"
                      strokeWidth={1}
                    />
                    {/* 검은색 동그라미 배경 */}
                    {formattedValue === `${data[0].period}` && (
                      <circle cx={x} cy={y - 14} r={12} fill="black" />
                    )}
                    <text
                      x={x}
                      y={y - 10}
                      fontSize={12}
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={
                        formattedValue === `${data[0].period}`
                          ? 'white'
                          : 'var(--grayscale-600)'
                      }
                    >
                      {formattedValue}
                    </text>
                  </>
                )}
              />
            )}
            {flatTasks.map((task, j) => (
              <Group
                key={`task-${task.yPosition}-${j}`}
                top={yScale(task.yPosition)}
                onMouseLeave={hideTooltip}
                onMouseMove={(event) => {
                  const coords = localPoint(event.currentTarget, event);
                  const tooltipX =
                    xScale(task.start) +
                    (barWidth * (task.end - task.start)) / 2;
                  const tooltipY = coords?.y || yScale(task.yPosition) + 30;

                  showTooltip({
                    tooltipData: task,
                    tooltipLeft: coords?.x || tooltipX,
                    tooltipTop: tooltipY,
                  });
                }}
              >
                <Bar
                  x={xScale(task.start) + 0.5}
                  width={barWidth * (task.end - task.start) - 0.5}
                  height={43}
                  fill={
                    task.category === 'VIDEO'
                      ? '#FFCEBC'
                      : task.category === 'SNS_POST'
                      ? '#D3C5FF'
                      : '#C1EEC0'
                  }
                  rx={8}
                />
                <Text
                  x={xScale(task.start) + 9}
                  y={21.5}
                  fontSize={14}
                  fontWeight="bold"
                  fill={
                    task.category === 'VIDEO'
                      ? '#FF6B32'
                      : task.category === 'SNS_POST'
                      ? '#906BFF'
                      : '#32854B'
                  }
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    width: '50%',
                  }}
                  dy=".33em"
                >
                  {task.name}
                </Text>
                {task.name.startsWith('게시_') && (
                  <>
                    {/* 시작 말풍선 */}
                    <Group>
                      <rect
                        x={xScale(task.start) + 5 - 15 + 10}
                        y={-20}
                        width={48}
                        height={21}
                        fill="black"
                        rx={10}
                      />
                      <text
                        x={xScale(task.start) + 23}
                        y={-7}
                        fontSize={12}
                        fontWeight="bold"
                        textAnchor="middle"
                        fill="white"
                      >
                        start
                      </text>
                    </Group>

                    {/* 끝 말풍선 */}
                    <Group>
                      <rect
                        x={xScale(task.end)}
                        y={-20}
                        width={48}
                        height={21}
                        fill="white"
                        rx={10}
                        stroke="black"
                        strokeWidth={1}
                      />
                      <text
                        x={xScale(task.end) + 4 + 20}
                        y={-7}
                        fontSize={12}
                        fontWeight="bold"
                        textAnchor="middle"
                        fill="black"
                      >
                        end
                      </text>
                    </Group>
                  </>
                )}
              </Group>
            ))}
          </Group>
        </svg>
        {tooltipData && (
          <TooltipInPortal
            left={tooltipLeft}
            top={tooltipTop}
            style={{
              width: '264px',
              height: 'auto',
              position: 'absolute',
              backgroundColor: 'white',
              color: 'black',
              padding: '9px',
              borderRadius: '8px',
              boxSizing: 'border-box',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor:
                tooltipData.category === 'VIDEO'
                  ? '#FF6B32'
                  : tooltipData.category === 'SNS_POST'
                  ? '#906BFF'
                  : '#32854B',
            }}
          >
            <div className={styles.toolTip}>
              <span>{tooltipData.name}</span>
              <div>
                <img src="/calendar.png" />
                <span>
                  {tooltipData.start}일 차 - {tooltipData.end}일 차
                </span>
              </div>
              <div>
                <img src="/tip.png" />
                <span>{tooltipData.tip}</span>
              </div>
            </div>
          </TooltipInPortal>
        )}
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleSaveChartAsImage}>
          타임라인 이미지로 저장하기
        </button>
      </div>
    </div>
  );
}

TimeLine.propTypes = {
  data: PropTypes.array,
};
