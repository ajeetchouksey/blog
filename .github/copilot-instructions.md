# AI-Driven Cloud & DevOps Blog

Jekyll-based blog at theaiops.blog focusing on AI, DevOps, cloud, and technology content. The site uses Jekyll with the GitHub Pages theme and is deployed via GitHub Actions.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Installation
- **Ruby Version**: Requires Ruby 3.0+ (Ruby 3.2.3 confirmed working)
- **Install Bundler**: `gem install --user-install bundler` (takes ~3 seconds)
- **Update PATH**: `export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"`
- **Install Dependencies**: `bundle install --jobs 4 --retry 3` (takes <1 second, dependencies are cached)

### Build and Development
- **Clean Build**: `bundle exec jekyll clean` (takes <1 second)
- **Production Build**: `bundle exec jekyll build` (takes ~2-3 seconds) **NEVER CANCEL**
- **Development Build**: `bundle exec jekyll build --config _config.dev.yml` (takes ~2-3 seconds) **NEVER CANCEL**
- **CI Build**: `bundle exec jekyll build --quiet` (takes ~2-3 seconds) **NEVER CANCEL**
- **Check Site Health**: `bundle exec jekyll doctor` (takes <1 second)

### Development Server
- **Local Development**: `bundle exec jekyll serve --host 0.0.0.0 --port 4000 --config _config.dev.yml` **NEVER CANCEL**
  - Server starts at http://localhost:4000/
  - Takes ~2 seconds to start
  - Auto-regeneration enabled for changes
- **Watch Mode**: `bundle exec jekyll build --watch --config _config.dev.yml` (for continuous building) **NEVER CANCEL**

### Important Notes
- **The provided `serve` script does NOT work** - it lacks proper PATH setup for Jekyll
- Use explicit `bundle exec jekyll serve` commands instead
- Build times are very fast (2-3 seconds) - no need for long timeouts
- Dependencies install instantly due to caching in `vendor/bundle`

## Validation

### Manual Testing Requirements
**Always validate changes with these exact steps:**
1. Build the site: `bundle exec jekyll build --config _config.dev.yml`
2. Start development server: `bundle exec jekyll serve --host 0.0.0.0 --port 4000 --config _config.dev.yml`
3. Access http://localhost:4000/ and verify site loads correctly
4. Check site health: `bundle exec jekyll doctor`
5. Test production build: `bundle exec jekyll build --quiet`

### Creating New Blog Posts
1. **File Location**: Place in `_posts/` directory
2. **Naming Convention**: `YYYY-MM-DD-title-slug.md`
3. **Required Front Matter**:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   description: "Brief description for SEO"
   modified: YYYY-MM-DD
   tags: [tag1, tag2, tag3]
   categories: [Category1, Category2]
   author: Ajeet
   production: true
   ---
   ```
4. **Validate**: Run `bundle exec jekyll build --config _config.dev.yml` to ensure post builds correctly
5. **Test**: Check post appears in site navigation and pagination

### CI/CD Validation
The GitHub Actions workflow (`.github/workflows/jekyll-build.yml`) runs these exact commands:
1. `gem install bundler`
2. `bundle install --jobs 4 --retry 3`
3. `bundle exec jekyll build --quiet`

**Always test these commands locally before committing changes.**

## Repository Structure

### Key Directories
- `_posts/`: Blog posts in Markdown format (51 posts currently)
- `_layouts/`: HTML templates (default.html, post.html, page.html)
- `_includes/`: Reusable HTML components (header.html, footer.html, etc.)
- `_sass/`: SCSS stylesheets for theming
- `_data/`: Site data (authors.yml with author information)
- `_site/`: Generated static site (created during build)
- `_wip/`: Work-in-progress posts and drafts
- `images/`: Static images and media files
- `vendor/bundle/`: Cached Ruby gems (do not commit)

### Configuration Files
- `_config.yml`: Production configuration (site: theaiops.blog)
- `_config.dev.yml`: Development configuration (site: localhost:4000)
- `Gemfile`: Ruby dependencies (GitHub Pages theme and plugins)
- `Gemfile.lock`: Locked dependency versions

### Important Files
- `index.html`: Homepage template
- `404.md`: Custom 404 error page
- `sitemap.xml`: SEO sitemap
- `feed.xml`: RSS feed
- `robots.txt`: Search engine directives
- `CNAME`: Custom domain configuration (theaiops.blog)

## Common Tasks

### Repository Navigation
```bash
# View repository structure
ls -la
# Output: .github/, _config.yml, _posts/, _layouts/, _includes/, _data/, etc.

# Check recent posts
ls _posts/ | tail -5
# Shows most recent blog posts by date

# View site configuration
cat _config.yml
# Shows production site settings

# View development configuration  
cat _config.dev.yml
# Shows local development settings
```

### Build Information
- **Technology**: Jekyll 3.10.0 static site generator
- **Theme**: jekyll-theme-primer from GitHub
- **Plugins**: jekyll-paginate, jekyll-gist, jekyll-redirect-from
- **Ruby Version**: 3.2.3 (any 3.0+ version works)
- **Build Time**: 2-3 seconds (very fast)
- **Dependencies**: 98 gems total, install time <1 second

### Troubleshooting
- **"jekyll: command not found"**: Ensure PATH includes gem bin directory
- **Permission errors**: Use `--user-install` flag with gem commands
- **Faraday retry warning**: Informational only, does not affect functionality
- **Gems deprecation**: `gems:` should be `plugins:` in config (currently in dev config)

### Author Information
- **Author**: Ajeet Chouksey (defined in `_data/authors.yml`)
- **Expertise**: 18+ years in Azure, DevOps, cloud architecture
- **Social**: Twitter @ajeetchouksey27, LinkedIn, YouTube channel
- **Focus**: Azure, AI, MLOps, Product Management

### Site Features
- **Pagination**: 10 posts per page
- **Comments**: Disqus integration (azure365)
- **Analytics**: Google Analytics enabled
- **SEO**: Automatic sitemap and RSS feed generation
- **Search**: JSON-based search functionality
- **Responsive**: Mobile-friendly design
- **Syntax Highlighting**: Rouge syntax highlighter for code blocks