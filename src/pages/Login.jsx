import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // 간단한 로그인 검증 (실제로는 백엔드 API 호출)
    if (email && password) {
      // 로그인 성공 - localStorage에 토큰 저장
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      navigate('/dashboard')
    } else {
      setError('이메일과 비밀번호를 입력해주세요.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <style>{`
        .floating-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .floating-input {
          width: 100%;
          height: 52px;
          padding: 16px 16px 6px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 12px;
          font-size: 15px;
          color: #111827;
          background: white;
          transition: all 0.2s;
        }
        
        .floating-input:focus {
          outline: none;
          border-color: #111827;
          box-shadow: 0 0 0 4px rgba(17, 23, 39, 0.08);
        }
        
        .floating-label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          color: #9CA3AF;
          pointer-events: none;
          transition: all 0.2s ease;
          background: white;
          padding: 0 4px;
        }
        
        .floating-input:focus + .floating-label,
        .floating-input.has-value + .floating-label {
          top: -10px;
          transform: translateY(0);
          font-size: 13px;
          font-weight: 500;
          color: #6B7280;
        }
        
        .floating-input:focus + .floating-label {
          color: #111827;
        }
      `}</style>
      
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black italic text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', 'Inter', sans-serif", letterSpacing: '-0.02em' }}>
            KREAM
          </h1>
          <p className="text-sm text-gray-500 font-semibold tracking-widest">
            KICKS RULE EVERYTHING AROUND ME
          </p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이메일 입력 */}
            <div className="floating-wrapper w-full">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`floating-input ${email ? 'has-value' : ''}`}
              />
              <label htmlFor="email" className="floating-label">
                이메일 주소
              </label>
            </div>

            {/* 비밀번호 입력 */}
            <div className="floating-wrapper w-full">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`floating-input ${password ? 'has-value' : ''}`}
              />
              <label htmlFor="password" className="floating-label">
                비밀번호
              </label>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full bg-white text-gray-900 py-4 rounded-xl font-semibold border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 mt-8"
            >
              로그인
            </button>
          </form>

          {/* 추가 링크 */}
          <div className="mt-8 flex justify-center gap-5 text-sm">
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              이메일 찾기
            </button>
            <span className="text-gray-300">|</span>
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              비밀번호 찾기
            </button>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>© 2024 KREAM ERP System v1.0</p>
        </div>
      </div>
    </div>
  )
}

