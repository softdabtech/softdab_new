<?php get_header(); ?>

<section class="posts">
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
        <?php if (has_post_thumbnail()) : ?>
          <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('large', ['style' => 'border-radius:12px; margin:.5rem 0; height:auto; width:100%;']); ?></a>
        <?php endif; ?>
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
      <h3>About SoftDAB</h3>
      <p>Software Development Studio. We build secure, high‑performance products and platforms.</p>
      <p><a class="read-more" href="https://www.softdab.tech/#services" target="_blank" rel="noopener">See services →</a></p>
    </div>
    <div class="card">
      <h3>Categories</h3>
      <ul>
        <?php wp_list_categories(['title_li' => '']); ?>
      </ul>
    </div>
  </aside>
</section>

<?php get_footer(); ?>
