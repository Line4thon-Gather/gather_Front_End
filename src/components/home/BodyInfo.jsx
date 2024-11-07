import styles from '../../styles/home/BodyInfo.module.css';

export default function BodyInfo() {
  const bodyImgText = [
    {
      title: '효과적인',
      title2: '홍보 타임라인',
      text: '홍보기간, 보유 예산, 목표 인원 등 몇 가지 정보만 입력하면 적절한 홍보 타임라인을 제공합니다.',
    },
    {
      title: '한정된 자금 내',
      title2: '예산 계획',
      text: '낭비되는 예산 없이 최소한의 자금으로 최고의 효과를 낼 수 있도록 예산 사용안을 제시해줍니다.',
    },
    {
      title: '크리에이터와',
      title2: '연결',
      text: '한정된 예산 안에서 작업물을 제작할 수 있도록 사회초년생 크리에이터를 추천해줍니다.',
    },
  ];

  return (
    <article className={styles.bodySection}>
      <div className={styles.bodyHeader}>
        <div>딱 맞는 전략</div>
        <div>
          <span>딱 맞는 </span>
          <span>홍보 전략</span>
          <span>을 세워드려요!</span>
        </div>
        <div>
          <span>
            홍보 일정, 보유한 예산, 제작하고 싶은 홍보물의 종류만 선택하면
            여러분에게 딱 맞는 홍보 전략을 제공합니다.
          </span>
          <span>홍보물 제작에 필요한 크리에이터와도 연결해드려요!</span>
        </div>
      </div>
      {bodyImgText.map((text, index) => (
        <div key={index} className={styles.bodyImgWrapper}>
          <div className={styles.bodyImg}>
            <img src={'homeImg' + (index + 1) + '.png'} loading="lazy" />
          </div>
          <div className={styles.bodyText}>
            <img src={'bodyText' + (index + 1) + '.png'} loading="lazy" />
          </div>
          <span>{text.text}</span>
        </div>
      ))}
    </article>
  );
}
