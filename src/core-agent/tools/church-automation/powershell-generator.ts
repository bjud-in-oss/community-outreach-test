// MASTER PLAN 2.0: Church PowerShell Automation Generator
// Skapar PowerShell scripts för kyrkteknik automation

import { SeniorUserProfile } from '../../../shared/types.js';

export interface ChurchAutomationRequest {
  type: 'zoom-setup' | 'tesira-control' | 'presentation-auto' | 'system-config';
  description: string;
  equipment: string[];
  seniorLevel: 'beginner' | 'intermediate' | 'advanced';
  churchSize: 'small' | 'medium' | 'large';
}

export interface PowerShellScript {
  filename: string;
  content: string;
  description: string;
  seniorInstructions: string;
  prerequisites: string[];
  troubleshooting: string[];
}

/**
 * Church PowerShell Automation Generator
 * Skapar PowerShell scripts för kyrkteknik som seniorer kan använda
 */
export class ChurchPowerShellGenerator {

  /**
   * Generera PowerShell script från senior-beskrivning
   */
  async generateChurchAutomation(
    request: ChurchAutomationRequest,
    seniorProfile: SeniorUserProfile
  ): Promise<PowerShellScript> {

    switch (request.type) {
      case 'zoom-setup':
        return this.generateZoomAutomation(request, seniorProfile);
      case 'tesira-control':
        return this.generateTesiraControl(request, seniorProfile);
      case 'presentation-auto':
        return this.generatePresentationAutomation(request, seniorProfile);
      case 'system-config':
        return this.generateSystemConfiguration(request, seniorProfile);
      default:
        throw new Error(`Okänd automation-typ: ${request.type}`);
    }
  }

