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

  // Detaillierte Erfassung aller Einzelspezifikationen für eine große, lückenlose Tabelle
  const detailedItems = [];
  let indexCounter = 1;

  terminals.forEach((item) => {
    detailedItems.push({
      pos: indexCounter++,
      category: 'Terminals',
      name: item.type || 'Standard Terminal',
      spec: 'Hardware Terminal Unit',
      variant: item.variant || 'Standard',
      mountOrDetails: 'N/A',
      qty: Number(item.quantity) || 0,
    });
  });

  dbServers.forEach((item) => {
    detailedItems.push({
      pos: indexCounter++,
      category: 'Database Server',
      name: item.gameType || item.model || 'FS695 DB Server',
      spec: 'Core Database Unit',
      variant: item.housing || item.execution || 'Standard Execution',
      mountOrDetails: 'Server Rack / Standalone',
      qty: Number(item.quantity) || 0,
    });
  });

  autoWheels.forEach((item) => {
    detailedItems.push({
      pos: indexCounter++,
      category: 'FS593 Auto Wheel',
      name: item.gameType || 'Auto Wheel',
      spec: item.wheelType || 'Standard Wheel',
      variant: 'Auto Wheel Module',
      mountOrDetails: item.mount ? `Mount: ${item.mount}` : 'Standard Mount',
      qty: Number(item.quantity) || 0,
    });
  });

  liveServers.forEach((item) => {
    detailedItems.push({
      pos: indexCounter++,
      category: 'FS695 Live Game Server',
      name: item.gameType || 'Live Game Server',
      spec: item.displaySize ? `Display: ${item.displaySize}` : 'Standard Display',
      variant: 'Live Server Unit',
      mountOrDetails: item.mount ? `Mount: ${item.mount}` : 'Standard Mount',
      qty: Number(item.quantity) || 0,
    });
  });

  if (streamServersCount > 0) {
    detailedItems.push({
      pos: indexCounter++,
      category: 'Infrastructure',
      name: 'Stream Server',
      spec: 'Required Live Streaming Unit',
      variant: 'High-Performance Stream Node',
      mountOrDetails: 'Network Rack',
      qty: streamServersCount,
    });
  }

  flyingServers.forEach((item) => {
    detailedItems.push({
      pos: indexCounter++,
      category: 'Flying Game Server',
      name: item.gameType || 'Flying Game',
      spec: 'Flying Server Architecture',
      variant: item.caseType || 'FS695 Case',
      mountOrDetails: 'Configured Case Variant',
      qty: Number(item.quantity) || 0,
    });
  });

  remoteServers.forEach((item) => {
    detailedItems.push({
      pos: indexCounter++,
      category: 'Remote Game Server',
      name: item.gameType || 'Remote Game',
      spec: 'Booksize Form Factor',
      variant: 'Remote Node',
      mountOrDetails: 'Compact Housing',
      qty: Number(item.quantity) || 0,
    });
  });

  if (animationPcsCount > 0) {
    detailedItems.push({
      pos: indexCounter++,
      category: 'Display Hardware',
      name: 'Animation PCs',
      spec: 'Visual Effects Rendering',
      variant: 'Animation Node',
      mountOrDetails: 'Display Controller',
      qty: animationPcsCount,
    });
  }

  if (resultPcsCount > 0) {
    detailedItems.push({
      pos: indexCounter++,
      category: 'Display Hardware',
      name: 'Result Info (RID) PCs',
      spec: 'Result Data Distribution',
      variant: 'RID Unit',
      mountOrDetails: 'Display Controller',
      qty: resultPcsCount,
    });
  }

  const totalUnits = detailedItems.reduce((acc, item) => acc + item.qty, 0);

  // Echter direkter PDF-Download (nutzt html2pdf.js falls vorhanden, sonst Fallback auf print)
  const handleDirectPdfDownload = () => {
    const element = document.getElementById('invoice-printable-area');
    if (window.html2pdf) {
      const opt = {
        margin:       10,
        filename:     'NovoUnity_Configuration_Invoice.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
      };
      window.html2pdf().from(element).set(opt).save();
    } else {
      // Fallback: Druckdialog mit Hinweis, falls die Bibliothek nicht installiert ist
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
      {/* Rechnungs-Kopfbereich */}
      <div className="invoice-header">
        <div>
          <h2 className="invoice-company">Novo Unity Pro — System Spezifikation</h2>
          <p className="text-muted invoice-subtitle">Detaillierte Hardware-Stückliste & Konfigurationsdetails</p>
        </div>
        <div className="invoice-meta">
          <p><strong>Datum:</strong> {currentDate}</p>
          <p><strong>Status:</strong> <span className="text-success">Vollständig Konfiguriert</span></p>
          <p><strong>Gesamtstückzahl:</strong> {totalUnits} Units</p>
        </div>
      </div>

      <hr className="invoice-divider" />

      {/* Große, detaillierte Rechnungstabelle */}
      <div className="invoice-body">
        {detailedItems.length === 0 ? (
          <div className="empty-state">
            Keine Komponenten konfiguriert. Bitte schließe die vorherigen Schritte ab.
          </div>
        ) : (
          <table className="invoice-table detailed-invoice-table">
            <thead>
              <tr>
                <th style={{ width: '5%' }}>Pos.</th>
                <th style={{ width: '15%' }}>Kategorie</th>
                <th style={{ width: '22%' }}>Komponente / Spiel</th>
                <th style={{ width: '20%' }}>Spezifikation</th>
                <th style={{ width: '18%' }}>Variante / Gehäuse</th>
                <th style={{ width: '12%' }}>Details / Mount</th>
                <th style={{ width: '8%' }} className="text-right">Menge</th>
              </tr>
            </thead>
            <tbody>
              {detailedItems.map((item, index) => (
                <tr key={index} className="invoice-row">
                  <td className="text-muted">{item.pos}</td>
                  <td className="font-semibold">{item.category}</td>
                  <td>{item.name}</td>
                  <td className="text-small text-muted">{item.spec}</td>
                  <td className="text-small">{item.variant}</td>
                  <td className="text-small text-muted">{item.mountOrDetails}</td>
                  <td className="text-right font-bold">{item.qty}×</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="invoice-total-row">
                <td colSpan="6" className="text-right font-bold">Gesamtsumme Einheiten:</td>
                <td className="text-right font-bold highlight-qty">{totalUnits}×</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* Aktionsleiste */}
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