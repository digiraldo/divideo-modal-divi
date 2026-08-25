<?php
/**
 * DiVideo Modal — Server-side registration & render callback.
 * Following the Divi 5 Quick Module tutorial architecture.
 *
 * @package DiVideoModal
 * @since   2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

require_once ABSPATH . 'wp-content/themes/Divi/includes/builder-5/server/Framework/DependencyManagement/Interfaces/DependencyInterface.php';

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\Module\Module;

/**
 * Main module class that registers the module and handles rendering.
 */
class DiVideoModal implements DependencyInterface {

	/**
	 * Loads `DiVideoModal` and registers Front-End render callback.
	 */
	public function load() {
		add_action( 'init', [ self::class, 'register_module' ] );
	}

	/**
	 * Register module.
	 */
	public static function register_module() {
		$module_json_folder = DIVIDEO_MODAL_PATH . 'visual-builder/src';
		ModuleRegistration::register_module(
			$module_json_folder,
			[
				'render_callback' => [ self::class, 'render_callback' ],
			]
		);
	}

	/**
	 * Frontend render callback — outputs the HTML for the module.
	 */
	public static function render_callback( $attrs, $content, $block, $elements ) {
	// ── Pull attribute values ──────────────────────────────
	$video_source   = $attrs['videoSource']['innerContent']['desktop']['value']   ?? 'url';
	$video_url      = $attrs['videoUrl']['innerContent']['desktop']['value']       ?? '';
	$raw_video_file = $attrs['videoFile']['innerContent']['desktop']['value']      ?? '';
	$video_file_src = is_array( $raw_video_file ) ? ( $raw_video_file['src'] ?? '' ) : ( is_string( $raw_video_file ) ? $raw_video_file : '' );
	$autoplay       = $attrs['autoplay']['innerContent']['desktop']['value']       ?? 'on';
	$trigger_type   = $attrs['triggerType']['innerContent']['desktop']['value']    ?? 'button';
	$button_text    = $attrs['buttonText']['innerContent']['desktop']['value']     ?? __( '▶ Play Video', 'divideo-modal-divi' );
	$trigger_alt    = $attrs['triggerImageAlt']['innerContent']['desktop']['value'] ?? '';
	$raw_img        = $attrs['triggerImageSrc']['innerContent']['desktop']['value'] ?? '';
	$trigger_img    = is_array( $raw_img ) ? ( $raw_img['src'] ?? '' ) : ( is_string( $raw_img ) ? $raw_img : '' );
	$trigger_img_w  = $attrs['triggerImageWidth']['innerContent']['desktop']['value'] ?? '450px';
	$icon_style     = $attrs['iconStyle']['innerContent']['desktop']['value']      ?? 'circle_fill';
	$icon_color     = $attrs['iconColor']['innerContent']['desktop']['value']      ?? '#ffffff';
	$icon_size      = $attrs['iconSize']['innerContent']['desktop']['value']       ?? '80px';
	$overlay_color  = $attrs['overlayColor']['innerContent']['desktop']['value']   ?? 'rgba(0,0,0,0.88)';
	$modal_width    = $attrs['modalMaxWidth']['innerContent']['desktop']['value']  ?? '900px';
	$show_close     = $attrs['showCloseButton']['innerContent']['desktop']['value'] ?? 'on';

	// ── Build embed URL ────────────────────────────────────
	$is_local  = ( 'local' === $video_source );
	$embed_url = '';

	if ( $is_local && $video_file_src ) {
		$embed_url = esc_url( $video_file_src );
	} elseif ( $video_url ) {
		$embed_url = divideo_modal_get_embed_url( $video_url, 'on' === $autoplay );
	}

	// ── Unique ID per instance ─────────────────────────────
	$uid = 'dvm-' . substr( md5( $block->parsed_block['id'] ?? uniqid() ), 0, 8 );

	// ── Build trigger HTML ─────────────────────────────────
	switch ( $trigger_type ) {
		case 'image':
			$play_icon    = divideo_modal_get_play_svg( $icon_style, $icon_color, $icon_size );
			$style_width  = $trigger_img_w ? 'style="max-width:' . esc_attr( $trigger_img_w ) . '; width:100%;"' : '';
			$trigger_html = '<div class="dvm-trigger dvm-trigger--image" ' . $style_width . ' data-dvm-uid="' . esc_attr( $uid ) . '" role="button" tabindex="0" aria-label="' . esc_attr__( 'Play video', 'divideo-modal-divi' ) . '">';
			if ( $trigger_img ) {
				$trigger_html .= '<img src="' . esc_url( $trigger_img ) . '" alt="' . esc_attr( $trigger_alt ) . '" loading="lazy">';
			}
			$trigger_html .= '<span class="dvm-play-overlay">' . $play_icon . '</span>';
			$trigger_html .= '</div>';
			break;

		case 'icon':
			$trigger_html  = '<div class="dvm-trigger dvm-trigger--icon" data-dvm-uid="' . esc_attr( $uid ) . '" role="button" tabindex="0" aria-label="' . esc_attr__( 'Play video', 'divideo-modal-divi' ) . '">';
			$trigger_html .= divideo_modal_get_play_svg( $icon_style, $icon_color, $icon_size );
			$trigger_html .= '</div>';
			break;

		case 'button':
		default:
			$trigger_html = '<a href="#" class="et_pb_button dvm-trigger dvm-trigger--button" data-dvm-uid="' . esc_attr( $uid ) . '" role="button" tabindex="0" aria-label="' . esc_attr__( 'Play video', 'divideo-modal-divi' ) . '">';
			$trigger_html .= esc_html( $button_text );
			$trigger_html .= '</a>';
			break;
	}

	// ── Close button ───────────────────────────────────────
	$close_btn = '';
	if ( 'on' === $show_close ) {
		$close_btn = '<button class="dvm-close" aria-label="' . esc_attr__( 'Close video', 'divideo-modal-divi' ) . '" type="button">&times;</button>';
	}

	// ── Modal HTML ─────────────────────────────────────────
	$modal_html  = '<div class="dvm-overlay" data-dvm-uid="' . esc_attr( $uid ) . '"';
	$modal_html .= ' data-embed-url="' . esc_attr( $embed_url ) . '"';
	$modal_html .= ' data-is-local="' . ( $is_local ? '1' : '0' ) . '"';
	$modal_html .= ' data-autoplay="' . ( 'on' === $autoplay ? '1' : '0' ) . '"';
	$modal_html .= ' style="background:' . esc_attr( $overlay_color ) . '"';
	$modal_html .= ' aria-hidden="true">';
	$modal_html .= '<div class="dvm-video-wrap" style="max-width:' . esc_attr( $modal_width ) . '">';
	$modal_html .= $close_btn;
	$modal_html .= '<div class="dvm-video-container"></div>';
	$modal_html .= '</div>';
	$modal_html .= '</div>';

	// ── Assemble full module output ────────────────────────
	$parent       = ET\Builder\FrontEnd\BlockParser\BlockParserStore::get_parent(
		$block->parsed_block['id'],
		$block->parsed_block['storeInstance']
	);
	$parent_attrs = $parent->attrs ?? [];

	return ET\Builder\Packages\Module\Module::render( [
		// FE only.
		'orderIndex'    => $block->parsed_block['orderIndex'],
		'storeInstance' => $block->parsed_block['storeInstance'],
		// VB equivalent.
		'attrs'         => $attrs,
		'elements'      => $elements,
		'id'            => $block->parsed_block['id'],
		'name'          => $block->block_type->name,
		'moduleCategory'=> $block->block_type->category,
		'parentAttrs'   => $parent_attrs,
		'parentId'      => $parent->id ?? '',
		'parentName'    => $parent->blockName ?? '',
		'children'      => $trigger_html . $modal_html,
	] );
}
}

