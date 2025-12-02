<?php get_header(); ?>

<section class="posts">
  <header class="card" style="grid-column:1 / -1;">
    <h1><?php echo get_the_archive_title(); ?></h1>
    <?php if ($desc = get_the_archive_description()) echo '<div class="excerpt">'.wp_kses_post($desc).'</div>'; ?>
  </header>

  <div class="list">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <article <?php post_class('card'); ?>>
        <header>
          <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          <div class="meta">
            <span><?php echo esc_html(get_the_date()); ?></span>
            <?php $cats = get_the_category_list(', '); if ($cats) echo ' · '.wp_kses_post($cats); ?>
          </div>
        </header>
        <div class="excerpt"><?php the_excerpt(); ?></div>
        <a class="read-more" href="<?php the_permalink(); ?>">Read more →</a>
      </article>
    <?php endwhile; else: ?>
      <p>No posts yet.</p>
    <?php endif; ?>

    <nav class="pagination" aria-label="Pagination">
      <?php echo paginate_links([ 'prev_text' => '« Prev', 'next_text' => 'Next »' ]); ?>
    </nav>
  </div>

  <aside class="sidebar">
    <div class="card">
      <h3>Categories</h3>
      <ul>
        <?php wp_list_categories(['title_li' => '']); ?>
      </ul>
    </div>
  </aside>
</section>

<?php get_footer(); ?>
