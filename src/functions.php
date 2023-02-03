<?php

/**
 * Blockquote styler
 * 
 * @package blockquote-styler
 * @version 1.0
 * @author Ahmadullah mirza
 * @link https://ahmadullah.in/
 * @license GPL2
 *
 * @wordpress-plugin
 * Plugin Name: Blockquote styler
 * Plugin URI: https://github.com/au.mirza/blockquote-styler
 * Description: A plugin to style blockquotes.
 * Version: 1.0
 * Author: Ahmadullah mirza
 * Author URI: https://ahmadullah.in/
 * License: GPL2
 */

// Register style sheet and scripts
function blockquote_styler_scripts() {
    wp_register_style( 'blockquote-styler-style', plugins_url( './style.css', __FILE__ ) );
    wp_enqueue_style( 'blockquote-styler-style' );
    wp_register_script( 'blockquote-styler-script', plugins_url( './script.js', __FILE__ ) );
    wp_enqueue_script( 'blockquote-styler-script' );
}
add_action( 'wp_enqueue_scripts', 'blockquote_styler_scripts' );
