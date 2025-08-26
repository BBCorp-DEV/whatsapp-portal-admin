//Staging URL
// const url = "http://3.108.43.200:3000/"; //  Suraj url
// export const API_BASE_URL = "http://3.108.43.200:3000/"; // Suraj's URL
// export const IMAGEURL = "http://3.147.175.116:3010/"; // main Staging


// const url = "http://3.144.242.180/"; //  main Staging
// export const API_BASE_URL = "http://3.144.242.180/"; // main Staging
// export const IMAGEURL = "http://3.147.175.116:3010/"; // main Staging

// const url = "http://3.147.175.116:3010/"; //  main Staging
// export const API_BASE_URL = "http://3.147.175.116:3010/"; // main Staging


const url = "https://whatsapp.3pay.xyz"; //  main Staging
export const API_BASE_URL = "https://uhurucare.com/"; // main Staging
export const IMAGEURL = "https://uhurucare.com/"; // main Staging
const ApiConfig = {
  contactUs: `${url}api/v1/content/contactForm`,
  plans: `${url}api/v1/plans/indexpage`,
  plansMain: `${url}api/v1/plans`,
  plansDelete: `${url}api/v1/plans/delete`,
  updatePlans: `${url}api/v1/plans/update`,
  login: `${url}/api/v1/auth/login`,
  signup: `${url}api/v1/auth/signup`,
  enrollment: `${url}api/v1/auth/enrollment`,
  profile: `${url}api/v1/auth/profile`,
  depositList: `${url}/api/v1/deposit/list`,
  withdrawalList: `${url}/api/v1/withdrawal/list`,
  transferList: `${url}/api/v1/transfer/list`,
  accountList: `${url}/api/v1/account/list`,
  changepassword: `${url}api/v1/auth/changepassword`,
  uploadSignup: `${url}api/v1/auth/enrollment/upload`,
  users: `${url}api/v1/users`,
  claimAdd: `${url}api/v1/claims/add`,
  status: `${url}api/v1/status`,
  policies: `${url}api/v1/policies`,
  getallpayments: `${url}api/v1/payments/getall`,
  dashboardCount: `${url}api/v1/policies/stats`,
  reportList: `${url}api/v1/reports/claims-by-provider`,
  revenueList: `${url}api/v1/reports/premium-revenue`,
  multiSelected: `${url}api/v1/claims/multi/status`,
  AllContent: `${url}api/v1/content`,
  ContentAdd: `${url}api/v1/content`,
  ClaimListing: `${url}api/v1/reports/top-claim-types`,
  PlanAdding: `${url}api/v1/plans`,
  preceptions: `${url}api/v1/preceptions`,
  preceptionsbulk: `${url}api/v1/preceptions/bulk`,
  diagnosisList: `${url}api/v1/diagnosis`,
  diagnosisDelete: `${url}api/v1/diagnosis/bulk`,
  diagnosisCreate: `${url}api/v1/diagnosis/bulkCreate`,
  preceptionsbulkCreate: `${url}api/v1/preceptions/bulkCreate`,

};
export default ApiConfig;
