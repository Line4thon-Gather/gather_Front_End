import { Routes as ReactRouters, Route, Outlet } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import LoginSelect from '../pages/login/LoginSelect';
import Redirection from '../pages/login/Redirection';
import StudentCeritifcation from '../pages/login/StudentCertification';
import BusinessCertification from '../pages/login/BusinessCertification';
import Strategy from '../pages/strategy/Strategy';
import FindCreator from '../pages/creator/FindCreator';
import Register from '../pages/creator/CreatorRegistration';
import ScrollToTop from '../hooks/ScrollUp';
import Nav from '../components/common/Nav';
import Datail from '../pages/creator/DetailCreator';

export default function Routes() {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="strategy" element={<Strategy />} />
        <Route path="creator" element={<FindCreator />} />
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
