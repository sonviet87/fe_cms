import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export const MenuCMS = [
    {
        // title: 'Management',
        items: [
            {
                title: 'Bảng điều khiển',
                route: '/admin',
                Icon: DashboardIcon,
            },
            {
                title: 'Phương án kinh doanh',
                route: '/admin/fps',
                Icon: ShoppingCartIcon,
            },
            {
                title: 'Tài khoản',
                route: '/admin/accounts',
                Icon: ShoppingCartIcon,
            },
            {
                title: 'Liên hệ',
                route: '/admin/contacts',
                Icon: ShoppingCartIcon,
            },
            {
                title: 'Nhà cung cấp',
                route: '/admin/suppliers',
                Icon: ShoppingCartIcon,
            },
            {
                title: 'Danh mục sản phẩm',
                route: '/admin/category',
                Icon: ShoppingCartIcon,
            },

            {
                title: 'Người dùng',
                Icon: ManageAccountsIcon,
                items: [
                    {
                        title: 'Danh sách người dùng',
                        route: '/admin/users',
                    },
                    {
                        title: 'Quyền',
                        route: '/admin/roles',
                    },
                ],
            },
        ],
    },
];