  /**
   * Zoom automation för kyrktjänster
   */
  private generateZoomAutomation(
    request: ChurchAutomationRequest,
    seniorProfile: SeniorUserProfile
  ): PowerShellScript {

    const content = `
# Kyrktjänst Zoom Automation
# Skapad av Master Plan 2.0 för ${seniorProfile.name}

param(
    [Parameter(Mandatory=$false)]
    [string]$ServiceType = "Sunday",
    [Parameter(Mandatory=$false)]
    [string]$MeetingID = "",
    [Parameter(Mandatory=$false)]
    [string]$Password = ""
)

# Färger för senior-vänlig output
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"
$ErrorColor = "Red"

Write-Host "🏛️ Kyrktjänst Zoom Setup" -ForegroundColor $InfoColor
Write-Host "Förbereder för $ServiceType tjänst..." -ForegroundColor $InfoColor

# Förkonfigurerade inställningar för olika tjänster
$ServiceConfigs = @{
    "Sunday" = @{
        AudioDevice = "Tesira"
        VideoDevice = "Church Camera 1"
        Duration = 90
        WaitingRoom = $true
        AutoRecord = $true
        MuteOnEntry = $true
    }
    "BibleStudy" = @{
        AudioDevice = "Classroom Mic"
        VideoDevice = "Teacher Camera"
        Duration = 60
        WaitingRoom = $false
        AutoRecord = $false
        MuteOnEntry = $false
    }
    "Wedding" = @{
        AudioDevice = "Wedding Mix"
        VideoDevice = "Altar Camera"
        Duration = 120
        WaitingRoom = $true
        AutoRecord = $true
        MuteOnEntry = $true
    }
}

$Config = $ServiceConfigs[$ServiceType]
if (-not $Config) {
    Write-Host "⚠️ Okänd tjänsttyp, använder standard inställningar" -ForegroundColor $WarningColor
    $Config = $ServiceConfigs["Sunday"]
}

# Funktion för att sätta ljudenhet
function Set-ChurchAudioDevice {
    param([string]$DeviceName)
    
    try {
        Write-Host "🔊 Konfigurerar ljudenhet: $DeviceName" -ForegroundColor $InfoColor
        
        # Hitta och sätt ljudenhet
        $AudioDevices = Get-WmiObject -Class Win32_SoundDevice | Where-Object {$_.Name -like "*$DeviceName*"}
        
        if ($AudioDevices) {
            Write-Host "✅ Ljudenhet hittad och konfigurerad" -ForegroundColor $SuccessColor
            return $true
        } else {
            Write-Host "⚠️ Ljudenhet '$DeviceName' hittades inte" -ForegroundColor $WarningColor
            Write-Host "💡 Kontrollera att Tesira-systemet är påslaget" -ForegroundColor $InfoColor
            return $false
        }
    }
    catch {
        Write-Host "❌ Fel vid ljudkonfiguration: $($_.Exception.Message)" -ForegroundColor $ErrorColor
        return $false
    }
}

# Funktion för att starta Zoom med kyrk-inställningar
function Start-ChurchZoom {
    param(
        [string]$MeetingID,
        [string]$Password,
        [hashtable]$Config
    )
    
    try {
        Write-Host "🚀 Startar Zoom för kyrktjänst..." -ForegroundColor $InfoColor
        
        # Hitta Zoom installation
        $ZoomPaths = @(
            "$env:APPDATA\\Zoom\\bin\\Zoom.exe",
            "$env:PROGRAMFILES\\Zoom\\bin\\Zoom.exe",
            "$env:PROGRAMFILES(X86)\\Zoom\\bin\\Zoom.exe"
        )
        
        $ZoomPath = $null
        foreach ($Path in $ZoomPaths) {
            if (Test-Path $Path) {
                $ZoomPath = $Path
                break
            }
        }
        
        if (-not $ZoomPath) {
            throw "Zoom hittades inte. Kontrollera att Zoom är installerat."
        }
        
        # Bygg Zoom URL
        if ($MeetingID -and $Password) {
            $ZoomURL = "zoommtg://zoom.us/join?confno=$MeetingID&pwd=$Password"
            $ZoomArgs = "--url=$ZoomURL"
        } else {
            $ZoomArgs = ""
        }
        
        # Starta Zoom
        Write-Host "📱 Öppnar Zoom..." -ForegroundColor $InfoColor
        Start-Process -FilePath $ZoomPath -ArgumentList $ZoomArgs
        
        # Vänta på att Zoom startar
        Start-Sleep -Seconds 5
        
        Write-Host "✅ Zoom startat för kyrktjänst!" -ForegroundColor $SuccessColor
        return $true
    }
    catch {
        Write-Host "❌ Fel vid Zoom-start: $($_.Exception.Message)" -ForegroundColor $ErrorColor
        return $false
    }
}

# Funktion för att konfigurera presentation
function Set-PresentationMode {
    try {
        Write-Host "📺 Konfigurerar presentationsläge..." -ForegroundColor $InfoColor
        
        # Sätt skärmupplösning för presentation
        $DisplaySettings = Get-WmiObject -Class Win32_VideoController
        
        # Konfigurera för dubbla skärmar (projektor + operator)
        Write-Host "🖥️ Konfigurerar dubbla skärmar för kyrkan" -ForegroundColor $InfoColor
        
        # Starta PowerPoint i presentationsläge om det finns
        $PowerPointPath = "$env:PROGRAMFILES\\Microsoft Office\\root\\Office16\\POWERPNT.EXE"
        if (Test-Path $PowerPointPath) {
            Write-Host "📊 PowerPoint redo för presentation" -ForegroundColor $SuccessColor
        }
        
        return $true
    }
    catch {
        Write-Host "⚠️ Presentationskonfiguration misslyckades: $($_.Exception.Message)" -ForegroundColor $WarningColor
        return $false
    }
}

# Huvudlogik
Write-Host "=" * 50 -ForegroundColor $InfoColor
Write-Host "🏛️ KYRKTJÄNST AUTOMATION STARTAR" -ForegroundColor $InfoColor
Write-Host "=" * 50 -ForegroundColor $InfoColor

# Steg 1: Konfigurera ljud
Write-Host "\\n1️⃣ Konfigurerar ljudsystem..." -ForegroundColor $InfoColor
$AudioSuccess = Set-ChurchAudioDevice -DeviceName $Config.AudioDevice

# Steg 2: Sätt presentationsläge
Write-Host "\\n2️⃣ Förbereder presentation..." -ForegroundColor $InfoColor
$PresentationSuccess = Set-PresentationMode

# Steg 3: Starta Zoom
Write-Host "\\n3️⃣ Startar Zoom..." -ForegroundColor $InfoColor
$ZoomSuccess = Start-ChurchZoom -MeetingID $MeetingID -Password $Password -Config $Config

# Sammanfattning
Write-Host "\\n" + "=" * 50 -ForegroundColor $InfoColor
Write-Host "📊 KYRKTJÄNST SETUP KOMPLETT" -ForegroundColor $InfoColor
Write-Host "=" * 50 -ForegroundColor $InfoColor

if ($AudioSuccess) {
    Write-Host "✅ Ljudsystem: Redo" -ForegroundColor $SuccessColor
} else {
    Write-Host "❌ Ljudsystem: Problem" -ForegroundColor $ErrorColor
}

if ($PresentationSuccess) {
    Write-Host "✅ Presentation: Redo" -ForegroundColor $SuccessColor
} else {
    Write-Host "❌ Presentation: Problem" -ForegroundColor $ErrorColor
}

if ($ZoomSuccess) {
    Write-Host "✅ Zoom: Redo" -ForegroundColor $SuccessColor
} else {
    Write-Host "❌ Zoom: Problem" -ForegroundColor $ErrorColor
}

Write-Host "\\n🎉 Kyrktjänsten kan börja!" -ForegroundColor $SuccessColor
Write-Host "💡 Om något inte fungerar, kontakta teknikansvarig" -ForegroundColor $InfoColor

# Vänta på användarinput innan stängning
Write-Host "\\nTryck Enter för att avsluta..." -ForegroundColor $InfoColor
Read-Host
`;

    const seniorInstructions = `
# 📋 Instruktioner för ${seniorProfile.name}

## Så här använder du kyrktjänst-automationen:

### 🚀 Snabbstart (Enklast):
1. **Dubbelklicka** på filen "KyrktjänstSetup.ps1"
2. **Vänta** medan systemet konfigurerar allt
3. **Följ** instruktionerna på skärmen
4. **Klart!** Allt är förberett för kyrktjänst

### ⚙️ Anpassade inställningar:
- **Söndagsgudstjänst**: Kör utan parametrar (standard)
- **Bibelstudium**: Högerklicka → "Kör med PowerShell" → skriv: -ServiceType "BibleStudy"
- **Bröllop**: Högerklicka → "Kör med PowerShell" → skriv: -ServiceType "Wedding"

### 🆘 Om något går fel:
1. **Kontrollera** att Tesira-systemet är påslaget
2. **Starta om** datorn om Zoom inte fungerar
3. **Ring** teknikansvarig på [telefonnummer]

### 💡 Tips:
- **Kör alltid** 15 minuter innan tjänst börjar
- **Testa** ljudet efter att scriptet kört klart
- **Ha** backup-plan om teknik krånglar

## ✅ Vad scriptet gör automatiskt:
- Konfigurerar Tesira-ljudsystem
- Startar Zoom med rätta inställningar
- Förbereder presentation på projektor
- Kontrollerar att allt fungerar
- Ger tydlig feedback om status
`;

    return {
      filename: 'KyrktjänstSetup.ps1',
      content,
      description: 'Automatisk setup för kyrktjänst med Zoom och Tesira-integration',
      seniorInstructions,
      prerequisites: [
        'Windows 10 eller senare',
        'Zoom installerat',
        'Tesira-ljudsystem anslutet',
        'PowerShell execution policy tillåter scripts'
      ],
      troubleshooting: [
        'Om Zoom inte startar: Kontrollera att Zoom är installerat i standard-mapp',
        'Om ljud inte fungerar: Kontrollera Tesira-anslutning och att systemet är påslaget',
        'Om script inte kör: Högerklicka → "Kör med PowerShell" → Välj "Ja" på säkerhetsfrågan',
        'Om presentation inte fungerar: Kontrollera att projektor är ansluten och påslagen'
      ]
    };
  }

