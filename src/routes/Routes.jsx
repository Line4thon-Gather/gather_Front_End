import { Routes as ReactRouters, Route, Outlet } from 'react-router-dom';
import Home from '../pages/home/Home';
import Strategy from '../pages/strategy/Strategy';
import FindCreator from '../pages/creator/FindCreator';
import ScrollToTop from '../hooks/ScrollUp';

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
      <ScrollToTop />
      <Outlet />
    </>
  );
};
