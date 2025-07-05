import Dashboard from "../pages/protected/Dashboard";
import ProfileSettings from "../pages/protected/ProfileSettings";
import Shares from "../pages/protected/Shares";
import Loans from "../pages/protected/Loans";
import Events from "../pages/protected/Events";
import BillingHistory from "../pages/protected/BillingHistory";
import Members from "../pages/protected/Members";
import MembershipRequestVerification from "../pages/protected/MembershipRequestVerification";
import ManageUsers from "../pages/protected/ManageUsers";
import LoanHistory from "../features/loans/loanHistory";
import LoanVerification from "../pages/protected/LoanVerification";
import LoanTerms from "../pages/protected/LoanTerms";
import SharesOfMembers from '../features/shares/SharesOfMembers';
import UserSavings from '../features/savings/UserSavings'
import AllSavings from "../features/savings/AllSavings";
import Reports from "../pages/protected/Reports";
import loansTz1 from "../features/admin/loansTz1";

const routes = [
    {
        path: '/dashboard', // the url
        component: Dashboard, // view rendered
      },
      {
        path: '/hisa',
        component: Shares,
      },
      {
        path: '/hisa-za-wanachama',
        component: SharesOfMembers,
      },
      {
        path: '/akiba-na-amana',
        component: UserSavings,
      },
      {
        path: '/akiba-za-wanachama',
        component: AllSavings,
      },
      {
        path: '/mikopo-yangu',
        component: Loans,
      },
      {
        path: '/historia-ya-mikopo',
        component: LoanHistory,
      },
      {
        path: '/idhinisha-mikopo',
        component: LoanVerification,
      },
      {
        path: '/masharti-ya-mkopo',
        component: LoanTerms,
      },
      {
        path: '/matukio',
        component: Events,
      },
      {
        path: '/wasifu',
        component: ProfileSettings,
      },
      {
        path: '/historia-ya-miamala',
        component: BillingHistory,
      },
      {
        path: '/wanachama',
        component: Members,
      },
      {
        path: '/maombi-ya-uanachama',
        component: MembershipRequestVerification,
      },
      {
        path: '/dhibiti-wanachama',
        component: ManageUsers,
      },
      {
        path: '/ripoti',
        component: Reports,
      },
      {
        path: '/mikopo-ya-kulipwa-na-mwajiri',
        component: loansTz1,
      }
]

export default routes