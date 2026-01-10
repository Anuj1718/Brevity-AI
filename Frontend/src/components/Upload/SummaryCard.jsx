import React from 'react';

const SummaryCard = ({ summaryData, activeSummary, onTranslate, isTranslating, translatedSummary }) => {
  if (!summaryData) return null;

  const getSummaryIcon = (type) => {
    switch (type) {
      case 'extractive': return '📊';
      case 'abstractive': return '🧠';
      case 'formatted-hybrid': return '📋';
      default: return '📄';
    }
  };

  const getSummaryTitle = (type) => {
    switch (type) {
      case 'extractive': return 'Extractive Summary';
      case 'abstractive': return 'Abstractive Summary';
      case 'formatted-hybrid': return 'Formatted Hybrid Summary';
      default: return 'Summary';
    }
  };

  const formatCompressionRatio = (ratio) => {
    if (!ratio) return 'N/A';
    return `${(ratio * 100).toFixed(1)}%`;
  };

  const formatWordCount = (count) => {
    if (!count) return 'N/A';
    return count.toLocaleString();
  };

  return (
    <div className="summary-card">
      <div className="summary-header">
        <h3 className="summary-title">
          {getSummaryIcon(activeSummary)} {getSummaryTitle(activeSummary)}
        </h3>
        <div className="summary-stats">
          <span className="stat">
            📊 {formatWordCount(summaryData.original_length)} → {formatWordCount(summaryData.summary_length)} words
          </span>
          <span className="stat">
            📉 {formatCompressionRatio(summaryData.compression_ratio)} compression
          </span>
          {summaryData.model && (
            <span className="stat">
              🤖 {summaryData.model}
            </span>
          )}
          {summaryData.processing_method && (
            <span className="stat">
              ⚡ {summaryData.processing_method}
            </span>
          )}
        </div>
      </div>

      {activeSummary === 'formatted-hybrid' && (
        <>
          {summaryData.title && (
            <div className="summary-section">
              <h4 className="section-title">📋 Title</h4>
              <p className="section-content">{summaryData.title}</p>
            </div>
          )}
          
          {summaryData.objective && (
            <div className="summary-section">
              <h4 className="section-title">🎯 Objective</h4>
              <p className="section-content">{summaryData.objective}</p>
            </div>
          )}
          
          {summaryData.key_points && Array.isArray(summaryData.key_points) && (
            <div className="summary-section">
              <h4 className="section-title">✨ Key Points</h4>
              <ul className="keypoints-list">
                {summaryData.key_points.map((kp, i) => (
                  <li key={i}>• {kp}</li>
                ))}
              </ul>
            </div>
          )}
          
          {summaryData.final_abstract && (
            <div className="summary-section">
              <h4 className="section-title">📝 Final Abstract</h4>
              <p className="section-content">{summaryData.final_abstract}</p>
            </div>
          )}
        </>
      )}

      {(activeSummary === 'extractive' || activeSummary === 'abstractive') && (
        <div className="summary-section">
          <p className="section-content">{summaryData.summary_text}</p>
        </div>
      )}

      {/* Translation Section */}
      <div className="translation-section">
        <h4 className="section-title">🌐 Translation</h4>
        <div className="translation-buttons">
          <button 
            className="btn outline translation-btn"
            onClick={() => onTranslate('hi')}
            disabled={isTranslating}
          >
            {isTranslating ? 'Translating...' : '🇮🇳 Translate to Hindi'}
          </button>
          <button 
            className="btn outline translation-btn"
            onClick={() => onTranslate('mr')}
            disabled={isTranslating}
          >
            {isTranslating ? 'Translating...' : '🇮🇳 Translate to Marathi'}
          </button>
        </div>
        
        {translatedSummary && (
          <div className="translated-content">
            <h5>Translated Summary ({translatedSummary.target_language === 'hi' ? 'Hindi' : 'Marathi'}):</h5>
            <p className="translated-text">{translatedSummary.translated_text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;