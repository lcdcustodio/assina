import React from 'react';

import Unit from '../model/Unit';
import Attendance from '../model/Attendance';

type ContextType = {
  unit: Unit;
  attendance: Attendance;
  document: Document;
  callerStopLoading: () => void;
}

export default React.createContext<ContextType>({
  unit: null,
  attendance: null,
  document: null,
  callerStopLoading: null,
});
