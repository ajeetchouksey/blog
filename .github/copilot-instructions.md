# AI-Driven Cloud & DevOps Jekyll Blog

This is a Jekyll static site blog focused on AI, DevOps, and cloud technologies with 57 blog posts and GitHub Pages deployment.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap the Environment
- **Ruby Installation**: Ruby 3.2.3 is required (system Ruby is pre-installed on most environments)
- **Install Bundler**: `gem install --user-install bundler` -- installs bundler in user directory due to system permissions
- **Add Bundler to PATH**: `export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"` -- required for user-installed gems
- **Configure Local Dependencies**: `bundler config set --local path 'vendor/bundle'` -- avoids system permission issues
- **Install Dependencies**: `bundler install` -- takes 5-10 minutes. NEVER CANCEL. Set timeout to 15+ minutes.

### Build and Test
- **Build Site**: `bundler exec jekyll build` -- takes ~3 seconds, generates `_site/` directory
- **Development Server**: `bundler exec jekyll serve --host 0.0.0.0 --port 4000` -- starts local server at http://localhost:4000
- **Development Server (Detached)**: `bundler exec jekyll serve --host 0.0.0.0 --port 4000 --detach` -- runs in background, returns PID
- **Validate Configuration**: `bundler exec jekyll doctor` -- checks for common issues, should return "Everything looks fine"

### Build Times and Timeouts
- **Dependency Installation**: 5-10 minutes. NEVER CANCEL. Set timeout to 15+ minutes.
- **Site Build**: ~3 seconds. Set timeout to 30+ seconds for safety.
- **Development Server Startup**: ~2 seconds. Set timeout to 30+ seconds.

## Validation

### Manual Testing Scenarios
- **ALWAYS test the complete user journey after making changes**:
  1. Build the site with `bundler exec jekyll build`
  2. Start development server with `bundler exec jekyll serve`
  3. Navigate to homepage at http://localhost:4000
  4. Click on a blog post title to verify individual post pages load
  5. Verify navigation menu works (Home, Tags, Category, Archive, About)
  6. Check that sidebar loads with recent posts and related posts
  7. Verify images load correctly in blog posts

### Quick Validation Steps
- **Build Validation**: Run `bundler exec jekyll build` -- should complete without errors in ~3 seconds
- **Configuration Check**: Run `bundler exec jekyll doctor` -- should return "Everything looks fine"
- **Server Test**: Start server and curl http://localhost:4000 -- should return HTTP 200

### CI/CD Integration
- **GitHub Actions**: Uses `.github/workflows/jekyll-build.yml` for automated deployment
- **Build Process**: Automated Ruby setup, bundler install, Jekyll build, and GitHub Pages deployment
- **Branch**: Deploys from `gh-pages` branch to GitHub Pages
- **Always test locally before pushing** to avoid CI failures

## Repository Structure

### Key Directories
- **`_posts/`**: 57 blog posts in Markdown format with YAML front matter
- **`_layouts/`**: Jekyll layout templates (default.html, post.html, page.html)
- **`_includes/`**: Reusable components (header.html, footer.html, sidebar.html, etc.)
- **`_data/`**: Data files (authors.yml)
- **`_sass/`**: Sass stylesheets
- **`images/`**: Blog post images and assets
- **`css/`**: Compiled CSS files
- **`js/`**: JavaScript files

### Configuration Files
- **`_config.yml`**: Production configuration (site URL: https://theaiops.blog)
- **`_config.dev.yml`**: Development configuration (localhost:4000)
- **`Gemfile`**: Ruby dependencies including jekyll-theme-primer and github-pages
- **`.gitignore`**: Excludes `_site/`, `vendor/bundle/`, `.bundle/`, and other build artifacts

### Build Outputs
- **`_site/`**: Generated static site (ignored by git)
- **`vendor/bundle/`**: Local gem dependencies (ignored by git)
- **`.bundle/`**: Bundler configuration (ignored by git)

## Common Development Tasks

### Creating New Blog Posts
- **File Location**: Place in `_posts/` directory
- **Naming Convention**: `YYYY-MM-DD-post-title.md`
- **Front Matter**: Include layout, title, description, tags, categories, and author
- **Build and Test**: Always run `bundler exec jekyll build` and test locally before committing

### Modifying Layouts/Styles
- **Layouts**: Edit files in `_layouts/` directory
- **Includes**: Modify reusable components in `_includes/`
- **Styles**: Update Sass files in `_sass/` directory
- **Test Changes**: Always test with development server to verify styling

### Debugging Issues
- **Check Logs**: Jekyll provides detailed error messages during build
- **Validate Config**: Run `bundler exec jekyll doctor` for configuration issues
- **Clean Build**: Delete `_site/` directory and rebuild if needed
- **Dependency Issues**: Clear `vendor/bundle/` and run `bundler install` again

## Troubleshooting

### Ruby/Bundler Permission Issues
- **Symptom**: "You don't have write permissions for the /var/lib/gems/3.2.0 directory"
- **Solution**: Use `gem install --user-install bundler` and add to PATH
- **Always Use**: `bundler config set --local path 'vendor/bundle'` for local gem installation

### Build Failures
- **Check Ruby Version**: Ensure Ruby 3.0+ is installed
- **Verify Dependencies**: Run `bundler install` to ensure all gems are available
- **Clean Rebuild**: Remove `_site/` and rebuild
- **Jekyll Doctor**: Run validation to identify configuration issues

### Development Server Issues
- **Port Conflicts**: Change port with `--port 4001` if 4000 is in use
- **Network Access**: Use `--host 0.0.0.0` to allow external connections
- **Stop Server**: Use Ctrl+C or `pkill -f jekyll` for detached processes

## Performance Notes
- **Fast Build**: Site builds in ~3 seconds due to optimized Jekyll configuration
- **Incremental Builds**: Use `--incremental` flag for faster rebuilds during development
- **Watch Mode**: Development server automatically rebuilds on file changes
- **GitHub Pages**: Automated builds are typically complete within 2-3 minutes

## Commands Reference

```bash
# Environment Setup (run once)
gem install --user-install bundler
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"
bundler config set --local path 'vendor/bundle'
bundler install  # 5-10 minutes, NEVER CANCEL

# Daily Development
bundler exec jekyll build        # Build site (~3 seconds)
bundler exec jekyll serve        # Start development server
bundler exec jekyll doctor       # Validate configuration

# Troubleshooting
bundler install                  # Reinstall dependencies
bundler exec jekyll clean        # Clean build cache
pkill -f jekyll                  # Stop detached server
```

## Additional Notes
- **Theme**: Uses jekyll-theme-primer from GitHub
- **Analytics**: Google Analytics configured (G-JJ9DPX6RS4)
- **Comments**: Disqus integration (azure365)
- **SEO**: Jekyll-seo-tag plugin for meta tags
- **Deployment**: Automatic via GitHub Actions to GitHub Pages
- **Domain**: Custom domain configured (theaiops.blog)

## Critical Reminders
- **NEVER CANCEL builds or dependency installation** -- they may take 5-15 minutes
- **Always test complete user scenarios** after making changes
- **Use appropriate timeouts** -- minimum 15 minutes for installs, 30+ seconds for builds
- **Verify website functionality** with browser testing, not just successful builds
- **Local gem installation** is required due to system permission restrictions