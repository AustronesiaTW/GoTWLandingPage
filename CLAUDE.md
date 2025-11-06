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

- **Custom JavaScript**: `js/index.js`, `js/i18n.js`
- **Theme JavaScript**: `js/new-age.js` (source) or `js/new-age.min.js` (minified)

### Manual Minification

If you edit source files, you can minify them using online tools:

- **CSS Minifier**: https://www.toptal.com/developers/cssminifier
- **JavaScript Minifier**: https://www.toptal.com/developers/javascript-minifier

## Architecture

### Multi-language Support (i18n)

The site implements lightweight internationalization with automatic language detection:

- **Implementation**: `js/i18n.js` - Pure vanilla JavaScript, no external dependencies
- **Supported languages**: English (en), Traditional Chinese (zh-TW), Vietnamese (vn), Indonesian (id), Korean (kr)
- **Auto-detection**: Automatically detects browser language on page load
- **Translation storage**: All translations stored inline as JSON object in `js/i18n.js`
- **HTML integration**: Updates all elements with `data-msg` attributes

**How it works**:
1. On page load, `i18n.js` detects the browser's language preference
2. Normalizes language codes (e.g., zh-CN → zh-TW, vi → vn, ko → kr)
3. Finds all elements with `data-msg` attributes
4. Updates their innerHTML with corresponding translations
5. Updates `lang` attributes on relevant elements

**Only used on**: `index.html` (main landing page)
**Static content**: privacy.html, term-of-service.html, facebook-data-deletion.html use hardcoded text

**Adding new languages**:
1. Add new language object to the `translations` constant in `js/i18n.js`
2. Add normalization logic in `detectLanguage()` function if needed
3. Ensure all message keys are defined (msg_download, msg_features, etc.)

### File Structure

- `index.html` - Main landing page with sections: header, download, features, contact (uses i18n)
- `privacy.html` - Privacy policy page (static Chinese content)
- `term-of-service.html` - Terms of Service page (static Chinese content)
- `facebook-data-deletion.html` - Facebook data deletion instructions (static bilingual content)
- `js/index.js` - Page initialization
- `js/i18n.js` - Lightweight internationalization module with auto-detection
- `css/` - CSS stylesheets (plain CSS, no preprocessor)
- `lib/` - Vendor libraries (Bootstrap, jQuery, Font Awesome, etc.)

### Key Dependencies

- **Bootstrap 4.6.2** (grid, components) - Upgraded from 3.3.7
- **jQuery 3.7.1** (DOM manipulation) - Upgraded from 3.x for security patches (CVE-2020-11022, CVE-2020-11023)
- **Font Awesome** (icons)
- **Simple Line Icons** (additional icons)

### Important Bootstrap 4 Migration Notes

**Breaking Changes from Bootstrap 3 → 4:**
- Removed Bootstrap Affix plugin - replaced with CSS `position: sticky` in `css/gotw.css`
- Navbar classes changed: `navbar-default navbar-fixed-top` → `navbar-light bg-light`
- Navbar uses CSS sticky positioning (`#mainNav` in `css/gotw.css`)
- Scrollspy target changed from `.navbar-fixed-top` to `#mainNav`
- JavaScript scroll handler adds `.navbar-shrink` class when scrolling (replaces affix behavior)

**Files Modified for Bootstrap 4:**
- `js/new-age.js` - Removed `.affix()`, added scroll handler for `.navbar-shrink`
- `css/new-age.css` - Changed `.navbar-default.affix` to `.navbar-shrink`
- `css/gotw.css` - Added `#mainNav` sticky positioning styles
- All HTML files - Updated navbar classes, removed `fixed-top`

## Development Notes

- The site uses plain CSS; edit files in `css/` directory directly
- After editing `css/new-age.css` or `js/new-age.js`, remember to manually minify to create `.min` versions
- Language translation is automatic on page load via `js/i18n.js`
- HTML elements use `data-msg` attributes that map to translation keys in the `translations` object
- Only `index.html` uses dynamic i18n; other pages have static content
- This is a pure static site - no build step required for deployment
- **Navbar uses CSS sticky** - Modify `#mainNav` styles in `css/gotw.css` for sticky behavior
- **Scrollspy requires** `#mainNav` as target (not class selector)
