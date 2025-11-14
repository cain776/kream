import api from './api'

// 정산 대시보드 요약 조회
export const getDashboardSummary = async (date) => {
  return api.get('/settlements/dashboard', { params: { date } })
}

// 정산 대상 목록 조회 (판매자별 집계)
export const getSettlementTargets = async (params) => {
  return api.get('/settlements/targets', { params })
}

// 정산서 생성
export const createSettlement = async (data) => {
  return api.post('/settlements', data)
}

// 정산서 목록 조회
export const getSettlements = async (params) => {
  return api.get('/settlements', { params })
}

// 정산서 상세 조회
export const getSettlementDetail = async (id) => {
  return api.get(`/settlements/${id}`)
}

// 정산서 승인
export const approveSettlement = async (id, data) => {
  return api.post(`/settlements/${id}/approve`, data)
}

// 정산서 반려
export const rejectSettlement = async (id, data) => {
  return api.post(`/settlements/${id}/reject`, data)
}

// 지급 실행
export const executeTransfer = async (id) => {
  return api.post(`/settlements/${id}/transfer`)
}

// 거래 내역 조회
export const getTransactions = async (params) => {
  return api.get('/transactions', { params })
}

// 보류 건 목록 조회
export const getHolds = async (params) => {
  return api.get('/settlements/holds', { params })
}

// 보류 해제
export const releaseHold = async (id, data) => {
  return api.post(`/settlements/holds/${id}/release`, data)
}

// 대사 실행
export const executeReconciliation = async (data) => {
  return api.post('/reconciliations', data)
}

// 통계 조회
export const getStatistics = async (params) => {
  return api.get('/settlements/statistics', { params })
}

