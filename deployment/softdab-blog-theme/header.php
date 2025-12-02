<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
  <link rel="preconnect" href="https://www.softdab.tech" crossorigin>
  <link rel="dns-prefetch" href="//www.softdab.tech">
</head>
<body <?php body_class(); ?>>
  <header class="site-header">
    <div class="container inner">
      <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php echo esc_attr(get_bloginfo('name')); ?>">
        <span class="logo" aria-hidden="true"></span>
        <span><?php bloginfo('name'); ?></span>
      </a>
      <nav class="nav" aria-label="Primary">
        <?php
          wp_nav_menu([
            'theme_location' => 'primary',
            'container' => false,
            'items_wrap' => '%3$s', // only list items
            'fallback_cb' => function(){ echo '<a href="'.esc_url(admin_url('nav-menus.php')).'">Set Menu</a>'; },
          ]);
        ?>
        <a class="cta" href="https://www.softdab.tech/#contact" target="_blank" rel="noopener noreferrer">Contact SoftDAB</a>
      </nav>
    </div>
  </header>
  <main id="content" class="container">
