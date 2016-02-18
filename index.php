<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <h1><?php the_title(); ?></h1>
<div class="gr-12">    <?php the_content(); ?></div>


<?php endwhile;
else : ?>
    page not found
<?php endif; ?>

<?php get_footer(); ?>
