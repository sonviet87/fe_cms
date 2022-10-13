import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaymentsIcon from '@mui/icons-material/Payments';
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
                title: 'Order Management',
                route: '/admin/orders',
                Icon: ShoppingCartIcon,
            },

            {
                title: 'Payment Management',
                Icon: PaymentsIcon,
            },
            {
                title: 'Quotation Management',
                Icon: ReceiptIcon,
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

