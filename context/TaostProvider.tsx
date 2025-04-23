import Toast from 'react-native-toast-message';

import React, {useEffect, useState} from 'react';

const TaostProvider = ({children}) => {
  return <Toast>{children}</Toast>;
};

export default TaostProvider;