// Register module.
add_action(
	'divi_module_library_modules_dependency_tree',
	function( $dependency_tree ) {
		$dependency_tree->add_dependency( new DiVideoModal() );
	}
);


/**
 * Convert a YouTube or Vimeo URL into its embed URL.
 *
 * @param string $url      Original video URL.
 * @param bool   $autoplay Whether to autoplay.
 * @return string Embed URL.
 */
function divideo_modal_get_embed_url( $url, $autoplay = false ) {
	$ap = $autoplay ? '1' : '0';

	// YouTube
	if ( preg_match( '/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $m ) ) {
		return esc_url( "https://www.youtube.com/embed/{$m[1]}?autoplay={$ap}&rel=0" );
	}

	// Vimeo
	if ( preg_match( '/vimeo\.com\/(?:video\/)?(\d+)/', $url, $m ) ) {
		return esc_url( "https://player.vimeo.com/video/{$m[1]}?autoplay={$ap}" );
	}

	// Fallback: return as-is
	return esc_url( $url );
}

/**
 * Return inline SVG for a play icon variant.
 *
 * @param string $style Icon style slug.
 * @param string $color Fill/stroke color.
 * @param string $size  Width/height.
 * @return string SVG markup.
 */
function divideo_modal_get_play_svg( $style, $color = '#ffffff', $size = '80px' ) {
	$c = esc_attr( $color );
	$s = esc_attr( $size );

	switch ( $style ) {
		case 'circle_outline':
			return "<svg width=\"{$s}\" height=\"{$s}\" viewBox=\"0 0 80 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"40\" cy=\"40\" r=\"38\" stroke=\"{$c}\" stroke-width=\"3\"/><polygon points=\"32,24 58,40 32,56\" fill=\"{$c}\"/></svg>";

		case 'play_arrow':
			return "<svg width=\"{$s}\" height=\"{$s}\" viewBox=\"0 0 80 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"18,8 68,40 18,72\" fill=\"{$c}\"/></svg>";

		case 'rounded_rect':
			return "<svg width=\"{$s}\" height=\"{$s}\" viewBox=\"0 0 90 64\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"1\" y=\"1\" width=\"88\" height=\"62\" rx=\"14\" stroke=\"{$c}\" stroke-width=\"3\" fill=\"rgba(0,0,0,0.4)\"/><polygon points=\"36,18 62,32 36,46\" fill=\"{$c}\"/></svg>";

		case 'diamond':
			return "<svg width=\"{$s}\" height=\"{$s}\" viewBox=\"0 0 80 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"40\" y=\"3\" width=\"52\" height=\"52\" rx=\"6\" transform=\"rotate(45 40 3)\" stroke=\"{$c}\" stroke-width=\"3\"/><polygon points=\"34,26 54,40 34,54\" fill=\"{$c}\"/></svg>";

		case 'circle_fill':
		default:
			return "<svg width=\"{$s}\" height=\"{$s}\" viewBox=\"0 0 80 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"40\" cy=\"40\" r=\"40\" fill=\"{$c}\" opacity=\"0.9\"/><polygon points=\"32,24 58,40 32,56\" fill=\"rgba(0,0,0,0.75)\"/></svg>";
	}
}
