import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchDataService {
  branches: [];
  branch: any;

  constructor(private http:HttpClient) { }

  setBranches(data) {
    this.branches = data;
  }

  getBranches() {
    return this.http.get('./assets/data/branch.json');
  }

  setBranch(data) {
    this.branch = data;
  }

  getBranch() {
    return this.branch;
  }

}