import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteDomain, Domain, Publisher, UpdateDomain } from './types';
import { Observable } from 'rxjs';

const URL = 'http://localhost:4300/api';
const publishersApi = URL + '/publishers';
const domainsApi = URL + '/domains';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  //Publisher functions
  getPublishers(): Observable<any> {
    return this.http.get<Array<Publisher>>(publishersApi);
  }

  addPublisher(newPublisher: Publisher): Observable<any> {
    return this.http.post(publishersApi, newPublisher);
  }

  deletePublisher(publisherName: string): Observable<any> {
    const url = publishersApi + `/${encodeURIComponent(publisherName)}`;
    return this.http.delete(url);
  }

  //Domain functions
  addDomain(newDomain: Domain): Observable<any> {
    return this.http.post(domainsApi, newDomain);
  }

  updateDomain(updateDomainFields: UpdateDomain): Observable<any> {
    return this.http.put(
      `${domainsApi}?domain=${encodeURIComponent(updateDomainFields.url)}`,
      updateDomainFields
    );
  }

  deleteDomain(deleteDomainFields: DeleteDomain): Observable<any> {
    const url = `${domainsApi}?publisherName=${encodeURIComponent(
      deleteDomainFields.publisherName
    )}&url=${encodeURIComponent(deleteDomainFields.url)}`;
    return this.http.delete(url);
  }
}