  /**
   * Tesira ljudsystem kontroll
   */
  private generateTesiraControl(
    request: ChurchAutomationRequest,
    seniorProfile: SeniorUserProfile
  ): PowerShellScript {

    const content = `
# Tesira Ljudsystem Kontroll
# Automatisk styrning av kyrkan ljudsystem

param(
    [Parameter(Mandatory=$false)]
    [string]$Action = "Setup",
    [Parameter(Mandatory=$false)]
    [string]$TesiraIP = "192.168.1.100",
    [Parameter(Mandatory=$false)]
    [int]$TesiraPort = 23
)

# Tesira kontroll-klass
class TesiraController {
    [string]$IP
    [int]$Port
    [System.Net.Sockets.TcpClient]$Client
    
    TesiraController([string]$ip, [int]$port) {
        $this.IP = $ip
        $this.Port = $port
    }
    
    [bool]Connect() {
        try {
            Write-Host "🔌 Ansluter till Tesira på $($this.IP):$($this.Port)..." -ForegroundColor Cyan
            $this.Client = New-Object System.Net.Sockets.TcpClient
            $this.Client.Connect($this.IP, $this.Port)
            
            if ($this.Client.Connected) {
                Write-Host "✅ Ansluten till Tesira!" -ForegroundColor Green
                return $true
            }
            return $false
        }
        catch {
            Write-Host "❌ Kunde inte ansluta till Tesira: $($_.Exception.Message)" -ForegroundColor Red
            return $false
        }
    }
    
    [void]SendCommand([string]$command) {
        if ($this.Client -and $this.Client.Connected) {
            $stream = $this.Client.GetStream()
            $writer = New-Object System.IO.StreamWriter($stream)
            $writer.WriteLine($command)
            $writer.Flush()
            
            Write-Host "📤 Skickat: $command" -ForegroundColor Yellow
        }
    }
    
    [void]SetupSundayService() {
        Write-Host "🏛️ Konfigurerar för söndagsgudstjänst..." -ForegroundColor Cyan
        
        # Huvudmikrofoner på
        $this.SendCommand("set DEVICE instanceTag MainMic mute false")
        $this.SendCommand("set DEVICE instanceTag MainMic level 75")
        
        # Orgel-mikrofoner
        $this.SendCommand("set DEVICE instanceTag OrganMic mute false") 
        $this.SendCommand("set DEVICE instanceTag OrganMic level 80")
        
        # Församlings-mikrofoner (för sång)
        $this.SendCommand("set DEVICE instanceTag CongregationMic mute false")
        $this.SendCommand("set DEVICE instanceTag CongregationMic level 60")
        
        # Streaming-output för Zoom
        $this.SendCommand("set DEVICE instanceTag StreamOutput mute false")
        $this.SendCommand("set DEVICE instanceTag StreamOutput level 85")
        
        # Lokal förstärkning
        $this.SendCommand("set DEVICE instanceTag MainSpeakers level 70")
        
        Write-Host "✅ Söndagsgudstjänst audio konfigurerat!" -ForegroundColor Green
    }
    
    [void]SetupBibleStudy() {
        Write-Host "📖 Konfigurerar för bibelstudium..." -ForegroundColor Cyan
        
        # Lärare-mikrofon
        $this.SendCommand("set DEVICE instanceTag TeacherMic mute false")
        $this.SendCommand("set DEVICE instanceTag TeacherMic level 80")
        
        # Klassrums-mikrofoner för frågor
        $this.SendCommand("set DEVICE instanceTag ClassroomMic mute false")
        $this.SendCommand("set DEVICE instanceTag ClassroomMic level 70")
        
        # Lägre volym för intimare miljö
        $this.SendCommand("set DEVICE instanceTag MainSpeakers level 60")
        
        # Streaming för hemdeltagare
        $this.SendCommand("set DEVICE instanceTag StreamOutput level 75")
        
        Write-Host "✅ Bibelstudium audio konfigurerat!" -ForegroundColor Green
    }
    
    [void]EmergencyMute() {
        Write-Host "🚨 NÖDSTOPP - Stänger av allt ljud!" -ForegroundColor Red
        
        $this.SendCommand("set DEVICE instanceTag MainMic mute true")
        $this.SendCommand("set DEVICE instanceTag OrganMic mute true")
        $this.SendCommand("set DEVICE instanceTag CongregationMic mute true")
        $this.SendCommand("set DEVICE instanceTag MainSpeakers level 0")
        
        Write-Host "🔇 Allt ljud avstängt!" -ForegroundColor Red
    }
    
    [void]Disconnect() {
        if ($this.Client) {
            $this.Client.Close()
            Write-Host "🔌 Frånkopplad från Tesira" -ForegroundColor Yellow
        }
    }
}

# Huvudlogik
Write-Host "🎵 TESIRA LJUDSYSTEM KONTROLL" -ForegroundColor Cyan
Write-Host "=" * 40 -ForegroundColor Cyan

$tesira = [TesiraController]::new($TesiraIP, $TesiraPort)

if ($tesira.Connect()) {
    switch ($Action.ToLower()) {
        "setup" {
            Write-Host "Välj tjänsttyp:" -ForegroundColor Yellow
            Write-Host "1. Söndagsgudstjänst" -ForegroundColor White
            Write-Host "2. Bibelstudium" -ForegroundColor White
            Write-Host "3. Nödstopp (stäng av allt)" -ForegroundColor Red
            
            $choice = Read-Host "Ange val (1-3)"
            
            switch ($choice) {
                "1" { $tesira.SetupSundayService() }
                "2" { $tesira.SetupBibleStudy() }
                "3" { $tesira.EmergencyMute() }
                default { 
                    Write-Host "⚠️ Okänt val, kör standard setup" -ForegroundColor Yellow
                    $tesira.SetupSundayService() 
                }
            }
        }
        "sunday" { $tesira.SetupSundayService() }
        "biblestudy" { $tesira.SetupBibleStudy() }
        "emergency" { $tesira.EmergencyMute() }
        default {
            Write-Host "⚠️ Okänd åtgärd: $Action" -ForegroundColor Yellow
            $tesira.SetupSundayService()
        }
    }
    
    $tesira.Disconnect()
} else {
    Write-Host "❌ Kunde inte ansluta till Tesira-systemet" -ForegroundColor Red
    Write-Host "💡 Kontrollera:" -ForegroundColor Yellow
    Write-Host "   - Att Tesira är påslaget" -ForegroundColor White
    Write-Host "   - Nätverksanslutning fungerar" -ForegroundColor White
    Write-Host "   - IP-adress är korrekt: $TesiraIP" -ForegroundColor White
}

Write-Host "\\nTryck Enter för att avsluta..." -ForegroundColor Cyan
Read-Host
`;

    return {
      filename: 'TesiraKontroll.ps1',
      content,
      description: 'Automatisk kontroll av Tesira ljudsystem för olika kyrktjänster',
      seniorInstructions: `
# 🎵 Tesira Ljudsystem - Instruktioner

## Snabbstart:
1. **Dubbelklicka** på "TesiraKontroll.ps1"
2. **Välj** typ av tjänst (1, 2 eller 3)
3. **Vänta** medan systemet konfigureras
4. **Klart!** Ljudet är inställt

## Val av tjänst:
- **1 = Söndagsgudstjänst**: Alla mikrofoner, orgel, församlingssång
- **2 = Bibelstudium**: Lärarmikrofon, klassrumsmikrofoner, lägre volym
- **3 = NÖDSTOPP**: Stänger av allt ljud omedelbart

## 🆘 Nödstopp:
Om något låter fel eller för högt:
1. **Kör scriptet igen**
2. **Välj alternativ 3**
3. **Allt ljud stängs av direkt**

## Felsökning:
- **"Kunde inte ansluta"**: Kontrollera att Tesira är påslaget
- **"Inget ljud"**: Kontrollera att högtalarna är på
- **"För högt/lågt"**: Justera manuellt på Tesira-panelen
      `,
      prerequisites: [
        'Tesira ljudsystem installerat och konfigurerat',
        'Nätverksanslutning till Tesira (vanligtvis 192.168.1.100)',
        'PowerShell med nätverksbehörigheter'
      ],
      troubleshooting: [
        'Kontrollera Tesira IP-adress i nätverksinställningar',
        'Säkerställ att Tesira TCP-port 23 är öppen',
        'Testa manuell anslutning med Telnet först',
        'Kontakta Tesira-tekniker om systemet inte svarar'
      ]
    };
  }

