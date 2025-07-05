import { baseURL } from "./baseUrl";

export const apis = {
    // user management urls
    login: baseURL + 'api/auth/login',
    getUsers: baseURL + 'api/auth/get-users',
    updateProfile: baseURL + 'api/auth/update-profile/',
    changePassword: baseURL + 'api/auth/change-password',
    deleteUserUrl: baseURL + 'api/auth/delete-user',
    updateUserRoleUrl: baseURL + 'api/auth/update-user-role',
    restrictUserUrl: baseURL + 'api/auth/restrict-user',
    returnUserMembershipUrl: baseURL + 'api/auth/return-user-membership',
    getUserFinancialDataUrl: baseURL + 'api/payment/user-financial-data',
    searchUserUrl: baseURL + 'api/auth/search-user',

    // membership request and verification urls
    membershipRequest: baseURL + 'api/auth/membership-request',
    membershipRequestList: baseURL + 'api/auth/membership-requests-list',
    adminVerifyMembershipRequestUrl: baseURL + 'api/auth/admin-verify-membership-request',

    // get mikoa and wilaya and kata detail url
    getMikoaData: baseURL + 'api/saccos/get-mikoa-data/',

    //transactions url
    transactions: baseURL + 'api/payment/transactions/',
    getUserKiingilioTransaction: baseURL + 'api/payment/get-user-kiingilio-transaction/',
    transactionsHistoryUrl: baseURL + 'api/payment/transaction-history/',

    // shares(hisa) urls
    sharesUrl: baseURL + 'api/saccos/share-payment/',
    allSharesUrl: baseURL + 'api/saccos/all-shares/',

    // savings (akiba na amana) urls
    savingsUrl: baseURL + 'api/saccos/saving-payment/',
    allSavingsUrl: baseURL + 'api/saccos/all-savings/',

    //Loans urls
    checkLoanEligibilityUrl: baseURL + 'api/loan/loan-eligibility/',
    loanApplicationUrl: baseURL + 'api/loan/loan-application/',
    userPendingLoansUrl: baseURL + 'api/loan/user-pending-loans/',
    allPendingLoansUrl: baseURL + 'api/loan/all-pending-loans/',
    verifyLoanUrl: baseURL + 'api/loan/verify-loan',
    approveLoanUrl: baseURL + 'api/loan/approve-loan',
    userApprovedLoansUrl: baseURL + 'api/loan/user-approved-loans/',
    getLoanHistoryUrl: baseURL + 'api/loan/loan-history-data/',
    getInstitutionLoansUrl: baseURL + 'api/loan/institute-loans/',

    // events urls
    eventListCreateRetrieveUpdateDeleteUrl: baseURL + 'api/saccos/events',

    // dashboard information
    generalDashboardDataUrl: baseURL + 'api/auth/general-information/',
    userDashboardDataUrl: baseURL + 'api/auth/user-information',
    generateReportUrl: baseURL + 'api/saccos/generate-report',
}