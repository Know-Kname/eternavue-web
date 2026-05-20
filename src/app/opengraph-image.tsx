import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'deathcare.live — Community & Legislative Intelligence for Deathcare Professionals'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: 'linear-gradient(135deg, #0a1f1f 0%, #0d3333 40%, #01696f 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '64px 72px',
        position: 'relative',
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* Subtle dot-grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          borderRadius: 0,
        }}
      />

      {/* Accent glow */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Logo row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#0d9488',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 3,
              height: 28,
              background: 'white',
              borderRadius: 2,
              position: 'absolute',
            }}
          />
        </div>
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.5px',
          }}
        >
          deathcare
          <span style={{ color: '#2dd4bf' }}>.live</span>
        </span>
        <div
          style={{
            marginLeft: 8,
            background: 'rgba(45, 212, 191, 0.15)',
            border: '1px solid rgba(45,212,191,0.3)',
            borderRadius: 100,
            padding: '4px 12px',
            fontSize: 13,
            color: '#2dd4bf',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Michigan launch
        </div>
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.1,
          letterSpacing: '-1.5px',
          marginBottom: 20,
          maxWidth: 780,
        }}
      >
        Where deathcare<br />professionals make{' '}
        <span style={{ color: '#5eead4' }}>policy move.</span>
      </div>

      {/* Subline */}
      <div
        style={{
          fontSize: 22,
          color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.5,
          marginBottom: 40,
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 400,
        }}
      >
        Track legislation · Share field knowledge · Build coalitions
      </div>

      {/* Feature chips */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 'auto' }}>
        {[
          { label: 'Legislative Intel', color: '#d19900', bg: 'rgba(209,153,0,0.15)' },
          { label: 'Verified Community', color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)' },
          { label: 'Industry Directory', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
        ].map((chip) => (
          <div
            key={chip.label}
            style={{
              background: chip.bg,
              border: `1px solid ${chip.color}40`,
              borderRadius: 100,
              padding: '8px 18px',
              fontSize: 15,
              color: chip.color,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 500,
            }}
          >
            {chip.label}
          </div>
        ))}
      </div>

      {/* Stats bar at bottom */}
      <div
        style={{
          display: 'flex',
          gap: 48,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 28,
          marginTop: 24,
        }}
      >
        {[
          { value: '7', label: 'Active bills' },
          { value: '142', label: 'Verified members' },
          { value: '5', label: 'States covered' },
          { value: '100', label: 'Years of DMP legacy' },
        ].map((stat) => (
          <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#2dd4bf',
                lineHeight: 1,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  )
}
