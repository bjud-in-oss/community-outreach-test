import QRCode from 'qrcode.react';

type Props = {
  previewUrl: string;
};

export default function PreviewBanner({ previewUrl }: Props) {
  return (
    <div
      style={{
        backgroundColor: '#ff0000',
        color: '#ffffff',
        padding: '1rem',
        textAlign: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: '9999',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ margin: '0', marginRight: '1rem' }}>PREVIEW - NOT PRODUCTION</h2>
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            textDecoration: 'none',
            marginRight: '1rem',
          }}
        >
          🔗 Test Live
        </a>
        <QRCode value={previewUrl} size={64} />
      </div>
    </div>
  );
}
