import AsyncStorage from '@react-native-community/async-storage';

import Attendance from './Attendance';
import api from '../services/api';

export default class Unit {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  async findAttendance(attendanceRef: string): Promise<Attendance> {
    return new Attendance(attendanceRef, await api.getAttendance(attendanceRef));
  }

  static async findAll(): Promise<Unit[]> {
    return (await api.getUnits()).map(u => new Unit(u.id, u.name));
  }

  async store(): Promise<void> {
    const o: Stored = { id: this.id, name: this.name }
    await AsyncStorage.setItem('unit', JSON.stringify(o));
  }

  static async load(): Promise<Unit> {
    const json: string = await AsyncStorage.getItem('unit');
    if (json) {
      const o: Stored = JSON.parse(json);
      return new Unit(o.id, o.name);
    } else {
      return null;
    }
  }
}

interface Stored {
  id: number;
  name: string;
}
