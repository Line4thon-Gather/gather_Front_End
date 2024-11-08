import React from 'react';
import DetailTop from '../../components/creator/DetailTop';
import Nav from '../../components/common/Nav';
import TabSliderMenu from '../../components/creator/TabSliderMenu';

const DetailCreator = () => {
  return (
    <div>
      <DetailTop />
      <div style={{ backgroundColor: '#F6F8F9', marginTop: '40px' }}>
        <TabSliderMenu />
      </div>
    </div>
  );
};

export default DetailCreator;
