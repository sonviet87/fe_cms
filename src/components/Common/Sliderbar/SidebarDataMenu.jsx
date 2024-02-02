import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import CategoryIcon from '@mui/icons-material/Category';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FactCheckIcon from '@mui/icons-material/FactCheck';
export const MenuCMS = [
  {
    // title: 'Management',
    items: [
      // {
      //   title: 'test',
      //   route: '/admin/send',
      //   Icon: DashboardIcon,
      //   permission: 'all',
      // },
      {
        title: 'Bảng điều khiển',
        route: '/admin',
        Icon: DashboardIcon,
        permission: 'all',
      },
      {
        title: 'Phương án kinh doanh',
        route: '/admin/fps',
        Icon: AssessmentIcon,
        permission: 'fp-list',
      },
      {
        title: 'Khách hàng',
        route: '/admin/accounts',
        Icon: PermContactCalendarIcon,
        permission: 'account-list',
      },
      {
        title: 'Liên hệ',
        route: '/admin/contacts',
        Icon: SpatialAudioOffIcon,
        permission: 'contact-list',
      },
      {
        title: 'Nhà cung cấp',
        route: '/admin/suppliers',
        Icon: SupervisedUserCircleIcon,
        permission: 'supplier-list',
      },
      {
        title: 'Danh mục sản phẩm',
        route: '/admin/category',
        Icon: CategoryIcon,
        permission: 'category-list',
      },
      {
        title: 'Bảo hành',
        route: '/admin/warranty',
        Icon: FactCheckIcon,
        permission: 'category-list',
      },
      {
        title: 'Báo cáo thống kê',
        Icon: AnalyticsIcon,
        permission: 'all',
        items: [
          {
            title: 'Phương án kinh doanh',
            route: '/admin/reports',
            permission: 'all',
          },
          {
            title: 'Công nợ khách hàng',
            route: '/admin/reports-debt-fp',
            permission: 'all',
          },
          {
            title: 'Công nợ Nhà cung cấp',
            route: '/admin/reports-debt-supplier',
            permission: 'all',
          },
        ],
      },
      {
        title: 'Công nợ',
        Icon: SummarizeIcon,
        permission: 'all',
        items: [
          {
            title: 'Công nợ khách hàng',
            route: '/admin/debts',
            permission: 'all',
          },
          {
            title: 'Công nợ nhà cung cấp',
            route: '/admin/debts-supplier',
            permission: 'all',
          },
        ],
      },
      {
        title: 'KPI',
        Icon: ManageAccountsIcon,
        permission: 'kpi-list',
        items: [
          {
            title: 'Danh sách KPI',
            route: '/admin/kpi',
            permission: 'kpi-list',
          },
          {
            title: 'Danh sách nhóm',
            route: '/admin/kpi/group-member',
            permission: 'kpi-group',
          },
          {
            title: 'Cài đặt Kpi tổng',
            route: '/admin/kpi/settings-1',
            permission: 'kpi-settings',
          },
        ],
      },
      {
        title: 'Người dùng',
        Icon: ManageAccountsIcon,
        permission: 'user-list',
        items: [
          {
            title: 'Danh sách người dùng',
            route: '/admin/users',
            permission: 'user-list',
          },
          {
            title: 'Cấp độ lương',
            route: '/admin/salaries',
            permission: 'salary-list',
          },
          {
            title: 'Quyền',
            route: '/admin/roles',
            permission: 'role-list',
          },
        ],
      },
    ],
  },
];
