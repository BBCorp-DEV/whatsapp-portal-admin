// const url = "https://whatsapp.3pay.xyz"; //  main Staging
// const url = "https://1f9dq437-9000.inc1.devtunnels.ms"; //  main Staging
const url = "https://whatsapp.3pa-y.com"; //  main Staging
export const API_BASE_URL = "https://whatsapp.3pay.xyz"; // main Staging
const ApiConfig = {
  profile: `${url}/api/v1/auth/getProfile`,
  login: `${url}/api/v1/auth/login`,
  depositList: `${url}/api/v1/deposit/list`,
  withdrawalList: `${url}/api/v1/withdrawal/list`,
  transferList: `${url}/api/v1/transfer/list`,
  accountList: `${url}/api/v1/account/list`,
  createUser: `${url}/api/v1/user/create`,
  userList: `${url}/api/v1/user/list`,
  userUpdate: `${url}/api/v1/user/update`,
  userDelete: `${url}/api/v1/user/delete`,
  whatsAppList: `${url}/api/v1/whatsappUser/list`,
  errorList: `${url}/api/v1/crmApiLogs/list`,
  dashboardList: `${url}/api/v1/dashboard/stats`,
  
};
export default ApiConfig;
