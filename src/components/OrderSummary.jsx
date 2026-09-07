import React from 'react';

const OrderSummary = ({ configData, onExport }) => {
  const {
    terminals = [],
    dbServers = [],
    autoWheels = [],
    liveServers = [],
    streamServersCount = 0,
    remoteServers = [],
    animationPcsCount = 0,
    resultPcsCount = 0,
    flyingServers = [],
  } = configData || {};

  // Gruppierung für Terminals
  const groupTerminals = () => {
    const map = {};
    terminals.forEach((t) => {
      const key = t.type || 'Terminal';
      if (!map[key]) map[key] = { name: t.type || 'Terminal', qty: 0 };
      map[key].qty += Number(t.quantity) || 1;
    });
    return Object.values(map);
  };

  const groupDbServers = () => {
    const map = {};
    dbServers.forEach((db) => {
      const key = `${db.gameType || db.model || 'DB Server'} (${db.housing || db.execution || 'Standard'})`;
      if (!map[key]) map[key] = { name: db.gameType || db.model || 'DB Server', execution: db.housing || db.execution || 'Standard', qty: 0 };
      map[key].qty += Number(db.quantity) || 1;
    });
    return Object.values(map);
  };

  // Erweiterte Gruppierung für FS593 Auto Wheels (inkl. Spiel, Wheel-Typ, Mount und Zero-Variante)
  const groupAutoWheels = () => {
    const map = {};
    autoWheels.forEach((w) => {
      const key = `${w.gameType || 'Multi Game'} - ${w.wheelType || 'Standard Wheel'} - Mount: ${w.mount || 'N/A'} - Zero: ${w.zeroVariant || 'Standard'}`;
      if (!map[key]) {
        map[key] = {
          game: w.gameType || 'Multi Game',
          wheel: w.wheelType || 'Standard Wheel',
          mount: w.mount || 'Standard',
          zero: w.zeroVariant || 'Standard',
          qty: 0,
        };
      }
      map[key].qty += Number(w.quantity) || 1;
    });
    return Object.values(map);
  };

  const groupLiveServers = () => {
    const map = {};
    liveServers.forEach((l) => {
      const key = `${l.gameType} (${l.displaySize}) [Mount: ${l.mount}]`;
      if (!map[key]) map[key] = { name: l.gameType, display: l.displaySize, mount: l.mount || 'Standard', qty: 0 };
      map[key].qty += Number(l.quantity) || 1;
    });
    return Object.values(map);
  };

  const groupFlyingServers = () => {
    const map = {};
    flyingServers.forEach((f) => {
      const key = `${f.gameType} - ${f.caseType || 'Standard Case'}`;
      if (!map[key]) map[key] = { name: f.gameType, caseType: f.caseType || 'Standard Case', qty: 0 };
      map[key].qty += Number(f.quantity) || 1;
    });
    return Object.values(map);
  };

  const groupRemoteServers = () => {
    const map = {};
    remoteServers.forEach((r) => {
      const key = r.gameType || 'Remote Game';
      if (!map[key]) map[key] = { name: r.gameType || 'Remote Game', qty: 0 };
      map[key].qty += Number(r.quantity) || 1;
    });
    return Object.values(map);
  };

  const summaryTerminals = groupTerminals();
  const summaryDbServers = groupDbServers();
  const summaryAutoWheels = groupAutoWheels();
  const summaryLiveServers = groupLiveServers();
  const summaryFlyingServers = groupFlyingServers();
  const summaryRemoteServers = groupRemoteServers();

  const totalUnits = 
    summaryTerminals.reduce((acc, x) => acc + x.qty, 0) +
    summaryDbServers.reduce((acc, x) => acc + x.qty, 0) +
    summaryAutoWheels.reduce((acc, x) => acc + x.qty, 0) +
    summaryLiveServers.reduce((acc, x) => acc + x.qty, 0) +
    streamServersCount +
    summaryFlyingServers.reduce((acc, x) => acc + x.qty, 0) +
    summaryRemoteServers.reduce((acc, x) => acc + x.qty, 0) +
    animationPcsCount +
    resultPcsCount;

  const handleDirectPdfDownload = () => {
    const element = document.getElementById('invoice-printable-area');
    if (window.html2pdf) {
      const opt = {
        margin:       10,
        filename:     'NovoUnity_Configuration_Analysis.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
      };
      window.html2pdf().from(element).set(opt).save();
    } else {
      window.print();
    }
  };

  const currentDate = new Date().toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="terminal-card invoice-wrapper" id="invoice-printable-area">
      <div className="invoice-header">
        <div>
          <h2 className="invoice-company">Novo Unity Pro — System-Auswertung & Übersicht</h2>
          <p className="text-muted invoice-subtitle">Detaillierte Übersicht aller Konfigurationsschritte und Komponenten</p>
        </div>
        <div className="invoice-meta">
          <p><strong>Datum:</strong> {currentDate}</p>
          <p><strong>Status:</strong> <span className="text-success">● Konfiguriert</span></p>
          <p><strong>Gesamteinheiten:</strong> {totalUnits} Units</p>
        </div>
      </div>

      <hr className="invoice-divider" />

      <div className="invoice-body analysis-body">
        {totalUnits === 0 ? (
          <div className="empty-state">
            Keine Konfigurationsdaten vorhanden. Bitte schließen Sie die Konfigurationsschritte ab.
          </div>
        ) : (
          <div className="analysis-sections-container">

            {/* 1. Terminals */}
            {summaryTerminals.length > 0 && (
              <div className="analysis-section-block">
                <h4 className="analysis-category-title">1. Terminals & Hardware Units</h4>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Terminal Modell</th>
                      <th className="text-right">Anzahl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryTerminals.map((item, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold">{item.name}</td>
                        <td className="text-right font-bold">{item.qty}×</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 2. Database Servers */}
            {summaryDbServers.length > 0 && (
              <div className="analysis-section-block">
                <h4 className="analysis-category-title">2. Database Servers</h4>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Spiel / System</th>
                      <th>Ausführung / Gehäuse</th>
                      <th className="text-right">Anzahl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryDbServers.map((item, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold">{item.name}</td>
                        <td className="text-muted">{item.execution}</td>
                        <td className="text-right font-bold">{item.qty}×</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. FS593 Auto Wheels (Mit Spiel, Wheel-Typ, Mount und 0-Variante) */}
            {summaryAutoWheels.length > 0 && (
              <div className="analysis-section-block">
                <h4 className="analysis-category-title">3. FS593 Auto Wheels</h4>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Multi Game Typ</th>
                      <th>Wheel Variante</th>
                      <th>Kamera Mount</th>
                      <th>0-Variante</th>
                      <th className="text-right">Anzahl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryAutoWheels.map((item, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold">{item.game}</td>
                        <td>{item.wheel}</td>
                        <td className="text-muted">{item.mount}</td>
                        <td>{item.zero}</td>
                        <td className="text-right font-bold">{item.qty}×</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 4. FS695 Live Game Servers */}
            {summaryLiveServers.length > 0 && (
              <div className="analysis-section-block">
                <h4 className="analysis-category-title">4. FS695 Live Game Servers</h4>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>TouchBet Spiel</th>
                      <th>Display Größe</th>
                      <th>Kamera Mount</th>
                      <th className="text-right">Anzahl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryLiveServers.map((item, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold">{item.name}</td>
                        <td>{item.display}</td>
                        <td className="text-muted">{item.mount}</td>
                        <td className="text-right font-bold">{item.qty}×</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 5. Flying Game Servers */}
            {summaryFlyingServers.length > 0 && (
              <div className="analysis-section-block">
                <h4 className="analysis-category-title">5. Flying Game Servers</h4>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Spieltyp</th>
                      <th>Gehäuse / Variante</th>
                      <th className="text-right">Anzahl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryFlyingServers.map((item, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold">{item.name}</td>
                        <td className="text-muted">{item.caseType}</td>
                        <td className="text-right font-bold">{item.qty}×</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 6. Remote Game Servers Booksize */}
            {summaryRemoteServers.length > 0 && (
              <div className="analysis-section-block">
                <h4 className="analysis-category-title">6. Remote Game Servers (Booksize)</h4>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Remote Spieltyp</th>
                      <th className="text-right">Anzahl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryRemoteServers.map((item, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold">{item.name}</td>
                        <td className="text-right font-bold">{item.qty}×</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 7. Infrastruktur & Zusätze */}
            <div className="analysis-section-block">
              <h4 className="analysis-category-title">7. Infrastruktur & Zusätze</h4>
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Komponente</th>
                    <th>Beschreibung</th>
                    <th className="text-right">Anzahl</th>
                  </tr>
                </thead>
                <tbody>
                  {streamServersCount > 0 && (
                    <tr>
                      <td className="font-semibold">Stream Server</td>
                      <td className="text-muted">Netzwerk Streaming-Infrastruktur</td>
                      <td className="text-right font-bold">{streamServersCount}×</td>
                    </tr>
                  )}
                  {animationPcsCount > 0 && (
                    <tr>
                      <td className="font-semibold">Animation PCs</td>
                      <td className="text-muted">Visual Effects Rendering Hardware</td>
                      <td className="text-right font-bold">{animationPcsCount}×</td>
                    </tr>
                  )}
                  {resultPcsCount > 0 && (
                    <tr>
                      <td className="font-semibold">Result Info (RID) PCs</td>
                      <td className="text-muted">Result Data Distribution Hardware</td>
                      <td className="text-right font-bold">{resultPcsCount}×</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>

      {totalUnits > 0 && (
        <div className="invoice-footer-summary">
          <span>Gesamtsumme aller konfigurierten Einheiten:</span>
          <span className="highlight-qty">{totalUnits} Units</span>
        </div>
      )}

      <div className="summary-action-bar no-print">
        <button
          className="btn btn-secondary"
          onClick={onExport}
          disabled={totalUnits === 0}
        >
          JSON-Daten exportieren
        </button>

        <button
          className="btn btn-primary"
          onClick={handleDirectPdfDownload}
          disabled={totalUnits === 0}
        >
          📥 PDF direkt herunterladen
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;