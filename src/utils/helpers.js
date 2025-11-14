/**
 * 숫자를 한국 통화 형식으로 포맷
 * @param {number} amount - 금액
 * @returns {string} 포맷된 문자열
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '0원'
  return `${amount.toLocaleString('ko-KR')}원`
}

/**
 * 날짜를 한국 형식으로 포맷
 * @param {string|Date} date - 날짜
 * @param {string} format - 포맷 ('date' | 'datetime' | 'time')
 * @returns {string} 포맷된 문자열
 */
export const formatDate = (date, format = 'date') => {
  if (!date) return '-'
  const d = new Date(date)
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  
  switch (format) {
    case 'datetime':
      return `${year}-${month}-${day} ${hours}:${minutes}`
    case 'time':
      return `${hours}:${minutes}`
    default:
      return `${year}-${month}-${day}`
  }
}

/**
 * 판매자 유형 라벨 반환
 * @param {string} type - 판매자 유형
 * @returns {string} 라벨
 */
export const getSellerTypeLabel = (type) => {
  const labels = {
    INDIVIDUAL: '개인',
    BUSINESS: '개인사업자',
    CORPORATE: '법인',
  }
  return labels[type] || type
}

/**
 * 상태 라벨 반환
 * @param {string} status - 상태 코드
 * @returns {string} 라벨
 */
export const getStatusLabel = (status) => {
  const labels = {
    PENDING: '대기',
    IN_PROGRESS: '진행중',
    COMPLETED: '완료',
    APPROVED: '승인',
    REJECTED: '반려',
    HOLD: '보류',
    FAILED: '실패',
  }
  return labels[status] || status
}

/**
 * 파일 다운로드
 * @param {Blob} blob - 파일 Blob
 * @param {string} filename - 파일명
 */
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * 디바운스 함수
 * @param {Function} func - 실행할 함수
 * @param {number} wait - 대기 시간(ms)
 * @returns {Function} 디바운스된 함수
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

