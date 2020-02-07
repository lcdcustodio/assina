import AsyncStorage from '@react-native-community/async-storage';

import Attendance from './Attendance';
import api from '../services/api';

export default class Unit {

  public readonly id: number;
  public readonly name: string;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public async login(username: string, password: string): Promise<void> {
    await api.login(username, password, this.id);
  }

  public async findAttendance(attendanceRef: string): Promise<Attendance> {
    return new Attendance(attendanceRef, await api.getAttendance(attendanceRef));
  }

  public static async findAll(): Promise<Unit[]> {
    return (await api.getUnits()).map(u => new Unit(u.id, u.name));
  }

  public async store(): Promise<void> {
    const o: StoredUnit = { id: this.id, name: this.name }
    await AsyncStorage.setItem('unit', JSON.stringify(o));
  }

  public static async clear(): Promise<void> {
    await AsyncStorage.removeItem('unit');
  }

  public static async load(): Promise<Unit> {
    const json: string = await AsyncStorage.getItem('unit');
    if (json) {
      const o: StoredUnit = JSON.parse(json);
      return new Unit(o.id, o.name);
    } else {
      return null;
    }
  }
}

type StoredUnit = {
  id: number;
  name: string;
}
