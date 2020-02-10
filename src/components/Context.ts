import React from 'react';

import Unit from '../model/Unit';
import Attendance from '../model/Attendance';
import Document from '../model/Document';

type ContextType = {
  environment: string,
  unit: Unit;
  attendance: Attendance;
  document: Document;
  callerStopLoading: () => void;
}

export default React.createContext<ContextType>({
  environment: null,
  unit: null,
  attendance: null,
  document: null,
  callerStopLoading: null,
});
