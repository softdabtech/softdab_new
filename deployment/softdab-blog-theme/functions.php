<?php
if (!defined('ABSPATH')) { exit; }

add_action('after_setup_theme', function () {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', ['search-form','gallery','caption','style','script']);
  register_nav_menus([
    'primary' => __('Primary Menu', 'softdab-blog'),
  ]);
});

add_action('wp_enqueue_scripts', function () {
  $ver = '1.0.0';
  wp_enqueue_style('softdab-blog-style', get_stylesheet_uri(), [], $ver);
});

// Improve excerpt length a bit
add_filter('excerpt_length', function($length){ return 28; }, 99);
