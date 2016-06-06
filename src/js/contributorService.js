import md5 from 'md5';
import contribData from '../config/contributorsData';

class ContributorService {
  constructor(){
    //console.log('building CONTRIBUTOR SERVICE: <<<<<<<<<<<<<<<<');

    this.contibutorsData = contribData.map((contrib)=>{
      const avatar = "http://gravatar.com/avatar/" + md5(contrib.email) + ".png?s=75";
      let newContrib = {};
      newContrib = {...contrib, avatar: avatar};

      return newContrib;
    });

    ContributorService.getContributors = ContributorService.getContributors.bind(this);
  }

  static getContributors() {
    return this.contibutorsData;
  }

}

//exporting
export default ContributorService;
