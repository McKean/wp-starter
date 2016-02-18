<!-- Footer -->

</div> <?php // end of container ?>

<?php
//code to show the grid overlay
if (!wp_is_mobile() && isDebug()) {
    echo "<a href='" . get_template_directory_uri() . "/debugger.php?url=" . $_SERVER['PHP_SELF'] . "' class='debugButton'></a>";
}
?>

<?php wp_footer(); ?>

</body>
</html>
