<?php


class Blockquote_Styler_i18n {

    protected $domain;

    public function set_domain( $domain ) {
        $this->domain = $domain;
    }

    public function load_plugin_textdomain() {

        load_plugin_textdomain(
            $this->domain,
            false,
            dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
        );

    }

}