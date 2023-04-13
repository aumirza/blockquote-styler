<?php

class Blockquote_Styler_Admin {

    private $plugin_name;
    private $version;

    public function __construct( $plugin_name, $version ) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    public function enqueue_styles() {
        // wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/blockquote-styler-admin.css', array(), $this->version, 'all' );
    }

    public function enqueue_scripts() {
        // wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/blockquote-styler-admin.js', array( 'jquery' ), $this->version, false );
    }

    public function add_plugin_admin_menu() {
        add_options_page( 'Blockquote Styler', 'Blockquote Styler', 'manage_options', $this->plugin_name, array($this, 'display_plugin_setup_page')
        );
    }

    public function add_action_links( $links ) {
        $settings_link = array(
            '<a href="' . admin_url( 'options-general.php?page=' . $this->plugin_name ) . '">' . __('Settings', $this->plugin_name) . '</a>',
        );
        return array_merge(  $settings_link, $links );
    }

    public function display_plugin_setup_page() {
        include_once( 'partials/blockquote-styler-admin-display.php' );
    }

}