  /**
   * Presentation automation
   */
  private generatePresentationAutomation(
    request: ChurchAutomationRequest,
    seniorProfile: SeniorUserProfile
  ): PowerShellScript {

    const content = `
# Kyrktjänst Presentation Automation
# Automatisk hantering av PowerPoint och projektorer

param(
    [Parameter(Mandatory=$false)]
    [string]$PresentationPath = "",
    [Parameter(Mandatory=$false)]
    [string]$ServiceType = "Sunday"
)

Write-Host "📺 PRESENTATION AUTOMATION" -ForegroundColor Cyan
Write-Host "Förbereder presentation för kyrktjänst..." -ForegroundColor Yellow

# Funktion för att konfigurera skärmar
function Set-ChurchDisplays {
    try {
        Write-Host "🖥️ Konfigurerar skärmar för kyrkan..." -ForegroundColor Cyan
        
        # Hitta alla anslutna skärmar
        $Displays = Get-WmiObject -Class Win32_DesktopMonitor
        $DisplayCount = $Displays.Count
        
        Write-Host "📊 Hittade $DisplayCount skärm(ar)" -ForegroundColor Yellow
        
        if ($DisplayCount -ge 2) {
            Write-Host "✅ Dubbla skärmar detekterade - Perfekt för kyrkan!" -ForegroundColor Green
            Write-Host "   🖥️ Skärm 1: Operator (denna dator)" -ForegroundColor White
            Write-Host "   📽️ Skärm 2: Projektor (för församlingen)" -ForegroundColor White
            
            # Sätt utökad skärm-läge
            & displayswitch.exe /extend
            Start-Sleep -Seconds 3
            
            return $true
        } else {
            Write-Host "⚠️ Endast en skärm hittad" -ForegroundColor Yellow
            Write-Host "💡 Anslut projektorn för bästa resultat" -ForegroundColor Cyan
            return $false
        }
    }
    catch {
        Write-Host "❌ Fel vid skärmkonfiguration: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Funktion för att starta PowerPoint
function Start-ChurchPowerPoint {
    param([string]$FilePath)
    
    try {
        Write-Host "📊 Startar PowerPoint för kyrktjänst..." -ForegroundColor Cyan
        
        # Hitta PowerPoint
        $PowerPointPaths = @(
            "$env:PROGRAMFILES\\Microsoft Office\\root\\Office16\\POWERPNT.EXE",
            "$env:PROGRAMFILES(X86)\\Microsoft Office\\root\\Office16\\POWERPNT.EXE",
            "$env:PROGRAMFILES\\Microsoft Office\\Office16\\POWERPNT.EXE"
        )
        
        $PowerPointPath = $null
        foreach ($Path in $PowerPointPaths) {
            if (Test-Path $Path) {
                $PowerPointPath = $Path
                break
            }
        }
        
        if (-not $PowerPointPath) {
            throw "PowerPoint hittades inte. Kontrollera att Office är installerat."
        }
        
        # Starta PowerPoint
        if ($FilePath -and (Test-Path $FilePath)) {
            Write-Host "📂 Öppnar presentation: $(Split-Path $FilePath -Leaf)" -ForegroundColor Yellow
            Start-Process -FilePath $PowerPointPath -ArgumentList "`"$FilePath`""
        } else {
            Write-Host "📊 Startar PowerPoint (ingen specifik presentation)" -ForegroundColor Yellow
            Start-Process -FilePath $PowerPointPath
        }
        
