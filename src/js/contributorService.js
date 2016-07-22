"use strict";

import md5 from 'md5';
import contribData from '../config/contributorsData';
import url from 'url';

let _instance;

class ContributorService {
  constructor(){
    //console.log('>>>>', );
    this.contributorsData = contribData.map((contrib)=>{
        return {...contrib, avatar: url.parse(location.href).protocol + "//gravatar.com/avatar/" + md5(contrib.email) + ".png?s=75"};
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
