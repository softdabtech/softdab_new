<?php get_header(); ?>

<article <?php post_class('article'); ?>>
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <header>
      <h1><?php the_title(); ?></h1>
      <div class="meta">
        <span><?php echo esc_html(get_the_date()); ?></span>
        <?php $cats = get_the_category_list(', '); if ($cats) echo ' · '.wp_kses_post($cats); ?>
      </div>
      <?php if (has_post_thumbnail()) : ?>
        <figure style="margin:1rem 0;">
          <?php the_post_thumbnail('large', ['style' => 'border-radius:12px; height:auto; width:100%;']); ?>
        </figure>
      <?php endif; ?>
    </header>
    <div class="content">
      <?php the_content(); ?>
    </div>
    <?php $tags = get_the_tag_list('', ''); if ($tags): ?>
      <div class="tags" aria-label="Tags">
        <?php foreach (get_the_tags() ?: [] as $t): ?>
          <span class="tag">#<?php echo esc_html($t->name); ?></span>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
    <nav class="pagination" style="margin-top:1.5rem;">
      <div><?php previous_post_link('%link','« Previous'); ?></div>
      <div><?php next_post_link('%link','Next »'); ?></div>
    </nav>
  <?php endwhile; endif; ?>
</article>

<?php get_footer(); ?>
