<?php
/**
 * Theme functions and definitions.
 *
 * @package WordPress_React_Theme
 */

if (!defined('ABSPATH')) {
  exit;
}

define('WP_REACT_THEME_VERSION', '1.0.0');
define('WP_REACT_THEME_DIR', get_template_directory());
define('WP_REACT_THEME_URI', get_template_directory_uri());

/**
 * Enqueue scripts and styles for the React app.
 */
function wp_react_theme_scripts() {
  $is_dev = file_exists(WP_REACT_THEME_DIR . '/build/assets/main.js');

  if ($is_dev) {
    wp_enqueue_script(
      'wp-react-theme-app',
      WP_REACT_THEME_URI . '/build/assets/main.js',
      array(),
      WP_REACT_THEME_VERSION,
      true
    );
    wp_enqueue_style(
      'wp-react-theme-app',
      WP_REACT_THEME_URI . '/build/assets/main.css',
      array(),
      WP_REACT_THEME_VERSION
    );
    // Pass config to React (REST URL, nonce if needed, etc.)
    wp_localize_script('wp-react-theme-app', 'wpReactTheme', array(
    'apiUrl' => rest_url('wp/v2/'),
    'siteUrl' => home_url('/'),
    'nonce'   => wp_create_nonce('wp_rest'),
  ));
  }
}
add_action('wp_enqueue_scripts', 'wp_react_theme_scripts');

/**
 * Add REST API support for featured images and other useful fields.
 */
function wp_react_theme_rest_post_response($response, $post, $request) {
  if (isset($response->data['featured_media']) && $response->data['featured_media']) {
    $response->data['featured_image_url'] = get_the_post_thumbnail_url($post->ID, 'large');
  }
  return $response;
}
add_filter('rest_prepare_post', 'wp_react_theme_rest_post_response', 10, 3);

/**
 * Ensure REST API is available and CORS is handled by WordPress.
 */
function wp_react_theme_rest_init() {
  // Remove default WordPress front-end for this theme – React handles it
  remove_action('wp_head', 'wp_oembed_add_discovery_links');
}
add_action('rest_api_init', 'wp_react_theme_rest_init');
