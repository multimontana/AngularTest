import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITableDataModel} from '../models/table-data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getTableData() {
    return this.http.get<ITableDataModel[]>('http://www.filltext.com/?rows=1000&id={number|1000}&' +
      'firstName={firstName}&delay=3&lastName={lastName}&email={email}&' +
      'phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
  }

}
