import './frontend.css';

const openModal = (trigger) => {
	const uid = trigger.getAttribute('data-dvm-uid');
	const overlay = document.querySelector(`.dvm-overlay[data-dvm-uid="${uid}"]`);
	if (!overlay) return;

	const container = overlay.querySelector('.dvm-video-container');
	const embedUrl = overlay.getAttribute('data-embed-url');
	const isLocal = overlay.getAttribute('data-is-local') === '1';
	const autoplay = overlay.getAttribute('data-autoplay') === '1';

	if (container && embedUrl) {
		if (isLocal) {
			container.innerHTML = `<video src="${embedUrl}" controls ${autoplay ? 'autoplay' : ''} playsinline style="width:100%; height:100%; object-fit:contain;"></video>`;
			if (autoplay) {
				const vid = container.querySelector('video');
				if (vid) {
					vid.play().catch(() => {});
				}
			}
		} else {
			let finalUrl = embedUrl;
			if (autoplay && !finalUrl.includes('autoplay=1')) {
				finalUrl += (finalUrl.includes('?') ? '&' : '?') + 'autoplay=1';
			}
			container.innerHTML = `<iframe src="${finalUrl}" width="100%" height="100%" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
		}
	}

	overlay.setAttribute('aria-hidden', 'false');
	overlay.classList.add('dvm-overlay--active');
	document.body.style.overflow = 'hidden';
};

const closeModal = (overlay) => {
	overlay.setAttribute('aria-hidden', 'true');
	overlay.classList.remove('dvm-overlay--active');
	const container = overlay.querySelector('.dvm-video-container');
	if (container) {
		container.innerHTML = ''; // Detiene el vídeo de inmediato
	}
	if (!document.querySelector('.dvm-overlay--active')) {
		document.body.style.overflow = '';
	}
};

// Delegación global de clics en el documento
document.addEventListener('click', (e) => {
	// Clic en Activador
	const trigger = e.target.closest('.dvm-trigger');
	if (trigger) {
		e.preventDefault();
		openModal(trigger);
		return;
	}

	// Clic en Botón Cerrar (X)
	const closeBtn = e.target.closest('.dvm-close');
	if (closeBtn) {
		e.preventDefault();
		const overlay = closeBtn.closest('.dvm-overlay');
		if (overlay) {
			closeModal(overlay);
		}
		return;
	}

	// Clic en el fondo oscuro (Backdrop)
	if (e.target.classList.contains('dvm-overlay')) {
		closeModal(e.target);
	}
});

// Delegación de eventos de teclado (Enter, Espacio y ESC)
document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter' || e.key === ' ') {
		const trigger = document.activeElement && document.activeElement.closest('.dvm-trigger');
		if (trigger) {
			e.preventDefault();
			openModal(trigger);
		}
	} else if (e.key === 'Escape') {
		const activeOverlays = document.querySelectorAll('.dvm-overlay--active');
		activeOverlays.forEach(overlay => closeModal(overlay));
	}
});


