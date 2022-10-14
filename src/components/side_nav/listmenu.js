import { MdDashboard, MdKeyboardArrowRight, MdContentPaste, MdPeople, MdOutlineContactMail, MdInventory, MdOutlineFactCheck, MdCleanHands } from 'react-icons/md'
const listMenu = [
    {
        id: 'dashboard',
        link: "/",
        title: "Dashboard",
        icon: MdDashboard,
        subMenu: null
    },
    {
        id: 'master_data',
        link: "/master-data",
        title: "Master Data",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'supplier',
                link: "/master-data/supplier",
                title: "Supplier",
                icon: MdInventory,
                subMenu: null
            },
            {
                id: 'customer',
                link: "/master-data/customer",
                title: "Customer",
                icon: MdPeople,
                subMenu: null
            },
            {
                id: 'employe',
                link: "/master-data/employe",
                title: "Employe",
                icon: MdOutlineContactMail,
                subMenu: null
            },
        ]
    },
    {
        id: 'marketing',
        link: "/marketing",
        title: "Marketing",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'quotation',
                link: "marketing/quotation",
                title: "Quotation",
                icon: MdCleanHands,
                subMenu: null
            },
            {
                id: 'work-order-release',
                link: "marketing/work-order-release",
                title: "Work Order Release",
                icon: MdOutlineFactCheck,
                subMenu: null
            },
            {
                id: 'customer-po',
                link: "marketing/customer-po",
                title: "Customer PO",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'marketing-opurtunity',
                link: "marketing/marketing-opurtunity",
                title: "Marketing Opurtunity",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'sales-performance',
                link: "marketing/sales-performance",
                title: "Sales Performance",
                icon: MdContentPaste,
                subMenu: null
            },
        ]
    },
    {
        id: 'public',
        link: "/public",
        title: "Public",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'mr',
                link: "/public/mr",
                title: "MR",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'sr',
                link: "/public/sr",
                title: "SR",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'cash-advance',
                link: "/public/cash-advance",
                title: "Cash Advance",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'spj-cash-advance',
                link: "/public/spj-cash-advance",
                title: "SPJ Cash Advance",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'time-sheet',
                link: "/public/time-sheet",
                title: "Time Sheet",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'permit-request',
                link: "/public/permit-request",
                title: "Permit Request",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'dispatch-record',
                link: "/public/dispatch-record",
                title: "Dispatch Record",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'absen-today',
                link: "/public/absen-today",
                title: "Absen Today",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'master-material',
                link: "/public/master-material",
                title: "Master Material",
                icon: MdContentPaste,
                subMenu: null
            },
        ]
    },
    {
        id: 'purchasing-logistic',
        link: "/purchasing-logistic",
        title: "Purchasing & Logistic",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'approval-mr',
                link: "/purchasing-logistic/approval-mr",
                title: "Approval MR",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'approval-sr',
                link: "/purchasing-logistic/approval-sr",
                title: "Approval SR",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'spj-purchase',
                link: "/purchasing-logistic/spj-purchase",
                title: "SPJ Purchase",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'purchase-mr',
                link: "/purchasing-logistic/purchase-mr",
                title: "Purchase MR",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'purchase-sr',
                link: "/purchasing-logistic/purchase-sr",
                title: "Purchase SR",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'direct-mr',
                link: "/purchasing-logistic/direct-mr",
                title: "Direct MR",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'direct-sr',
                link: "/purchasing-logistic/direct-sr",
                title: "Direct SR",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'purchase-order',
                link: "/purchasing-logistic/purchase-order",
                title: "Purchase Order",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'service-order',
                link: "/purchasing-logistic/service-order",
                title: "Service Order",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'purchase-receive',
                link: "/purchasing-logistic/purchase-receive",
                title: "Purchase Receive",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'service-receive',
                link: "/purchasing-logistic/service-receive",
                title: "Service Receive",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'outgoing-material',
                link: "/purchasing-logistic/outgoing-material",
                title: "Outgoing Material",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'delivery-order',
                link: "/purchasing-logistic/delivery-order",
                title: "Delivery Order",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'material-remaind-use',
                link: "/purchasing-logistic/material-remaind-use",
                title: "Material Remain Use",
                icon: MdContentPaste,
                subMenu: null
            },
        ]
    },
    {
        id: 'director',
        link: "/director",
        title: "Director",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'approval',
                link: "director/approval",
                title: "Approval",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'job-cost-manhour',
                link: "director/job-cost-manhour",
                title: "Job Cost & Man Hour",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'cash-advance-list',
                link: "director/cash-advance-list",
                title: "Cash Advance List",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'payment-schedule',
                link: "director/payment-schedule",
                title: "Payment Schedule",
                icon: MdContentPaste,
                subMenu: null
            },
        ]
    },
    {
        id: 'finance-accounting',
        link: "/finance-accounting",
        title: "Finance & Accounting",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'open-close-cashier',
                link: "finance-accounting/open-close-cashier",
                title: "Open/Close Cashier",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'cashier',
                link: "finance-accounting/cashier",
                title: "Cashier",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'general-payment',
                link: "finance-accounting/general-payment",
                title: "General Payment",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'kontra-bon',
                link: "finance-accounting/kontra-bon",
                title: "kontra Bon",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'due-payment',
                link: "finance-accounting/due-payment",
                title: "Due Payment",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'posting',
                link: "finance-accounting/posting",
                title: "Posting",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'memorial-joural',
                link: "finance-accounting/memorial-joural",
                title: "Memorial Journal",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'accountability-approval',
                link: "finance-accounting/accountability-approval",
                title: "Accountability Approval",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'transactions-per-day',
                link: "finance-accounting/transactions-per-day",
                title: "Transactions Per Day",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'transactions-per-account',
                link: "finance-accounting/transactions-per-account",
                title: "Transactions Per Account",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'cash-advance-control',
                link: "finance-accounting/cash-advance-control",
                title: "Cash Advance Control",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'purchasing-control',
                link: "finance-accounting/purchasing-control",
                title: "Purchasing Control",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'general-control',
                link: "finance-accounting/general-control",
                title: "General Control",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'update-patycash',
                link: "finance-accounting/update-patycash",
                title: "Update Patycash",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'purchasing-report',
                link: "finance-accounting/purchasing-report",
                title: "Purchasing Report",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'closing-form',
                link: "finance-accounting/closing-form",
                title: "Closing Form",
                icon: MdContentPaste,
                subMenu: null
            },
        ]
    },
    {
        id: 'hrd-ga',
        link: "/hrd-ga",
        title: "HRD & GA",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'sallary-overtime',
                link: "hrd-ga/sallary-overtime",
                title: "Sallary & Overtime",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'absent-list',
                link: "hrd-ga/absent-list",
                title: "Absent List",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'spd',
                link: "hrd-ga/spd",
                title: "SPD",
                icon: MdContentPaste,
                subMenu: null
            },
        ]
    },
    {
        id: 'production',
        link: "/production",
        title: "Production",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'shift',
                link: "production/shift",
                title: "Shift",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'dispatch',
                link: "production/dispatch",
                title: "Dispatch",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'time-schedule',
                link: "production/time-schedule",
                title: "Time Schedule",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'dispatch-record',
                link: "production/dispatch-record",
                title: "Dispatch Record",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'dispatch-description',
                link: "production/dispatch-description",
                title: "Dispatch Description",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'job-status',
                link: "production/job-status",
                title: "Job Status",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'equipment-part',
                link: "production/equipment-part",
                title: "Equipment & Part",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'mr-sr-status',
                link: "production/mr-sr-status",
                title: "MR/SR Status",
                icon: MdContentPaste,
                subMenu: null
            },
        ]
    },
    {
        id: 'engineering',
        link: "/engineering",
        title: "Engineering",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'sumary-report',
                link: "engineering/sumary-report",
                title: "Sumary Report",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'bill-of-material',
                link: "engineering/bill-of-material",
                title: "Bill Of Material",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'bom-dimension',
                link: "engineering/bom-dimension",
                title: "BOM Dimension",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'drawing',
                link: "engineering/drawing",
                title: "Drawing",
                icon: MdContentPaste,
                subMenu: null
            },
        ]
    },
    {
        id: 'report',
        link: "/report",
        title: "Report",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'material-name-info',
                link: "report/material-name-info",
                title: "Material Name Info",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'remove-mr-sr',
                link: "report/remove-mr-sr",
                title: "Remove MR/SR",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'material-stok',
                link: "report/material-stok",
                title: "Material Stok",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'payment-schedule',
                link: "report/payment-schedule",
                title: "Payment Schedule",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'purchasing-list',
                link: "report/purchasing-list",
                title: "Purchasing List",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'outgoing-list',
                link: "report/outgoing-list",
                title: "Outgoing List",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'mr-sr-by-job',
                link: "report/mr-sr-by-job",
                title: "MR/SR By Job",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'incoming-purchase-report',
                link: "report/incoming-purchase-report",
                title: "Incoming Purchase Report",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'outgoing-material-report',
                link: "report/outgoing-material-report",
                title: "Outgoing Material Report",
                icon: MdContentPaste,
                subMenu: null
            },
        ]
    },
    {
        id: 'utility',
        link: "/utility",
        title: "Utility",
        icon: MdContentPaste,
        subMenu: [
            {
                id: 'invoice',
                link: "utility/invoice",
                title: "Invoice",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'spj-purchase',
                link: "utility/spj-purchase",
                title: "SPJ Purchase",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'absen-dl-setting',
                link: "utility/absen-dl-setting",
                title: "Absen Dl Setting",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'register-new-user',
                link: "utility/register-new-user",
                title: "Register New User",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'holiday-setting',
                link: "utility/holiday-setting",
                title: "Holiday Setting",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'spd',
                link: "utility/spd",
                title: "SPD",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'inventory-check-balance',
                link: "utility/inventory-check-balance",
                title: "Inventory Check Balance",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'incoming-statement',
                link: "utility/incoming-statement",
                title: "Incoming Statement",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'personal-loan',
                link: "utility/personal-loan",
                title: "Personal Loan",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'payrol',
                link: "utility/payrol",
                title: "Payrol",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'chart-of-accounts',
                link: "utility/chart-of-accounts",
                title: "Charts Of Accounts",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'beginning-balance',
                link: "utility/beginning-balance",
                title: "Beginning Balance",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'cash-advance',
                link: "utility/cash-advance",
                title: "Cash Advance",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'approval-cash-advance',
                link: "utility/approval-cash-advance",
                title: "Approval Cash Advance",
                icon: MdContentPaste,
                subMenu: null
            },
            {
                id: 'spj-cash-advance',
                link: "utility/spj-cash-advance",
                title: "SPJ Cash Advance",
                icon: MdContentPaste,
                subMenu: null
            },
            
        ]
    },
    {
        id: 'users',
        link: "users",
        title: "Users",
        icon: MdContentPaste,
        subMenu: null
    },
    
]

export default listMenu