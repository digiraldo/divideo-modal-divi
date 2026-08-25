<?php
/*
Plugin Name:       DiVideo Modal for Divi
Plugin URI:        https://profiles.wordpress.org/digiraldo/
Description:       Módulo nativo para Divi 5 que crea ventanas modales de vídeo (YouTube, Vimeo, Local) con activadores en botón, imagen o ícono.
Version:           2.0.0
Requires at least: 6.0
Requires PHP:      7.4
Author:            DiGiraldo
Author URI:        https://github.com/digiraldo
License:           GPL2
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:       divideo-modal-divi
Domain Path:       /languages
*/

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

define( 'DIVIDEO_MODAL_PATH', plugin_dir_path( __FILE__ ) );
define( 'DIVIDEO_MODAL_URL', plugin_dir_url( __FILE__ ) );
define( 'DIVIDEO_MODAL_VERSION', '2.0.0' );

// Load server-side module logic.
require_once DIVIDEO_MODAL_PATH . 'server/index.php';

/**
 * Enqueue Visual Builder (Divi 5) assets.
 */
function divideo_modal_enqueue_visual_builder_assets() {
	if ( function_exists( 'et_core_is_fb_enabled' ) && et_core_is_fb_enabled()
		&& function_exists( 'et_builder_d5_enabled' ) && et_builder_d5_enabled() ) {

		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build( [
			'name'    => 'divideo-modal-divi-visual-builder',
			'version' => DIVIDEO_MODAL_VERSION,
			'script'  => [
				'src'                => DIVIDEO_MODAL_URL . 'visual-builder/build/divideo-modal-divi.js',
				'deps'               => [
					'divi-module-library',
					'divi-vendor-wp-hooks',
				],
				'enqueue_top_window' => false,
				'enqueue_app_window' => true,
			],
		] );
	}
}
add_action( 'divi_visual_builder_assets_before_enqueue_scripts', 'divideo_modal_enqueue_visual_builder_assets' );

/**
 * Enqueue frontend CSS and JS.
 */
function divideo_modal_enqueue_frontend_assets() {
	if ( ! is_admin() ) {
		wp_enqueue_style(
			'divideo-modal-divi-style',
			DIVIDEO_MODAL_URL . 'visual-builder/build/divideo-modal-frontend.css',
			[],
			DIVIDEO_MODAL_VERSION
		);
		wp_enqueue_script(
			'divideo-modal-divi-frontend',
			DIVIDEO_MODAL_URL . 'visual-builder/build/divideo-modal-frontend.js',
			[],
			DIVIDEO_MODAL_VERSION,
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'divideo_modal_enqueue_frontend_assets' );

