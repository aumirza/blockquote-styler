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

// Disable direct access
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
defined( 'WPINC' ) or die('No script kiddies please!');

// version
define( 'BLOCKQUOTE_STYLER_VERSION', '1.0' );

// plugin directory
define( 'BLOCKQUOTE_STYLER_DIR', plugin_dir_path( __FILE__ ) );
// plugin url
define( 'BLOCKQUOTE_STYLER_URL', plugin_dir_url( __FILE__ ) );


function activate_blockquote_styler() {
    require_once BLOCKQUOTE_STYLER_DIR . 'includes/class-blockquote-styler-activator.php';
    Blockquote_Styler_Activator::activate();
}

function deactivate_blockquote_styler() {
    require_once BLOCKQUOTE_STYLER_DIR . 'includes/class-blockquote-styler-deactivator.php';
    Blockquote_Styler_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_blockquote_styler' );
register_deactivation_hook( __FILE__, 'deactivate_blockquote_styler' );

require BLOCKQUOTE_STYLER_DIR . 'includes/class-blockquote-styler.php';

function run_blockquote_styler() {

    $plugin = new Blockquote_Styler();
    $plugin->run();

}

run_blockquote_styler();