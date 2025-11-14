import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SettlementDomesticC2C from './pages/SettlementDomesticC2C'
import SettlementList from './pages/SettlementList'
import SettlementDetail from './pages/SettlementDetail'
import TransactionList from './pages/TransactionList'
import TransactionManual from './pages/TransactionManual'
import HoldManagement from './pages/HoldManagement'
import Statistics from './pages/Statistics'
import StatisticsByItem from './pages/StatisticsByItem'
import StatisticsByClient from './pages/StatisticsByClient'
import StatisticsTrend from './pages/StatisticsTrend'
import StatisticsCustomReport from './pages/StatisticsCustomReport'
import MasterUserCode from './pages/MasterUserCode'
import MasterFeeCode from './pages/MasterFeeCode'
import MasterClientCode from './pages/MasterClientCode'
import MasterDeliveryCode from './pages/MasterDeliveryCode'
// 인보이스 관리
import InvoiceCreate from './pages/InvoiceCreate'
import InvoiceList from './pages/InvoiceList'
import InvoicePreview from './pages/InvoicePreview'
import InvoiceSend from './pages/InvoiceSend'
// 부자재 관리
import SubsidiaryMaterialsCode from './pages/SubsidiaryMaterialsCode'
import SubsidiaryMaterialsPrice from './pages/SubsidiaryMaterialsPrice'
import SubsidiaryMaterialsUsage from './pages/SubsidiaryMaterialsUsage'
import SubsidiaryMaterialsStatistics from './pages/SubsidiaryMaterialsStatistics'
// 배송비 관리
import DeliveryRate from './pages/DeliveryRate'
import DeliveryEntry from './pages/DeliveryEntry'
import DeliverySettlement from './pages/DeliverySettlement'
import DeliveryStatistics from './pages/DeliveryStatistics'
// 보상비 관리
import CompensationItems from './pages/CompensationItems'
import CompensationEntry from './pages/CompensationEntry'
import CompensationStatistics from './pages/CompensationStatistics'
// 시스템 관리
import SystemClientManagement from './pages/SystemClientManagement'
import SystemUserManagement from './pages/SystemUserManagement'
import SystemPermission from './pages/SystemPermission'
import SystemCodeManagement from './pages/SystemCodeManagement'
import SystemAuditLog from './pages/SystemAuditLog'

function App() {
  return (
    <Routes>
      {/* 로그인 페이지 (인증 불필요) */}
      <Route path="/login" element={<Login />} />
      
      {/* 보호된 라우트 (인증 필요) */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settlements/domestic-c2c" element={<SettlementDomesticC2C />} />
        <Route path="settlements/overseas-cbt" element={<SettlementList />} />
        <Route path="settlements/wms" element={<SettlementList />} />
        <Route path="settlements" element={<SettlementList />} />
        <Route path="settlements/:id" element={<SettlementDetail />} />
        <Route path="transactions/manual" element={<TransactionManual />} />
        <Route path="transactions/all" element={<TransactionList />} />
        <Route path="transactions" element={<TransactionList />} />
        <Route path="holds" element={<HoldManagement />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="statistics/by-item" element={<StatisticsByItem />} />
        <Route path="statistics/by-client" element={<StatisticsByClient />} />
        <Route path="statistics/trend" element={<StatisticsTrend />} />
        <Route path="statistics/custom-report" element={<StatisticsCustomReport />} />
        <Route path="master/user-code" element={<MasterUserCode />} />
        <Route path="master/fee-code" element={<MasterFeeCode />} />
        <Route path="master/client-code" element={<MasterClientCode />} />
        <Route path="master/delivery-code" element={<MasterDeliveryCode />} />
        {/* 인보이스 관리 */}
        <Route path="invoice/create" element={<InvoiceCreate />} />
        <Route path="invoice/list" element={<InvoiceList />} />
        <Route path="invoice/preview" element={<InvoicePreview />} />
        <Route path="invoice/send" element={<InvoiceSend />} />
        {/* 부자재 관리 */}
        <Route path="subsidiary-materials/code" element={<SubsidiaryMaterialsCode />} />
        <Route path="subsidiary-materials/price" element={<SubsidiaryMaterialsPrice />} />
        <Route path="subsidiary-materials/usage" element={<SubsidiaryMaterialsUsage />} />
        <Route path="subsidiary-materials/statistics" element={<SubsidiaryMaterialsStatistics />} />
        {/* 배송비 관리 */}
        <Route path="delivery/rate" element={<DeliveryRate />} />
        <Route path="delivery/entry" element={<DeliveryEntry />} />
        <Route path="delivery/settlement" element={<DeliverySettlement />} />
        <Route path="delivery/statistics" element={<DeliveryStatistics />} />
        {/* 보상비 관리 */}
        <Route path="compensation/items" element={<CompensationItems />} />
        <Route path="compensation/entry" element={<CompensationEntry />} />
        <Route path="compensation/statistics" element={<CompensationStatistics />} />
        {/* 시스템 관리 */}
        <Route path="system/client-management" element={<SystemClientManagement />} />
        <Route path="system/user-management" element={<SystemUserManagement />} />
        <Route path="system/permission" element={<SystemPermission />} />
        <Route path="system/code-management" element={<SystemCodeManagement />} />
        <Route path="system/audit-log" element={<SystemAuditLog />} />
      </Route>
    </Routes>
  )
}

export default App

