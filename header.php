<!doctype html>

<html <?php language_attributes(); ?> >

<head>
    <meta charset="utf-8">

    <?php // Google Chrome Frame for IE ?>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title><?php wp_title(''); ?></title>

    <?php // mobile ?>
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/img/icon-touch.png">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/img/favicon.ico">
    <?php // or, set /favicon.ico for IE10 win ?>
    <meta name="msapplication-TileColor" content="#333333">
    <meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/img/win8-tile-icon.png">

    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

    <?php // wordpress head functions ?>
    <?php wp_head(); ?>
    <?php // end of wordpress head ?>

    <?php // drop Google Analytics Here ?>
    <?php // end analytics ?>

</head>

<body <?php body_class(); ?>>

<?php
    //enable these menu in the options page
	echo renderMobileMenu();
	echo renderDropdownMenu();
?>


<div class="container-full" id="header">
</div>


<?php //wp_nav_menu( array( 'theme_location' => 'menu' ) ); ?>
