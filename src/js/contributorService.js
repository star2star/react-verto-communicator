"use strict";

import md5 from 'md5';
import contribData from '../config/contributorsData';

let _instance;

class ContributorService {
  constructor(){
    this.contributorsData = contribData.map((contrib)=>{
        return {...contrib, avatar: "http://gravatar.com/avatar/" + md5(contrib.email) + ".png?s=75"};
    });

    //ContributorService.getContributors = ContributorService.getContributors.bind(this);
  }

  getContributors(){
    return this.contributorsData;
  }

  static getInstance() {
    if (!_instance) {
      _instance = new ContributorService();
    }

    return _instance;
  }

}

//exporting
export default ContributorService;
