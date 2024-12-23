import { Routes as ReactRouters, Route, Outlet } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import LoginSelect from '../pages/login/LoginSelect';
import LoginFinish from '../pages/login/LoginFinish';
import Redirection from '../pages/login/Redirection';
import StudentCeritifcation from '../pages/login/StudentCertification';
import BusinessCertification from '../pages/login/BusinessCertification';
import Strategy from '../pages/strategy/Strategy';
import FindCreator from '../pages/creator/FindCreator';
import Register from '../pages/creator/CreatorRegistration';
import ScrollToTop from '../hooks/ScrollUp';
import StrategyResult from '../pages/strategy/result/StrategyResult';
import Nav from '../components/common/Nav';
import Detail from '../pages/creator/DetailCreator';
import Mypage from '../pages/mypage/Mypage';

export default function Routes() {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="strategy" element={<Strategy />} />
        <Route path="strategy/result" element={<StrategyResult />} />
        <Route path="creator" element={<FindCreator />} />
        <Route path="login" element={<Login />} />
        <Route path="login-select" element={<LoginSelect />} />
        <Route path="login-finish" element={<LoginFinish />} />
        <Route path="redirect" element={<Redirection />} />
        <Route path="student" element={<StudentCeritifcation />} />
        <Route path="business" element={<BusinessCertification />} />
        <Route path="register" element={<Register />} />
        <Route path="creator/:nickname" element={<Detail />} />
        <Route path="mypage" element={<Mypage />} />
      </Route>
    </ReactRouters>
  );
}

const Layout = () => {
  return (
    <>
      <Nav />
      <ScrollToTop />
      <Outlet />
    </>
  );
};
