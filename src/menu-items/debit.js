// assets
import { BankOutlined, CreditCardOutlined, DollarOutlined } from '@ant-design/icons';

// icons
const icons = {
    BankOutlined,
    CreditCardOutlined,
    DollarOutlined
};

// ==============================|| MENU ITEMS - DEBIT ||============================== //

const debit = {
    id: 'group-debit',
    title: 'Debit',
    type: 'group',
    children: [
        {
            id: 'debitmain',
            title: 'My Debits',
            type: 'item',
            url: '/debit/main',
            icon: icons.BankOutlined,
            breadcrumbs: false
        },
        {
            id: 'debitadd',
            title: 'Appeal',
            type: 'item',
            url: '/debit/appeal',
            icon: icons.CreditCardOutlined,
            breadcrumbs: false
        },
        {
            id: 'debituse',
            title: 'Use Card',
            type: 'item',
            url: '/debit/use',
            icon: icons.DollarOutlined,
            breadcrumbs: false
        }
    ]
};

export default debit;
