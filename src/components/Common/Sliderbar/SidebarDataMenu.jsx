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
        title: 'Chi phí vận hành',
        Icon: AssessmentIcon,
        permission: 'costs',
        items: [
          {
            title: 'Tổng chi phí',
            route: '/admin/costs/',
            permission: 'costs',
          },
          {
            title: 'Chi phí nhóm',
            route: '/admin/costs/costs-team',
            permission: 'costs-team-list',
          },
          {
            title: 'Chi phí cố định',
            route: '/admin/costs/costs-fixed',
            permission: 'costs-fixed-list',
          },

        ],
      },
      {
        title: 'Cơ hội kinh doanh',
        route: '/admin/chances',
        Icon: AssessmentIcon,
        permission: 'chance-list',
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
        permission: 'warranty-list',
      },
      {
        title: 'Báo cáo thống kê',
        Icon: AnalyticsIcon,
        permission: 'report-sale',
        items: [
          {
            title: 'Phương án kinh doanh',
            route: '/admin/reports',
            permission: 'report-sale',
          },
          {
            title: 'Công nợ khách hàng',
            route: '/admin/reports-debt-fp',
            permission: 'report-debts-customer',
          },
          {
            title: 'Công nợ Nhà cung cấp',
            route: '/admin/reports-debt-supplier',
            permission: 'report-debts-supplier',
          },
        ],
      },
      {
        title: 'Công nợ',
        Icon: SummarizeIcon,
        permission: 'debts-customer-list',
        items: [
          {
            title: 'Công nợ khách hàng',
            route: '/admin/debts',
            permission: 'debts-customer-list',
          },
          {
            title: 'Công nợ nhà cung cấp',
            route: '/admin/debts-supplier',
            permission: 'debts-supplier-list',
          },
        ],
      },
      {
        title: 'KPI',
        Icon: ManageAccountsIcon,
        permission: 'all',
        items: [
          {
            title: 'Kpi kinh doanh',
            permission: 'kpi-sale',
            items: [
              {
                title: 'Danh sách KPI kinh doanh',
                route: '/admin/kpi-sale',
                permission: 'kpi-sale',
              },
              {
                title: 'Cấu hình KPI kinh doanh',
                route: '/admin/kpi-sale/setup-user',
                permission: 'kpi-setting-sale-list',
              },
              {
                title: 'Cài đặt Kpi thưởng',
                route: '/admin/kpi-sale/settings-total',
                permission: 'kpi-total',
              },

            ],
          },

          {
            title: 'Kpi kỹ thuật',
            permission: 'kpi-technical',
            items: [
              {
                title: 'Danh sách KPI kỹ thuật',
                route: '/admin/kpi-technical/kpi-technical',
                permission: 'kpi-technical',
              },
              {
                title: 'Cầu hình KPI kỹ thuật',
                route: '/admin/kpi-technical/kpi-setting-technical',
                permission: 'kpi-setting-technical-list',
              },
              {
                title: 'Chứng chỉ kỹ thuật',
                route: '/admin/kpi-technical/technical-certificate',
                permission: 'technical-certificate-list',
              },
              {
                title: 'Dự án',
                route: '/admin/kpi-technical/technical-project',
                permission: 'technical-project-list',
              },
              {
                title: 'Đánh giá khách hàng',
                route: '/admin/kpi-technical/technical-review',
                permission: 'technical-review-list',
              },

            ],
          },
          {
            title: 'Kpi Mua hàng',
            permission: 'kpi-supplier',
            items: [
              {
                title: 'Danh sách KPI mua hàng',
                route: '/admin/kpi-supplier',
                permission: 'kpi-supplier',
              },
              {
                title: 'Cấu hình KPI mua hàng',
                route: '/admin/kpi-supplier/kpi-setting-supplier',
                permission: 'kpi-setting-supplier-list',
              },

            ],
          },
          /*{
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
          },*/
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
            title: 'Chức vụ',
            route: '/admin/positions',
            permission: 'all',
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
