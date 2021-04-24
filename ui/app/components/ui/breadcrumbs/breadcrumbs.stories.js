import React from 'react';
import Breadcrumbs from './breadcrumbs.component';


export default {
  title: 'Breadcrumbs',
};

export const breadCrumbs = () => {
  return (
      <Breadcrumbs currentIndex={0} total={3} />
  );
}
