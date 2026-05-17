import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'deathcare.live — The Deathcare Industry Hub'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: 'linear-gradient(135deg, #5C7A5C 0%, #4a6a4a 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'serif',
        padding: '80px',
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: 'white',
          letterSpacing: '-2px',
          marginBottom: 24,
        }}
      >
        deathcare
        <span style={{ color: '#C9A84C' }}>.live</span>
      </div>
      <div
        style={{
          fontSize: 28,
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center',
          maxWidth: 700,
          lineHeight: 1.4,
        }}
      >
        The comprehensive directory and resource hub for the deathcare industry
      </div>
    </div>,
    { ...size }
  )
}
