import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'grid-outline',
    link: '/user/dashboard',
    home: true,
  },
  {
    title: 'Logout',
    icon: 'log-out-outline',
    link: '/auth/logout',
  },
];
