import styles from '../../styles/home/Home.module.css';
import infoImg from '../../assets/images/infoImg.png';

export default function Home() {
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
    <div className={styles.pageWrapper}>
      <div className={styles.header} />
      <div className={styles.headerInfo}>
        <div className={styles.infoContent}>
          <div className={styles.infoText}>
            <div>꿈의 실현</div>
            <div>
              <span>한정된 자금 </span>
              <span>안에서</span>
            </div>
            <div>
              <span>최대한의 부가가치</span>
              <span>를 창출해요!</span>
            </div>
            <div>
              <span>
                아이디어가 풍부한 사회초년생들이 꿈을 실행하기 위해 크리에이터와
                연결되고
              </span>
              <span>
                인재를 영입할 수 있도록 지원함으로써 꿈을 실현하는데 필요한
                네트워크를 형성할 수 있게 합니다.
              </span>
            </div>
          </div>
          <div>
            <img src={infoImg} />
          </div>
        </div>
      </div>
      <div className={styles.bodySection}>
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
              <img src={'src/assets/images/homeImg' + (index + 1) + '.png'} />
            </div>
            <div className={styles.bodyText}>
              <img src={'src/assets/images/bodyText' + (index + 1) + '.png'} />
            </div>
            <span>{text.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
