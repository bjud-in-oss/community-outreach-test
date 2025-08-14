// MASTER PLAN 2.0: Static Deployment Script
// STATUS: Deploy Senior Cockpit som statisk site
// INTEGRATION: Enkel deployment utan TypeScript-kompilering

const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying Master Plan 2.0 - Static Version...');

// Skapa dist-katalog
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Kopiera statiska filer
const staticFiles = [
  'public/senior-cockpit.html',
  'public/dashboard.html',
  'src/conscious-agent/senior-cockpit/accessibility/senior-accessibility.css'
];

staticFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const fileName = path.basename(file);
    fs.copyFileSync(file, path.join('dist', fileName));
    console.log(`✅ Copied ${fileName}`);
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});

// Skapa en enkel index.html som visar Senior Cockpit
const indexHtml = `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Master Plan 2.0 - Senior Cockpit</title>
    <link rel="stylesheet" href="senior-accessibility.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .senior-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .welcome-message {
            text-align: center;
            margin-bottom: 40px;
        }
        .project-overview {
            background: #e3f2fd;
            padding: 24px;
            border-radius: 8px;
            margin-bottom: 24px;
        }
        .progress-bar {
            background: #e0e0e0;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            margin: 16px 0;
        }
        .progress-fill {
            background: #4caf50;
            height: 100%;
            width: 75%;
            transition: width 0.3s ease;
        }
        .next-steps {
            background: #f0fff4;
            padding: 24px;
            border-radius: 8px;
            border-left: 4px solid #4caf50;
        }
        .celebration {
            background: #fff3e0;
            padding: 24px;
            border-radius: 8px;
            text-align: center;
            margin-top: 24px;
        }
    </style>
</head>
<body class="senior-optimized">
    <div class="senior-container">
        <div class="welcome-message">
            <h1>🎉 Välkommen till ditt projekt!</h1>
            <p style="font-size: 18px; color: #666;">Vi är så glada att du är här. Låt oss bygga något fantastiskt tillsammans.</p>
        </div>

        <div class="project-overview">
            <h2>📊 Ditt Projekt</h2>
            <p><strong>Projektnamn:</strong> Community Outreach Platform</p>
            <p><strong>Beskrivning:</strong> Ett spännande projekt som växer och utvecklas</p>
            <p><strong>Aktuell fas:</strong> Utveckling - Vi skapar huvudfunktionerna</p>
            
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <p style="text-align: center; margin: 0;"><strong>75% slutfört</strong></p>
        </div>

        <div class="next-steps">
            <h3>🎯 Nästa Steg</h3>
            <ul>
                <li>✅ Vi har skapat en solid grund för ditt projekt</li>
                <li>✅ Alla säkerhetssystem är på plats och fungerar</li>
                <li>🎯 Nästa: Vi lägger till fler användbara funktioner</li>
                <li>🎯 Ditt projekt kommer att bli redo för dina första användare</li>
            </ul>
        </div>

        <div class="celebration">
            <h3>🎉 Fantastiska Framsteg!</h3>
            <p>Du har gjort otroliga framsteg! Ditt projekt växer från en idé till verklighet, och vi är så glada att få vara en del av denna resa tillsammans med dig.</p>
            <p><strong>Fortsätt så här - du gör det fantastiskt!</strong></p>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 14px;">
                Master Plan 2.0 - Teknik som känns som en varm kram från ett barnbarn 💝
            </p>
        </div>
    </div>

    <script>
        // Enkel interaktivitet för demo
        console.log('🎭 Senior Cockpit loaded successfully!');
        
        // Simulera real-time uppdateringar
        setTimeout(() => {
            const celebration = document.querySelector('.celebration');
            if (celebration) {
                celebration.innerHTML += '<p style="color: #4caf50; font-weight: bold;">📈 Ny uppdatering: Allt fungerar perfekt!</p>';
            }
        }, 3000);

        // Accessibility enhancements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                console.log('♿ Keyboard navigation active');
            }
        });

        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.textContent = 'Välkommen till ditt projekt. Allt är redo för dig.';
        }, 1000);
    </script>
</body>
</html>
`;

fs.writeFileSync('dist/index.html', indexHtml);
console.log('✅ Created index.html');

// Skapa en enkel vercel.json för deployment
const vercelConfig = {
  "version": 2,
  "builds": [
    {
      "src": "dist/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
console.log('✅ Created vercel.json');

console.log('\n🎉 Static deployment ready!');
console.log('📁 Files in dist/:');
fs.readdirSync('dist').forEach(file => {
  console.log(`   - ${file}`);
});

console.log('\n🚀 Ready to deploy:');
console.log('   vercel --prod');
console.log('\n💝 Master Plan 2.0 - Senior Cockpit is ready for the world!');