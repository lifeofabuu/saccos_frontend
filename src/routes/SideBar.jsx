/* eslint-disable no-unused-vars */
import {
  CurrencyDollarIcon,
  UserPlusIcon,
  ArrowTrendingUpIcon,
  DocumentIcon,
  Squares2X2Icon,
  UserIcon,
  WalletIcon,
  UsersIcon,
  Cog6ToothIcon,
  CalendarDaysIcon,
  CogIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline'
import React from 'react'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [
  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
    allowedRoles: [1,2,3,4,5,6,7] // 1 for ADMIN and 2 for USER
  },
  {
    path: '',
    icon: <ArrowTrendingUpIcon className={`${iconClasses} inline`} />,
    name: 'Hisa',
    submenu: [
      {
        path: '/app/hisa',
        icon: <ArrowTrendingUpIcon className={iconClasses} />,
        name: 'Hisa',
        allowedRoles: [2, 4,5, 6, 7]
      },
      {
        path: '/app/hisa-za-wanachama',
        icon: <ArrowTrendingUpIcon className={iconClasses} />,
        name: 'Hisa za Wanachama',
        allowedRoles: [4, 5, 6, 7]
      },
    ]
  },
  {
    path: '',
    icon: <BanknotesIcon className={`${iconClasses} inline`} />,
    name: 'Akiba na Amana',
    submenu: [
      {
        path: '/app/akiba-na-amana',
        icon: <BanknotesIcon className={submenuIconClasses} />,
        name: 'Akiba na Amana',
        allowedRoles: [2, 4,5, 6, 7]
      },
      {
        path: '/app/akiba-za-wanachama',
        icon: <BanknotesIcon className={submenuIconClasses} />,
        name: 'Akiba na Amana za wanachama',
        allowedRoles: [4, 5, 6, 7]
      },
    ]
  },
  {
    path: '', // no url needed
    icon: <CurrencyDollarIcon className={`${iconClasses} inline`} />,
    name: 'Mikopo', // name that appear in Sidebar
    submenu: [
      {
        path: '/app/mikopo-yangu',
        icon: <CurrencyDollarIcon className={submenuIconClasses} />,
        name: 'Mikopo Yangu',
        allowedRoles: [2, 4,5, 6, 7]
      },
      {
        path: '/app/idhinisha-mikopo',
        icon: <CheckCircleIcon className={submenuIconClasses} />,
        name: 'Idhinisha Mikopo',
        allowedRoles: [5]
      },
      {
        path: '/app/historia-ya-mikopo',
        icon: <ClipboardDocumentListIcon className={submenuIconClasses} />,
        name: 'Historia ya Mikopo',
        allowedRoles: [2, 4,5, 6, 7]
      },
      {
        path: '/app/mikopo-ya-kulipwa-na-mwajiri',
        icon: <DocumentTextIcon className={submenuIconClasses} />,
        name: 'Mikopo ya kulipwa na Mwajiri',
        allowedRoles: [4]
      }
    ]
  },
  {
    path: '/app/historia-ya-miamala',
    icon: <WalletIcon className={submenuIconClasses} />,
    name: 'Historia ya Miamala',
    allowedRoles: [2, 4,5, 6, 7]
  },
  {
    path: '/app/matukio', // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: 'Matukio', // name that appear in Sidebar
    allowedRoles: [2, 4,5, 6, 7]
  },
  {
    path: '/app/ripoti', // url
    icon: <DocumentIcon className={iconClasses} />, // icon component
    name: 'Ripoti', // name that appear in Sidebar
    allowedRoles: [1,2,3,4,5,6,7]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Matengenezo', // name that appear in Sidebar
    submenu: [
      {
        path: '/app/wasifu', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'Wasifu', // name that appear in Sidebar
        allowedRoles: [2, 4,5, 6, 7]
      },
      {
        path: '/app/wanachama', // url
        icon: <UsersIcon className={submenuIconClasses} />, // icon component
        name: 'Wanachama', // name that appear in Sidebar
        allowedRoles: [2,5]
      },
      {
        path: '/app/maombi-ya-uanachama',
        icon: <UserPlusIcon className={submenuIconClasses} />,
        name: 'Maombi ya Uanachama',
        allowedRoles: [6, 7]
      },
      {
        path: '/app/dhibiti-wanachama',
        icon: <CogIcon className={submenuIconClasses} />,
        name: 'Dhibiti Wanachama',
        allowedRoles: [6, 7]
      },
    ]
  },
]

export default routes