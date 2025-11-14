/**
 * 재사용 가능한 버튼 컴포넌트
 * 
 * @param {string} variant - 버튼 스타일 (primary, secondary, accent, success, danger)
 * @param {string} size - 버튼 크기 (sm, md, lg)
 * @param {string} icon - 아이콘 타입 (search, reset, add, download, edit, delete 등)
 * @param {ReactNode} children - 버튼 텍스트
 * @param {function} onClick - 클릭 핸들러
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가 CSS 클래스
 */

const icons = {
  search: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  reset: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  add: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  download: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  upload: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  edit: null, // 텍스트만
  delete: null, // 텍스트만
  close: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

const sizeClasses = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3'
}

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  success: 'btn-success',
  danger: 'btn-danger'
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  icon,
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props 
}) {
  const baseClass = 'btn'
  const variantClass = variantClasses[variant] || variantClasses.primary
  const sizeClass = sizeClasses[size] || sizeClasses.md
  const iconElement = icons[icon]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {iconElement}
      {children}
    </button>
  )
}

// 자주 사용하는 버튼들을 위한 편의 컴포넌트
export const SearchButton = (props) => (
  <Button variant="primary" icon="search" {...props}>
    조회
  </Button>
)

export const ResetButton = (props) => (
  <Button variant="primary" icon="reset" {...props}>
    초기화
  </Button>
)

export const AddButton = (props) => (
  <Button variant="primary" icon="add" {...props}>
    신규 등록
  </Button>
)

export const DownloadButton = (props) => (
  <Button variant="primary" icon="download" {...props}>
    엑셀 다운로드
  </Button>
)

export const UploadButton = (props) => (
  <Button variant="success" icon="upload" {...props}>
    업로드
  </Button>
)

export const EditButton = (props) => (
  <Button variant="primary" size="sm" {...props}>
    수정
  </Button>
)

export const DeleteButton = (props) => (
  <Button variant="danger" size="sm" {...props}>
    삭제
  </Button>
)

export const SaveButton = (props) => (
  <Button variant="success" {...props}>
    저장
  </Button>
)

export const CancelButton = (props) => (
  <Button variant="secondary" {...props}>
    취소
  </Button>
)

