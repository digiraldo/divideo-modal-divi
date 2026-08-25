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
      <circle cx="40" cy="40" r="40" fill={color} opacity="0.9"/>
      <polygon points="32,24 58,40 32,56" fill="rgba(0,0,0,0.75)"/>
    </svg>
  ),
  circle_outline: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" stroke={color} strokeWidth="3"/>
      <polygon points="32,24 58,40 32,56" fill={color}/>
    </svg>
  ),
  play_arrow: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="18,8 68,40 18,72" fill={color}/>
    </svg>
  ),
  rounded_rect: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 90 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="88" height="62" rx="14" stroke={color} strokeWidth="3" fill="rgba(0,0,0,0.4)"/>
      <polygon points="36,18 62,32 36,46" fill={color}/>
    </svg>
  ),
  diamond: ({ color = '#fff', size = '80px' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="3" width="52" height="52" rx="6" transform="rotate(45 40 3)" stroke={color} strokeWidth="3"/>
      <polygon points="34,26 54,40 34,54" fill={color}/>
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
        {text || '▶ Play Video'}
      </elements.button.render>
    );
  }
  return (
    <div className="et_pb_button dvm-trigger dvm-trigger--button dvm-vb-preview">
      {text || '▶ Play Video'}
    </div>
  );
};

const ImageTrigger = ({ src, alt, width, iconStyle, iconColor, iconSize }) => {
  const imageUrl = typeof src === 'object' && src !== null ? (src.src || '') : (src || '');
  const Icon = PlaySVGs[iconStyle] || PlaySVGs.circle_fill;
  return (
    <div className="dvm-trigger dvm-trigger--image dvm-vb-preview" style={{ maxWidth: width || '450px', width: '100%' }}>
      {imageUrl
        ? <img src={imageUrl} alt={alt || ''} style={{ width: '100%', display: 'block' }} />
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
  const buttonText  = val(attrs, 'buttonText', '▶ Play Video');
  const imgSrc      = val(attrs, 'triggerImageSrc', null);
  const imgAlt      = val(attrs, 'triggerImageAlt', '');
  const imgWidth    = val(attrs, 'triggerImageWidth', '450px');
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
