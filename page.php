<?php

/**
 */

get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<div class="container-full title">
    <div class="container">
            <h1><?php the_title(); ?></h1>
            <div class="row">
                <div class="col-sm-4">
                  One of three columns
                </div>
                <div class="col-sm-4">
                  One of three columns
                </div>
                <div class="col-sm-4">
                  One of three columns
                </div>
            </div>
    </div>
</div>

<?php endwhile;
else : ?>
page not found
<?php endif; ?>

<?php get_footer(); ?>
