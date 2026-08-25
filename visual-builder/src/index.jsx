import React from 'react';
import { addAction } from '@wordpress/hooks';
import { registerModule } from '@divi/module-library';
import { ModuleContainer } from '@divi/module';
import metadata from './module.json';
import './frontend.css';

// ── SVG Icons ────────────────────────────────────────────────
const PlaySVGs = {
  circle_fill: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill={color} opacity="0.95"/>
      <polygon points="32,24 58,40 32,56" fill="rgba(0,0,0,0.75)"/>
    </svg>
  ),
  circle_outline: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" stroke={color} strokeWidth="3.5"/>
      <polygon points="32,24 58,40 32,56" fill={color}/>
    </svg>
  ),
  double_circle: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" stroke={color} strokeWidth="2" strokeDasharray="6 4" opacity="0.75"/>
      <circle cx="40" cy="40" r="28" fill={color} opacity="0.95"/>
      <polygon points="34,28 52,40 34,52" fill="rgba(0,0,0,0.8)"/>
    </svg>
  ),
  glass_circle: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill="rgba(255,255,255,0.18)" stroke={color} strokeWidth="3"/>
      <polygon points="33,25 57,40 33,55" fill={color}/>
    </svg>
  ),
  play_arrow: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="18,8 68,40 18,72" fill={color}/>
    </svg>
  ),
  rounded_rect: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 90 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="88" height="62" rx="16" stroke={color} strokeWidth="3" fill="rgba(0,0,0,0.5)"/>
      <polygon points="36,18 62,32 36,46" fill={color}/>
    </svg>
  ),
  soft_square: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="68" height="68" rx="20" fill={color} opacity="0.95"/>
      <polygon points="32,24 56,40 32,56" fill="rgba(0,0,0,0.8)"/>
    </svg>
  ),
  diamond: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="3" width="52" height="52" rx="6" transform="rotate(45 40 3)" stroke={color} strokeWidth="3.5"/>
      <polygon points="34,26 54,40 34,54" fill={color}/>
    </svg>
  ),
  hexagon: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,3 74,22 74,58 40,77 6,58 6,22" fill="none" stroke={color} strokeWidth="3.5"/>
      <polygon points="33,26 55,40 33,54" fill={color}/>
    </svg>
  ),
  shield: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,4 L72,16 C72,52 40,76 40,76 C40,76 8,52 8,16 Z" fill="none" stroke={color} strokeWidth="3.5"/>
      <polygon points="34,26 54,40 34,54" fill={color}/>
    </svg>
  ),
  dashed_circle: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="37" stroke={color} strokeWidth="3.5" strokeDasharray="8 6"/>
      <circle cx="40" cy="40" r="26" fill={color}/>
      <polygon points="34,29 52,40 34,51" fill="rgba(0,0,0,0.8)"/>
    </svg>
  ),
  pill_modern: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="16" width="72" height="48" rx="24" fill={color} opacity="0.95"/>
      <polygon points="34,27 54,40 34,53" fill="rgba(0,0,0,0.8)"/>
    </svg>
  ),
};

// ── Helper: get nested value ─────────────────────────────────
const val = (attrs, key, fallback = '') =>
  attrs?.[key]?.innerContent?.desktop?.value ?? fallback;

// ── Trigger Previews ─────────────────────────────────────────
const ButtonTrigger = ({ text, elements }) => {
  if (elements?.button?.render) {
    return (
      <elements.button.render
        className="et_pb_button dvm-trigger dvm-trigger--button dvm-vb-preview"
      >
        {text || 'Play Video'}
      </elements.button.render>
    );
  }
  return (
    <div className="et_pb_button dvm-trigger dvm-trigger--button dvm-vb-preview">
      {text || 'Play Video'}
    </div>
  );
};

const ImageTrigger = ({ src, alt, width, opacity, iconStyle, iconColor, iconSize }) => {
  const imageUrl = typeof src === 'object' && src !== null ? (src.src || '') : (src || '');
  const Icon = PlaySVGs[iconStyle] || PlaySVGs.circle_fill;
  return (
    <div className="dvm-trigger dvm-trigger--image dvm-vb-preview" style={{ maxWidth: width || '450px', width: '100%' }}>
      {imageUrl
        ? <img src={imageUrl} alt={alt || ''} style={{ width: '100%', display: 'block', opacity: opacity || '100%' }} />
        : <div className="dvm-img-placeholder">🖼 Imagen del Activador</div>
      }
      <span className="dvm-play-overlay">
        <Icon color={iconColor || '#ffffff'} size={iconSize || '64px'} />
      </span>
    </div>
  );
};

const IconTrigger = ({ style, color, size }) => {
  const Icon = PlaySVGs[style] || PlaySVGs.circle_fill;
  return (
    <div className="dvm-trigger dvm-trigger--icon dvm-vb-preview">
      <Icon color={color || '#ffffff'} size={size || '80px'} />
    </div>
  );
};

// ── Main Edit Component ─────────────────────────────────────
const DiVideoModalEdit = ({ attrs, elements, id, name }) => {
  const triggerType = val(attrs, 'triggerType', 'button');
  const buttonText  = val(attrs, 'buttonText', 'Play Video');
  const imgSrc      = val(attrs, 'triggerImageSrc', null);
  const imgAlt      = val(attrs, 'triggerImageAlt', '');
  const imgWidth    = val(attrs, 'triggerImageWidth', '450px');
  const imgOpacity  = val(attrs, 'triggerImageOpacity', '100%');
  const iconStyle   = val(attrs, 'iconStyle', 'circle_fill');
  const iconColor   = val(attrs, 'iconColor', '#ffffff');
  const iconSize    = val(attrs, 'iconSize', '64px');

  const renderTrigger = () => {
    switch (triggerType) {
      case 'image': return (
        <ImageTrigger
          src={imgSrc}
          alt={imgAlt}
          width={imgWidth}
          opacity={imgOpacity}
          iconStyle={iconStyle}
          iconColor={iconColor}
          iconSize={iconSize}
        />
      );
      case 'icon':  return <IconTrigger style={iconStyle} color={iconColor} size={iconSize} />;
      default:      return <ButtonTrigger text={buttonText} elements={elements} />;
    }
  };

  return (
    <ModuleContainer attrs={attrs} elements={elements} id={id} name={name}>
      <div className="dvm-inner">
        {renderTrigger()}
      </div>
    </ModuleContainer>
  );
};

// ── Register module ─────────────────────────────────────────
addAction(
  'divi.moduleLibrary.registerModuleLibraryStore.after',
  'divideo-modal',
  () => {
    registerModule(metadata, {
      renderers: {
        edit: DiVideoModalEdit,
      },
    });
  }
);
