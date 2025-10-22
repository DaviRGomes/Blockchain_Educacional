// GuidedTooltip component
import React from 'react';
import { TourStepContent } from '../data/tourSteps'; // Importe a interface do conteúdo

export type TooltipPos = { 
  top: number; 
  left: number; 
  placement: 'top' | 'right' | 'bottom' | 'left' 
}

interface GuidedTooltipProps {
  content: TourStepContent;
  pos: TooltipPos;
  actionLabel?: string;
  onAction?: () => void;
}

const GuidedTooltip: React.FC<GuidedTooltipProps> = ({ content, pos, actionLabel, onAction }) => {
  console.log('GuidedTooltip renderizado com:', { content, pos });
  
  if (!content || !pos) {
    console.log('GuidedTooltip: content ou pos não fornecidos');
    return null;
  }

  return (
    <div
      className={`guided-tooltip placement-${pos.placement}`}
      style={{
        position: 'fixed',
        top: pos.top + 'px',
        left: pos.left + 'px',
        transform: pos.placement === 'top' ? 'translate(-50%, -110%)' : 'translate(0, -50%)',
        zIndex: 10000,
        pointerEvents: 'none'
      }}
    >
      <div className="guided-tooltip-card">
        <h4>{content.title}</h4>
        <p style={{ whiteSpace: 'pre-wrap' }}>{content.text}</p>
        {/* Botão de ação opcional, seguindo o modelo do onboarding */}
        {actionLabel && onAction && (
          <div style={{ marginTop: 8 }}>
            <button
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAction(); }}
              style={{ pointerEvents: 'auto' }}
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
      <div className="guided-tooltip-arrow" />
    </div>
  )
}

export default GuidedTooltip;