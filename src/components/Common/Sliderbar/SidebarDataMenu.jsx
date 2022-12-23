import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import CategoryIcon from '@mui/icons-material/Category';


export const MenuCMS = [
    {
        // title: 'Management',
        items: [
            {
                title: 'Bảng điều khiển',
                route: '/admin',
                Icon: DashboardIcon,
                permission: 'all'
            },
            {
                title: 'Phương án kinh doanh',
                route: '/admin/fps',
                Icon: AssessmentIcon,
                permission: 'fp-list'
            },
            {
                title: 'Khách hàng',
                route: '/admin/accounts',
                Icon: PermContactCalendarIcon,
                permission: 'account-list'
            },
            {
                title: 'Liên hệ',
                route: '/admin/contacts',
                Icon: SpatialAudioOffIcon,
                permission: 'contact-list'
            },
            {
                title: 'Nhà cung cấp',
                route: '/admin/suppliers',
                Icon: SupervisedUserCircleIcon,
                permission: 'supplier-list'
            },
            {
                title: 'Danh mục sản phẩm',
                route: '/admin/category',
                Icon: CategoryIcon,
                permission: 'category-list'
            },
            {
                title: 'Báo cáo thống kê',
                Icon: ManageAccountsIcon,
                permission: 'report-list',
                items: [
                    {
                        title: 'Báo cáo phương án kinh doanh',
                        route: '/admin/reporst',
                        permission: 'report-list'
                    },

                ],
            },
            {
                title: 'Công nợ',
                Icon: ManageAccountsIcon,
                permission: 'all',
                items: [
                    {
                        title: 'Công nợ khách hàng',
                        route: '/admin/debts',
                        permission: 'all'
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
                        permission: 'user-list'
                    },
                    {
                        title: 'Quyền',
                        route: '/admin/roles',
                        permission: 'role-list'
                    },
                ],
            },
        ],
    },
];

