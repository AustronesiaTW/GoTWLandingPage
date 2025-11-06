# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page for the GoTW (Guide of Taiwan) mobile application, built using the Bootstrap New Age template. It's a static site showcasing a Taiwan railway, train, and bus information app available on both iOS and Android.

## Development

This is a pure static website deployed to GitHub Pages. No build system is required.

### Local Development

Use any static web server to run locally:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server is available)
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

### Styling

- **Theme CSS**: Edit `css/new-age.css` (source) or `css/new-age.min.css` (minified)
- **Custom CSS**: Edit `css/gotw.css`
- **All CSS files are plain CSS** (no preprocessor)

### Scripts

- **Custom JavaScript**: `js/index.js`, `js/i18nHelper.js`, `js/privacy.js`
- **Theme JavaScript**: `js/new-age.js` (source) or `js/new-age.min.js` (minified)

### Manual Minification

If you edit source files, you can minify them using online tools:

- **CSS Minifier**: https://www.toptal.com/developers/cssminifier
- **JavaScript Minifier**: https://www.toptal.com/developers/javascript-minifier

## Architecture

### Multi-language Support (i18n)

The site implements internationalization using jquery.i18n.properties:

- **Language files**: Located in `lib/jquery-i18n/bundle/index/Messages_*.properties`
- **Supported languages**: English (en), Traditional Chinese (zh-TW), Vietnamese (vn), Indonesian (id), Korean (kr)
- **i18nHelper**: Core i18n logic in `js/i18nHelper.js`
  - Handles language switching via dropdown
  - Auto-detects browser language on page load
  - Updates all elements with `data-msg` attributes

**Adding new languages**:
1. Create new `Messages_[locale].properties` file in `lib/jquery-i18n/bundle/index/`
2. Add language option in `index.html` dropdown (line 70-76)
3. Use appropriate flag-icon-css class for flag display

### File Structure

- `index.html` - Main landing page with sections: header, download, features, contact
- `privacy.html` - Privacy policy page
- `tos.html` - Terms of Service page
- `facebook-data-deletion.html` - Facebook data deletion instructions
- `js/index.js` - Page initialization, language detection, Pace loading bar integration
- `js/i18nHelper.js` - Internationalization helper module
- `css/` - CSS stylesheets (plain CSS, no preprocessor)
- `lib/` - Vendor libraries (Bootstrap, jQuery, Font Awesome, etc.)

### Key Dependencies

- Bootstrap 4.x (grid, components)
- jQuery 3.x
- jquery.i18n.properties (internationalization)
- bootstrap-select (styled language dropdown)
- flag-icon-css (country flags in language selector)
- Pace.js (page loading progress bar)

## Development Notes

- The site uses plain CSS; edit files in `css/` directory directly
- After editing `css/new-age.css` or `js/new-age.js`, remember to manually minify to create `.min` versions
- Language strings are loaded dynamically; HTML elements use `data-msg` attributes that map to properties file keys
- The navbar, feature sections, and all user-facing text should be internationalized
- This is a pure static site - no build step required for deployment
