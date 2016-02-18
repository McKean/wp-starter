<?php

//////////////////////////////////////// load scripts and styles

function loadScriptsAndStyles() {

    wp_register_script('vendor', get_template_directory_uri() . '/js/vendor.js');
    wp_register_script('userscript', get_template_directory_uri() . '/js/script.js');
    wp_enqueue_script('vendor');
    wp_enqueue_script("userscript");

    //styles
    wp_register_style('vendor', get_template_directory_uri() . '/css/vendor.css' );
    wp_register_style('style', get_template_directory_uri() . '/css/style.css' );
    wp_enqueue_style("vendor");
    wp_enqueue_style("style");
}

add_action( 'wp_enqueue_scripts', 'loadScriptsAndStyles' );

/////////////////////////////////////// theme support
add_theme_support("post-formats");
add_theme_support("post-thumbnails");
add_theme_support("html5");

//////////////////////////////////////// theme menus
function registerMenus() {
    register_nav_menu('main-menu',__( 'Main Menu' ));
}
add_action( 'init', 'registerMenus' );


//////////////////////////////////////// wordpress tweaks


//--------------------  remove unnecessary stuff in head
function headCleanup() {
    // EditURI link
    remove_action( 'wp_head', 'rsd_link' );
    // windows live writer
    remove_action( 'wp_head', 'wlwmanifest_link' );
    // index link
    remove_action( 'wp_head', 'index_rel_link' );
    // previous link
    remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
    // start link
    remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
    // links for adjacent posts
    remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
    // WP version
    remove_action( 'wp_head', 'wp_generator' );
}
add_action( 'init', 'headCleanup' );


//-------------------- debug option
/**
 * global isDebug utility
 */
function isDebug(){
    return get_field('debug', 'option');
}
