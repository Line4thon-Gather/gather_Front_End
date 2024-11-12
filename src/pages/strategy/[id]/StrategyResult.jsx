import Loading from '../../../components/common/Loading';
import styles from '../../../styles/strategy/StrategyResult.module.css';
import TimeLine from '../../../components/strategy/TimeLine';
import Cost from '../../../components/strategy/Cost';
import Footer from '../../../components/home/Footer';
import Creator from '../../../components/strategy/Creator';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { postData } from '../../../hooks/useAxios';

export default function StrategyResult() {
  const location = useLocation();
  const formInfo = location.state;
  console.log(formInfo);

  const { data, isLoading } = useQuery({
    queryKey: ['timeline', formInfo], // formInfo를 queryKey에 추가하여 변경사항 감지
    queryFn: () => postData(formInfo),
    refetchOnWindowFocus: false,
    enabled: !!formInfo, // formInfo가 있을 때만 실행
  });

  return !isLoading ? (
    <div className={styles.pageWrapper}>
      <TimeLine data={data} />
      <Cost />
      <Creator />
      <Footer />
    </div>
  ) : (
    <Loading width="100vw" height="100vh" />
  );
}