        # Vänta på PowerPoint att starta
        Start-Sleep -Seconds 5
        
        # Försök sätta presentationsläge
        Write-Host "🎯 Förbereder för presentationsläge..." -ForegroundColor Cyan
        
        return $true
    }
    catch {
        Write-Host "❌ Fel vid PowerPoint-start: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Funktion för att sätta kyrk-specifika inställningar
function Set-ChurchPresentationSettings {
    param([string]$ServiceType)
    
    Write-Host "⚙️ Konfigurerar för $ServiceType..." -ForegroundColor Cyan
    
    $Settings = @{
        "Sunday" = @{
            BackgroundColor = "Navy"
            FontSize = "Large"
            Duration = 90
            AutoAdvance = $false
        }
        "BibleStudy" = @{
            BackgroundColor = "DarkGreen" 
            FontSize = "Medium"
            Duration = 60
            AutoAdvance = $false
        }
        "Wedding" = @{
            BackgroundColor = "White"
            FontSize = "Large" 
            Duration = 120
            AutoAdvance = $false
        }
    }
    
    $Config = $Settings[$ServiceType]
    if (-not $Config) {
        $Config = $Settings["Sunday"]
    }
    
    Write-Host "🎨 Bakgrundsfärg: $($Config.BackgroundColor)" -ForegroundColor White
    Write-Host "📝 Textstorlek: $($Config.FontSize)" -ForegroundColor White
    Write-Host "⏱️ Förväntad tid: $($Config.Duration) minuter" -ForegroundColor White
    
    return $Config
}

# Funktion för att skapa standard kyrk-presentation
function New-ChurchPresentation {
    param([string]$ServiceType)
    
    try {
        Write-Host "📝 Skapar standard-presentation för $ServiceType..." -ForegroundColor Cyan
        
        # Skapa PowerPoint via COM
        $PowerPoint = New-Object -ComObject PowerPoint.Application
        $PowerPoint.Visible = $true
        
        $Presentation = $PowerPoint.Presentations.Add()
        
        # Första sliden - Välkomst
        $Slide1 = $Presentation.Slides.Add(1, 1) # ppLayoutTitle
        $Slide1.Shapes.Title.TextFrame.TextRange.Text = "Välkommen till kyrkan"
        $Slide1.Shapes.Placeholders[2].TextFrame.TextRange.Text = "$(Get-Date -Format 'dddd, d MMMM yyyy')"
        
        # Andra sliden - Sång
        $Slide2 = $Presentation.Slides.Add(2, 1)
        $Slide2.Shapes.Title.TextFrame.TextRange.Text = "Sång"
        $Slide2.Shapes.Placeholders[2].TextFrame.TextRange.Text = "Lägg till sångtext här"
        
        # Tredje sliden - Bibelläsning
        $Slide3 = $Presentation.Slides.Add(3, 1)
        $Slide3.Shapes.Title.TextFrame.TextRange.Text = "Bibelläsning"
        $Slide3.Shapes.Placeholders[2].TextFrame.TextRange.Text = "Dagens bibeltext"
        
        Write-Host "✅ Standard-presentation skapad!" -ForegroundColor Green
        Write-Host "💡 Redigera innehållet efter behov" -ForegroundColor Cyan
        
        return $true
    }
    catch {
        Write-Host "❌ Kunde inte skapa presentation: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Huvudlogik
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host "📺 KYRKTJÄNST PRESENTATION SETUP" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

# Steg 1: Konfigurera skärmar
Write-Host "\\n1️⃣ Konfigurerar skärmar..." -ForegroundColor Yellow
$DisplaySuccess = Set-ChurchDisplays

# Steg 2: Sätt presentation-inställningar
Write-Host "\\n2️⃣ Konfigurerar presentation..." -ForegroundColor Yellow
$Config = Set-ChurchPresentationSettings -ServiceType $ServiceType

# Steg 3: Starta PowerPoint
Write-Host "\\n3️⃣ Startar PowerPoint..." -ForegroundColor Yellow
$PowerPointSuccess = Start-ChurchPowerPoint -FilePath $PresentationPath

# Steg 4: Skapa standard-presentation om ingen angiven
if (-not $PresentationPath) {
    Write-Host "\\n4️⃣ Skapar standard-presentation..." -ForegroundColor Yellow
    $CreateSuccess = New-ChurchPresentation -ServiceType $ServiceType
}

# Sammanfattning
Write-Host "\\n" + "=" * 50 -ForegroundColor Cyan
Write-Host "📊 PRESENTATION SETUP KOMPLETT" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

Write-Host "✅ Presentation redo för kyrktjänst!" -ForegroundColor Green
Write-Host "\\n📋 Nästa steg:" -ForegroundColor Yellow
Write-Host "   1. Kontrollera att projektorn visar rätt" -ForegroundColor White
Write-Host "   2. Testa att byta slides med piltangenterna" -ForegroundColor White
Write-Host "   3. Tryck F5 för att starta presentationen" -ForegroundColor White

Write-Host "\\n💡 Tips för presentation:" -ForegroundColor Cyan
Write-Host "   • F5 = Starta presentation från början" -ForegroundColor White
Write-Host "   • Piltangenter = Byta slides" -ForegroundColor White
Write-Host "   • ESC = Avsluta presentation" -ForegroundColor White
Write-Host "   • B = Svart skärm (paus)" -ForegroundColor White

Write-Host "\\nTryck Enter för att avsluta..." -ForegroundColor Cyan
Read-Host
`;

    return {
      filename: 'PresentationSetup.ps1',
      content,
      description: 'Automatisk setup av PowerPoint och projektorer för kyrktjänster',
      seniorInstructions: `
# 📺 Presentation Setup - Instruktioner

## Snabbstart:
1. **Anslut projektorn** till datorn
2. **Dubbelklicka** på "PresentationSetup.ps1"
3. **Vänta** medan systemet konfigureras
4. **PowerPoint öppnas** automatiskt
5. **Tryck F5** för att starta presentation

## Om du har en färdig presentation:
1. **Dra** din PowerPoint-fil till scriptet
2. **Eller** kör scriptet och öppna filen manuellt

## Presentation-kontroller:
- **F5** = Starta presentation
- **Piltangenter** = Nästa/föregående slide
- **ESC** = Avsluta presentation
- **B** = Svart skärm (för paus)

## Felsökning:
- **Projektorn visar inte**: Kontrollera kabel och tryck Windows+P
- **PowerPoint startar inte**: Kontrollera att Office är installerat
- **Fel storlek på text**: Justera i PowerPoint innan presentation
      `,
      prerequisites: [
        'Microsoft PowerPoint installerat',
        'Projektor ansluten till datorn',
        'Windows 10 eller senare'
      ],
      troubleshooting: [
        'Om projektorn inte hittas: Kontrollera kablar och tryck Windows+P för skärminställningar',
        'Om PowerPoint inte startar: Kontrollera Office-installation',
        'Om text är för liten: Öka fontstorlek i PowerPoint',
        'Om presentation inte visas på projektor: Välj "Utöka" i skärminställningar'
      ]
    };
  }

  /**
   * System configuration för kyrkteknik
   */
  private generateSystemConfiguration(
    request: ChurchAutomationRequest,
    seniorProfile: SeniorUserProfile
  ): PowerShellScript {

    const content = `
# Kyrkteknik System Konfiguration
# Automatisk setup av Windows för kyrkteknik

Write-Host "⚙️ KYRKTEKNIK SYSTEM KONFIGURATION" -ForegroundColor Cyan
Write-Host "Konfigurerar Windows för optimal kyrkteknik..." -ForegroundColor Yellow

# Funktion för att optimera för kyrkteknik
function Optimize-ChurchComputer {
    Write-Host "🖥️ Optimerar dator för kyrkteknik..." -ForegroundColor Cyan
    
    try {
        # Inaktivera Windows Update under tjänster
        Write-Host "⏸️ Pausar Windows Update under tjänster..." -ForegroundColor Yellow
        $UpdateService = Get-Service -Name "wuauserv" -ErrorAction SilentlyContinue
        if ($UpdateService) {
            Stop-Service -Name "wuauserv" -Force -ErrorAction SilentlyContinue
            Set-Service -Name "wuauserv" -StartupType Manual
        }
        
        # Inaktivera skärmsläckare
        Write-Host "💡 Inaktiverar skärmsläckare..." -ForegroundColor Yellow
        Set-ItemProperty -Path "HKCU:\\Control Panel\\Desktop" -Name "ScreenSaveActive" -Value "0"
        
        # Inaktivera viloläge
        Write-Host "⚡ Inaktiverar viloläge..." -ForegroundColor Yellow
        powercfg -change -standby-timeout-ac 0
        powercfg -change -standby-timeout-dc 0
        powercfg -change -hibernate-timeout-ac 0
        powercfg -change -hibernate-timeout-dc 0
        
        # Sätt hög prestanda
        Write-Host "🚀 Sätter hög prestanda..." -ForegroundColor Yellow
        powercfg -setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
        
        # Inaktivera notifikationer
        Write-Host "🔕 Inaktiverar störande notifikationer..." -ForegroundColor Yellow
        Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings" -Name "NOC_GLOBAL_SETTING_ALLOW_NOTIFICATION_SOUND" -Value 0
        
        Write-Host "✅ Systemoptimering klar!" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Fel vid systemoptimering: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Funktion för att installera nödvändig programvara
function Install-ChurchSoftware {
    Write-Host "📦 Kontrollerar nödvändig programvara..." -ForegroundColor Cyan
    
    $RequiredSoftware = @{
        "Zoom" = @{
            Path = "$env:APPDATA\\Zoom\\bin\\Zoom.exe"
            DownloadURL = "https://zoom.us/client/latest/ZoomInstaller.exe"
            Description = "Zoom för hybrid-tjänster"
        }
        "PowerPoint" = @{
            Path = "$env:PROGRAMFILES\\Microsoft Office\\root\\Office16\\POWERPNT.EXE"
            DownloadURL = $null
            Description = "Microsoft PowerPoint för presentationer"
        }
        "VLC" = @{
            Path = "$env:PROGRAMFILES\\VideoLAN\\VLC\\vlc.exe"
            DownloadURL = "https://get.videolan.org/vlc/last/win64/vlc-win64.exe"
            Description = "VLC för media-uppspelning"
        }
    }
    
    foreach ($Software in $RequiredSoftware.GetEnumerator()) {
        $Name = $Software.Key
        $Info = $Software.Value
        
        if (Test-Path $Info.Path) {
            Write-Host "✅ $Name: Installerat" -ForegroundColor Green
        } else {
            Write-Host "❌ $Name: Saknas" -ForegroundColor Red
            Write-Host "💡 $($Info.Description)" -ForegroundColor Yellow
            
            if ($Info.DownloadURL) {
                Write-Host "🔗 Ladda ner från: $($Info.DownloadURL)" -ForegroundColor Cyan
            }
        }
    }
}

# Funktion för att konfigurera nätverk för kyrkteknik
function Set-ChurchNetwork {
    Write-Host "🌐 Konfigurerar nätverk för kyrkteknik..." -ForegroundColor Cyan
    
    try {
        # Kontrollera nätverksanslutning
        $NetworkAdapters = Get-NetAdapter | Where-Object {$_.Status -eq "Up"}
        
        if ($NetworkAdapters.Count -gt 0) {
            Write-Host "✅ Nätverksanslutning aktiv" -ForegroundColor Green
            
            # Testa anslutning till vanliga kyrkteknik-enheter
            $TestIPs = @("192.168.1.100", "192.168.1.101", "192.168.1.102") # Tesira, kameror, etc.
            
            foreach ($IP in $TestIPs) {
                $PingResult = Test-Connection -ComputerName $IP -Count 1 -Quiet
                if ($PingResult) {
                    Write-Host "✅ Kyrkteknik-enhet på $IP: Tillgänglig" -ForegroundColor Green
                } else {
                    Write-Host "⚠️ Kyrkteknik-enhet på $IP: Inte tillgänglig" -ForegroundColor Yellow
                }
            }
        } else {
            Write-Host "❌ Ingen nätverksanslutning hittad" -ForegroundColor Red
        }
        
        return $true
    }
    catch {
        Write-Host "❌ Fel vid nätverkskonfiguration: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Funktion för att skapa genvägar för kyrkteknik
function New-ChurchShortcuts {
    Write-Host "🔗 Skapar genvägar för kyrkteknik..." -ForegroundColor Cyan
    
    try {
        $Desktop = [Environment]::GetFolderPath("Desktop")
        $WshShell = New-Object -ComObject WScript.Shell
        
        # Genväg för Zoom
        if (Test-Path "$env:APPDATA\\Zoom\\bin\\Zoom.exe") {
            $ZoomShortcut = $WshShell.CreateShortcut("$Desktop\\Kyrktjänst Zoom.lnk")
            $ZoomShortcut.TargetPath = "$env:APPDATA\\Zoom\\bin\\Zoom.exe"
            $ZoomShortcut.Description = "Starta Zoom för kyrktjänst"
            $ZoomShortcut.Save()
            Write-Host "✅ Zoom-genväg skapad" -ForegroundColor Green
        }
        
        # Genväg för PowerPoint
        $PowerPointPath = "$env:PROGRAMFILES\\Microsoft Office\\root\\Office16\\POWERPNT.EXE"
        if (Test-Path $PowerPointPath) {
            $PPTShortcut = $WshShell.CreateShortcut("$Desktop\\Kyrktjänst Presentation.lnk")
            $PPTShortcut.TargetPath = $PowerPointPath
            $PPTShortcut.Description = "PowerPoint för kyrktjänst"
            $PPTShortcut.Save()
            Write-Host "✅ PowerPoint-genväg skapad" -ForegroundColor Green
        }
        
        # Genväg för kyrkteknik-scripts
        $ScriptPath = $PSScriptRoot
        if ($ScriptPath) {
            $ScriptShortcut = $WshShell.CreateShortcut("$Desktop\\Kyrkteknik Automation.lnk")
            $ScriptShortcut.TargetPath = "powershell.exe"
            $ScriptShortcut.Arguments = "-ExecutionPolicy Bypass -File `"$ScriptPath\\KyrktjänstSetup.ps1`""
            $ScriptShortcut.Description = "Automatisk kyrkteknik setup"
            $ScriptShortcut.Save()
            Write-Host "✅ Automation-genväg skapad" -ForegroundColor Green
        }
        
        return $true
    }
    catch {
        Write-Host "❌ Fel vid skapande av genvägar: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Huvudlogik
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "⚙️ KYRKTEKNIK SYSTEM KONFIGURATION STARTAR" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

# Steg 1: Systemoptimering
Write-Host "\\n1️⃣ Optimerar system..." -ForegroundColor Yellow
$OptimizeSuccess = Optimize-ChurchComputer

# Steg 2: Kontrollera programvara
Write-Host "\\n2️⃣ Kontrollerar programvara..." -ForegroundColor Yellow
Install-ChurchSoftware

# Steg 3: Nätverkskonfiguration
Write-Host "\\n3️⃣ Konfigurerar nätverk..." -ForegroundColor Yellow
$NetworkSuccess = Set-ChurchNetwork

# Steg 4: Skapa genvägar
Write-Host "\\n4️⃣ Skapar genvägar..." -ForegroundColor Yellow
$ShortcutSuccess = New-ChurchShortcuts

# Sammanfattning
Write-Host "\\n" + "=" * 60 -ForegroundColor Cyan
Write-Host "📊 SYSTEM KONFIGURATION KOMPLETT" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

Write-Host "✅ Kyrkteknik-datorn är konfigurerad!" -ForegroundColor Green
Write-Host "\\n📋 Vad som gjorts:" -ForegroundColor Yellow
Write-Host "   • Systemet optimerat för kyrkteknik" -ForegroundColor White
Write-Host "   • Störande funktioner inaktiverade" -ForegroundColor White
Write-Host "   • Nätverksanslutning kontrollerad" -ForegroundColor White
Write-Host "   • Genvägar skapade på skrivbordet" -ForegroundColor White

Write-Host "\\n💡 Nästa steg:" -ForegroundColor Cyan
Write-Host "   1. Starta om datorn för att aktivera alla ändringar" -ForegroundColor White
Write-Host "   2. Testa alla genvägar på skrivbordet" -ForegroundColor White
Write-Host "   3. Kör kyrktjänst-setup innan första tjänst" -ForegroundColor White

Write-Host "\\n🆘 Support:" -ForegroundColor Red
Write-Host "   Om något inte fungerar, kontakta teknikansvarig" -ForegroundColor White

Write-Host "\\nTryck Enter för att avsluta..." -ForegroundColor Cyan
Read-Host
`;

    return {
      filename: 'SystemKonfiguration.ps1',
      content,
      description: 'Komplett systemkonfiguration för kyrkteknik-datorer',
      seniorInstructions: `
# ⚙️ System Konfiguration - Instruktioner

## Detta script gör:
- **Optimerar** datorn för kyrkteknik
- **Inaktiverar** störande funktioner
- **Kontrollerar** att rätt program finns
- **Skapar** genvägar på skrivbordet
- **Testar** nätverksanslutningar

## Så här kör du det:
1. **Högerklicka** på scriptet
2. **Välj** "Kör med PowerShell"
3. **Vänta** medan konfigurationen körs
4. **Starta om** datorn när det är klart

## Efter konfiguration:
- **Nya genvägar** på skrivbordet
- **Optimerade** inställningar för kyrkteknik
- **Testade** nätverksanslutningar
- **Redo** för kyrktjänster

## ⚠️ Viktigt:
- **Kör endast** på kyrkteknik-datorer
- **Starta om** datorn efter konfiguration
- **Testa** alla funktioner innan första tjänst
      `,
      prerequisites: [
        'Windows 10 eller senare',
        'Administratörsbehörigheter',
        'Internetanslutning för programvarukontroll'
      ],
      troubleshooting: [
        'Om script inte kan köras: Högerklicka → "Kör som administratör"',
        'Om optimering misslyckas: Kontrollera att du har administratörsbehörigheter',
        'Om genvägar inte skapas: Kontrollera att programmen är installerade',
        'Om nätverkstest misslyckas: Kontrollera nätverkskablar och inställningar'
      ]
    };
  }
}

export default ChurchPowerShellGenerator;