import { Config } from './appConfig';

const WEB_BASE_URL = Config.Production ? Config.WebURlProduction : Config.WebURlLocal;
const API_BASE_URL = Config.Production ? Config.APIsURLProduction : Config.APIsURLLocal;
const API_URL = {
  /**
   * Set all the URLs here in the below provided format
   * key: { url: '', endPoint: '' },
   */
  login: { url: 'login', endPoint: 'auth', method: 'POST' },
  getUserData: { url: '', endPoint: 'user', method: 'GET' },
};
export { WEB_BASE_URL, API_BASE_URL, API_URL }