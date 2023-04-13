<?php


class Blockquote_Styler
{

    protected $loader;
    protected $plugin_name;
    protected $version;

    public function __construct()
    {
        if (defined('BLOCKQUOTE_STYLER_VERSION')) {
            $this->version = BLOCKQUOTE_STYLER_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'blockquote-styler';

        $this->load_dependencies();
        $this->set_locale();

        if (is_admin()) {
            $this->define_admin_hooks();
        } else {
            $this->define_public_hooks();
        }
    }

    private function load_dependencies()
    {

        require_once BLOCKQUOTE_STYLER_DIR . 'includes/class-blockquote-styler-loader.php';
        require_once BLOCKQUOTE_STYLER_DIR . 'includes/class-blockquote-styler-i18n.php';

        if (is_admin()) {
            require_once BLOCKQUOTE_STYLER_DIR . 'admin/class-blockquote-styler-admin.php';
        } else {
            require_once BLOCKQUOTE_STYLER_DIR . 'public/class-blockquote-styler-public.php';
        }

        $this->loader = new Blockquote_Styler_Loader();
    }

    private function set_locale()
    {

        $plugin_i18n = new Blockquote_Styler_i18n();
        $plugin_i18n->set_domain($this->get_plugin_name());

        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
    }

    private function define_admin_hooks()
    {

        $plugin_admin = new Blockquote_Styler_Admin($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
        $this->loader->add_action('admin_menu', $plugin_admin, 'add_plugin_admin_menu');
    }

    private function define_public_hooks()
    {

        $plugin_public = new Blockquote_Styler_Public($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
    }

    public function run()
    {
        $this->loader->run();
    }

    public function get_plugin_name()
    {
        return $this->plugin_name;
    }

    public function get_loader()
    {
        return $this->loader;
    }

    public function get_version()
    {
        return $this->version;
    }
}
