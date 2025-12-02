# SoftDAB Blog Theme

Lightweight, responsive WordPress theme matching SoftDAB branding. Focused on performance and readability.

## Files
- `style.css` — theme header + styles (branding, layout, accessibility)
- `functions.php` — theme setup (title tag, thumbnails, HTML5, primary menu)
- `header.php` / `footer.php` — site chrome, sticky header, SoftDAB CTA
- `index.php` — blog index with card posts, sidebar, pagination
- `single.php` — post view (title, meta, image, content, tags, prev/next)
- `archive.php` — archives/categories/tags listing

## Install
1. Zip the folder contents (without the outer `deployment` directory):
   ```bash
   cd "deployment/softdab-blog-theme"
   zip -r ../softdab-blog-theme.zip .
   ```
2. Upload in WP Admin → Appearance → Themes → Add New → Upload Theme → select `softdab-blog-theme.zip`.
3. Activate the theme. Go to Appearance → Menus and assign a menu to "Primary Menu".

## Notes
- Uses system fonts for speed; colors mirror SoftDAB palette.
- Header has a CTA back to SoftDAB Contact section.
- Compatible with Yoast SEO and standard WP features.
