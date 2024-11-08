import { Routes as ReactRouters, Route, Outlet } from 'react-router-dom';
import Home from '../pages/home/Home';
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
        <Route path="register" element={<Register />} />{' '}
        <Route path="detail" element={<Datail />} />
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
