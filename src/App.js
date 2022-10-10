import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dasboard from './pages/Dasboard'
import Supplier from './pages/Supplier'
import Customer from './pages/Customer'
import Employe from './pages/Employe'
import Quotation from './pages/Quotation'
import WorkOrderRelease from './pages/WorkOrderRelease'
import CustomerPo from './pages/CustomerPo'
import EquipmentPart from './pages/EquipmentPart'
import MarketingOpurtunity from './pages/MarketingOpurtunity'
import SalesPerformance from './pages/SalesPerformance'
import MaterialRequest from './pages/MaterialRequest'
import ServiceRequest from './pages/ServiceRequest'
import CashAdvance from './pages/CashAdvance'
import SpjCashAdvance from './pages/SpjCashAdvance'
import TimeSheet from './pages/TimeSheet'
import PermitRequest from './pages/PermitRequest'
import DispatchRecord from './pages/DispatchRecord'
import AbsenToday from './pages/AbsenToday'
import MasterMaterial from './pages/MasterMaterial'
import ApprovalMr from './pages/ApprovalMr'
import ApprovalSr from './pages/ApprovalSr'
import SpjPurchase from './pages/SpjPurchase'
import PurchaseMr from './pages/PurchaseMr'
import PurchaseSr from './pages/PurchaseSr'
import DirectMr from './pages/DirectMr'
import DirectSr from './pages/DirectSr'
import PurchaseOrder from './pages/PurchaseOrder'
import ServiceOrder from './pages/ServiceOrder'
import PurchaseReceive from './pages/PurchaseReceive'
import ServiceReceive from './pages/ServiceReceive'
import SummaryReport from './pages/SummaryReport.jsx'
import BillOfMaterial from './pages/BillOfMaterial'
import BomDimension from './pages/BomDimension'
import Drawing from './pages/Drawing'
import Shift from './pages/Shift'
import Dispatch from './pages/Dispatch'
import DispatchDesc from './pages/DispatchDesc'
import JobStatus from './pages/JobStatus.jsx'
import MrSrStatus from './pages/MRSRStatus'
import Users from './pages/Users'

