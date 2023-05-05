import {Injectable} from '@angular/core';
import Dexie from "dexie";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any;

  constructor() {
    this.db = new Dexie('voterDb');
    this.db.version(1).stores({
      allowedUsers: 'voterId, ssn, address'
    });
    // this.insertData({voterId: '123456789', ssn: '123456789'})
    // this.insertData({voterId: '1', ssn: '1'})
    // this.insertData({voterId: '2', ssn: '2'})
    // this.insertData({voterId: '123', ssn: '123'})
    // console.log('Database created')
  }

  insertData(obj: any) {
    this.db.table('allowedUsers').add(obj)
      .then((result: any) => {
        console.log(result);
      });
  }

  queryData(): Promise<any> {
    return this.db.table('allowedUsers').toArray()
  }

  verifyVoter(voterId: any, ssn: any, address: any): Promise<any> {
    return this.db.table('allowedUsers').where({voterId: voterId, ssn: ssn, address: address}).toArray()
      .then((result: any) => {
        if (result.length > 0) {
          return true;
        } else {
          return false;
        }
      });
  }

  deleteByVoterId(voterId: any) {
    return this.db.table('allowedUsers').where({voterId: voterId}).delete()
      .then((result: any) => {
        if (result) {
          return true;
        } else {
          return false;
        }
      });
  }
}
