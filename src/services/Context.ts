import React from 'react';

import Unit from '../model/Unit';
import Attendance from '../model/Attendance';

type Context = {
  unit: Unit;
  attendance: Attendance;
  document: Document;
  callerStopLoading: () => void;
}

export default React.createContext<Context>({
  unit: null,
  attendance: null,
  document: null,
  callerStopLoading: null,
});
