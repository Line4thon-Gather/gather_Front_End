import styles from '../../styles/home/HeaderInfo.module.css';
import infoImg from '../../assets/images/infoImg.png';

export default function HeaderInfo() {
  return (
    <header className={styles.headerInfo}>
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
          <img src={infoImg} loading="lazy" />
        </div>
      </div>
    </header>
  );
}