// const queryClient = new QueryClient()

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Dasboard />} />
          <Route path='master-data/supplier' element={<Supplier />} />
          <Route path='master-data/customer' element={<Customer />} />
          <Route path='master-data/employe' element={<Employe />} />
          <Route path='marketing/quotation' element={<Quotation />} />
          <Route path='marketing/work-order-release' element={<WorkOrderRelease />}/>
          <Route path='marketing/customer-po' element={<CustomerPo />}/>
          <Route path='marketing/marketing-opurtunity' element={<MarketingOpurtunity />}/>
          <Route path='marketing/sales-performance' element={<SalesPerformance />}/>
          <Route path='public/mr' element={<MaterialRequest />}/>
          <Route path='public/sr' element={<ServiceRequest />}/>
          <Route path='public/cash-advance' element={<CashAdvance />}/>
          <Route path='public/spj-cash-advance' element={<SpjCashAdvance />}/>
          <Route path='public/time-sheet' element={<TimeSheet />}/>
          <Route path='public/permit-request' element={<PermitRequest />}/>
          <Route path='public/dispatch-record' element={<DispatchRecord />}/>
          <Route path='public/absen-today' element={<AbsenToday />}/>
          <Route path='public/master-material' element={<MasterMaterial />}/>
          <Route path='purchasing-logistic/approval-mr' element={<ApprovalMr />}/>
          <Route path='purchasing-logistic/approval-sr' element={<ApprovalSr />}/>
          <Route path='purchasing-logistic/spj-purchase' element={<SpjPurchase />}/>
          <Route path='purchasing-logistic/purchase-mr' element={<PurchaseMr />}/>
          <Route path='purchasing-logistic/purchase-sr' element={<PurchaseSr />}/>
          <Route path='purchasing-logistic/direct-mr' element={<DirectMr />}/>
          <Route path='purchasing-logistic/direct-sr' element={<DirectSr />}/>
          <Route path='purchasing-logistic/purchase-order' element={<PurchaseOrder />}/>
          <Route path='purchasing-logistic/service-order' element={<ServiceOrder />}/>
          <Route path='purchasing-logistic/purchase-receive' element={<PurchaseReceive />}/>
          <Route path='purchasing-logistic/service-receive' element={<ServiceReceive />}/>
          <Route path='purchasing-logistic/outgoing-material' element={<ServiceReceive />}/>
          <Route path='purchasing-logistic/delivery-order' element={<ServiceReceive />}/>
          <Route path='purchasing-logistic/material-remaind-use' element={<ServiceReceive />}/>
          <Route path='director/approval' element={<ServiceReceive />}/>
          <Route path='director/job-cost-manhour' element={<ServiceReceive />}/>
          <Route path='director/cash-advance-list' element={<ServiceReceive />}/>
          <Route path='director/payment-schedule' element={<ServiceReceive />}/>
          <Route path='finance-accounting/open-close-cashier' element={<ServiceReceive />}/>
          <Route path='finance-accounting/cashier' element={<ServiceReceive />}/>
          <Route path='finance-accounting/general-payment' element={<ServiceReceive />}/>
          <Route path='finance-accounting/kontra-bon' element={<ServiceReceive />}/>
          <Route path='finance-accounting/due-payment' element={<ServiceReceive />}/>
          <Route path='finance-accounting/posting' element={<ServiceReceive />}/>
          <Route path='finance-accounting/memorial-joural' element={<ServiceReceive />}/>
          <Route path='finance-accounting/transactions-per-day' element={<ServiceReceive />}/>
          <Route path='finance-accounting/transactions-per-account' element={<ServiceReceive />}/>
          <Route path='finance-accounting/cash-advance-control' element={<ServiceReceive />}/>
          <Route path='finance-accounting/purchasing-control' element={<ServiceReceive />}/>
          <Route path='finance-accounting/general-control' element={<ServiceReceive />}/>
          <Route path='finance-accounting/update-patycash' element={<ServiceReceive />}/>
          <Route path='finance-accounting/purchasing-report' element={<ServiceReceive />}/>
          <Route path='finance-accounting/closing-form' element={<ServiceReceive />}/>
          <Route path='hrd-ga/sallary-overtime' element={<ServiceReceive />}/>
          <Route path='hrd-ga/absent-list' element={<ServiceReceive />}/>
          <Route path='hrd-ga/spd' element={<ServiceReceive />}/>
          <Route path='production/shift' element={<Shift />}/>
          <Route path='production/dispatch' element={<Dispatch />}/>
          <Route path='production/time-schedule' element={<ServiceReceive />}/>
          <Route path='production/dispatch-record' element={<DispatchRecord />}/>
          <Route path='production/dispatch-description' element={<DispatchDesc />}/>
          <Route path='production/job-status' element={<JobStatus />}/>
          <Route path='production/equipment-part' element={<EquipmentPart />} />
          <Route path='production/mr-sr-status' element={<MrSrStatus />}/>
          <Route path='engineering/sumary-report' element={<SummaryReport />}/>
          <Route path='engineering/bill-of-material' element={<BillOfMaterial />}/>
          <Route path='engineering/bom-dimension' element={<BomDimension />}/>
          <Route path='engineering/drawing' element={<Drawing />}/>
          <Route path='report/material-name-info' element={<ServiceReceive />}/>
          <Route path='report/remove-mr-sr' element={<ServiceReceive />}/>
          <Route path='report/material-stok' element={<ServiceReceive />}/>
          <Route path='report/payment-schedule' element={<ServiceReceive />}/>
          <Route path='report/purchasing-list' element={<ServiceReceive />}/>
          <Route path='report/outgoing-list' element={<ServiceReceive />}/>
          <Route path='report/mr-sr-by-job' element={<ServiceReceive />}/>
          <Route path='report/incoming-purchase-report' element={<ServiceReceive />}/>
          <Route path='report/outgoing-material-report' element={<ServiceReceive />}/>
          <Route path='utility/invoice' element={<ServiceReceive />}/>
          <Route path='utility/spj-purchase' element={<ServiceReceive />}/>
          <Route path='utility/absen-dl-setting' element={<ServiceReceive />}/>
          <Route path='utility/register-new-user' element={<ServiceReceive />}/>
          <Route path='utility/holiday-setting' element={<ServiceReceive />}/>
          <Route path='utility/spd' element={<ServiceReceive />}/>
          <Route path='utility/inventory-check-balance' element={<ServiceReceive />}/>
          <Route path='utility/incoming-statement' element={<ServiceReceive />}/>
          <Route path='utility/personal-loan' element={<ServiceReceive />}/>
          <Route path='utility/payrol' element={<ServiceReceive />}/>
          <Route path='utility/chart-of-accounts' element={<ServiceReceive />}/>
          <Route path='utility/beginning-balance' element={<ServiceReceive />}/>
          <Route path='utility/cash-advance' element={<ServiceReceive />}/>
          <Route path='utility/approval-cash-advance' element={<ServiceReceive />}/>
          <Route path='utility/spj-cash-advance' element={<ServiceReceive />}/>
          <Route path='users' element={<Users />} />
          {/* <Route path='produk/edit-produk' element={<EditProduk />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
