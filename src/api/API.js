export default class API {

  // constructor () {
  //   this.base = 'http://localhost:9393';
  // }
  

  static url(uri) {
    return `http://localhost:9393${uri}`;
  }

}
