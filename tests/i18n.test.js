const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const rootDir = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(rootDir, 'js/i18n.js'), 'utf8');
const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

function unique(values) {
    return Array.from(new Set(values));
}

function sorted(values) {
    return values.slice().sort();
}

function getHtmlKeys() {
    return unique(Array.from(html.matchAll(/\bdata-msg=(["'])([^"']+)\1/g), function(match) {
        return match[2];
    }));
}

class TextNode {
    constructor(text) {
        this.nodeType = 3;
        this.textContent = text;
    }
}

class Element {
    constructor(tagName, attributes, text) {
        this.nodeType = 1;
        this.tagName = tagName.toUpperCase();
        this.attributes = Object.assign({}, attributes || {});
        this.childNodes = [];
        if (typeof text === 'string') {
            this.appendChild(new TextNode(text));
        }
    }

    get firstChild() {
        return this.childNodes[0] || null;
    }

    get textContent() {
        return this.childNodes.map(function(child) {
            return child.textContent || '';
        }).join('');
    }

    set textContent(value) {
        this.childNodes = [new TextNode(value)];
    }

    getAttribute(name) {
        return Object.prototype.hasOwnProperty.call(this.attributes, name) ? this.attributes[name] : null;
    }

    setAttribute(name, value) {
        this.attributes[name] = String(value);
    }

    appendChild(child) {
        this.childNodes.push(child);
        return child;
    }

    removeChild(child) {
        const index = this.childNodes.indexOf(child);
        if (index !== -1) {
            this.childNodes.splice(index, 1);
        }
        return child;
    }
}

function createFakeDocument(keys) {
    const dataMsgElements = keys.map(function(key) {
        return new Element('span', { 'data-msg': key }, 'fallback:' + key);
    });
    const staticEnglishElements = [
        new Element('span', { lang: 'en' }, 'Toggle navigation'),
        new Element('h2', { lang: 'en' }, 'We new friends!'),
        new Element('p', { lang: 'en' }, 'Austronesia TW. All Rights Reserved.'),
        new Element('a', { lang: 'en' }, 'Privacy'),
        new Element('a', { lang: 'en' }, 'Terms of Service')
    ];
    const ogLocaleElement = new Element('meta', { property: 'og:locale', content: 'en_US' });

    return {
        readyState: 'complete',
        title: 'GoTW - Taiwan Transportation App | Real-time Train & Bus Info',
        documentElement: new Element('html', { lang: 'en' }),
        dataMsgElements,
        staticEnglishElements,
        ogLocaleElement,
        querySelectorAll(selector) {
            if (selector === '[data-msg]') {
                return dataMsgElements;
            }
            return [];
        },
        querySelector(selector) {
            if (selector === 'meta[property="og:locale"]') {
                return ogLocaleElement;
            }
            return null;
        },
        createElement(tagName) {
            return new Element(tagName);
        },
        createTextNode(text) {
            return new TextNode(text);
        },
        addEventListener() {}
    };
}

function instrumentSource(rawSource) {
    return rawSource.replace(/\n\}\)\(\);\s*$/, `
    window.__i18nTest = {
        DEFAULT_LOCALE: DEFAULT_LOCALE,
        SUPPORTED_LOCALES: SUPPORTED_LOCALES,
        LOCALE_ALIASES: LOCALE_ALIASES,
        PAGE_METADATA: PAGE_METADATA,
        translations: translations,
        normalizeLocale: normalizeLocale,
        detectLanguage: detectLanguage,
        updateMessages: updateMessages,
        updateMetadata: updateMetadata,
        getMessage: getMessage
    };
})();
`);
}

function runI18n(navigatorOverrides) {
    const document = createFakeDocument(htmlKeys);
    const listeners = [];
    const context = {
        console: {
            warn() {}
        },
        document,
        navigator: Object.assign({}, navigatorOverrides || {}),
        window: {
            console: {
                warn() {}
            },
            addEventListener(eventName, handler) {
                listeners.push({ eventName, handler });
            }
        }
    };

    vm.runInNewContext(instrumentSource(source), context, { filename: 'js/i18n.js' });

    return {
        document,
        api: context.window.__i18nTest,
        listeners
    };
}

const htmlKeys = getHtmlKeys();
const expectedLocales = ['en', 'zh-TW', 'id', 'vi', 'ko', 'th', 'tl'];
const expectedMetadata = {
    'en': {
        title: 'GoTW - Taiwan Transportation App | Real-time Train & Bus Info',
        ogLocale: 'en_US'
    },
    'zh-TW': {
        title: 'GoTW－台灣交通 App｜即時火車與公車資訊',
        ogLocale: 'zh_TW'
    },
    'id': {
        title: 'GoTW - Aplikasi Transportasi Taiwan | Info Kereta & Bus Real-time',
        ogLocale: 'id_ID'
    },
    'vi': {
        title: 'GoTW - Ứng dụng giao thông Đài Loan | Tàu & xe buýt thời gian thực',
        ogLocale: 'vi_VN'
    },
    'ko': {
        title: 'GoTW - 대만 교통 앱 | 실시간 기차·버스 정보',
        ogLocale: 'ko_KR'
    },
    'th': {
        title: 'GoTW - แอปเดินทางไต้หวัน | ข้อมูลรถไฟและรถบัสเรียลไทม์',
        ogLocale: 'th_TH'
    },
    'tl': {
        title: 'GoTW - App sa Transportasyon sa Taiwan | Real-time na Tren at Bus',
        ogLocale: 'tl_PH'
    }
};

assert.deepEqual(sorted(htmlKeys), sorted([
    'msg_download',
    'msg_features',
    'msg_contact',
    'msg_header_content',
    'msg_download_header',
    'msg_download_description',
    'msg_feature_header',
    'msg_feature_description',
    'msg_feature_item1',
    'msg_feature_item1_content',
    'msg_feature_item2',
    'msg_feature_item2_content',
    'msg_feature_item3',
    'msg_feature_item3_content',
    'msg_feature_item4',
    'msg_feature_item4_content',
    'msg_cta_header1',
    'msg_cta_button'
]));

const baseline = runI18n({ languages: ['en-US'] });
const translations = baseline.api.translations;
const pageMetadata = baseline.api.PAGE_METADATA;
assert.deepEqual(sorted(Object.keys(translations)), sorted(expectedLocales));
assert.deepEqual(sorted(Object.keys(pageMetadata)), sorted(expectedLocales));
assert(!Object.prototype.hasOwnProperty.call(translations, 'vn'));
assert(!Object.prototype.hasOwnProperty.call(translations, 'kr'));
assert.equal(baseline.api.LOCALE_ALIASES.vn, 'vi');
assert.equal(baseline.api.LOCALE_ALIASES.kr, 'ko');
assert.equal(baseline.api.LOCALE_ALIASES.fil, 'tl');

expectedLocales.forEach(function(locale) {
    assert.deepEqual(sorted(Object.keys(translations[locale])), sorted(htmlKeys), locale + ' keys must match HTML keys');
    htmlKeys.forEach(function(key) {
        const value = translations[locale][key];
        assert.equal(typeof value, 'string', locale + '.' + key + ' must be a string');
        assert.notEqual(value.trim(), '', locale + '.' + key + ' must not be empty');
        assert.equal(value, value.trim(), locale + '.' + key + ' must not have leading or trailing whitespace');
        assert(!/<[^>]+>/.test(value), locale + '.' + key + ' must not contain markup');
    });

    assert.equal(pageMetadata[locale].title, expectedMetadata[locale].title);
    assert.equal(pageMetadata[locale].ogLocale, expectedMetadata[locale].ogLocale);

    const metadataResult = runI18n({ languages: [locale] });
    assert.equal(metadataResult.document.title, expectedMetadata[locale].title);
    assert.equal(metadataResult.document.ogLocaleElement.getAttribute('content'), expectedMetadata[locale].ogLocale);
});

const fallbackMetadata = runI18n({ languages: ['fr-FR'] });
assert.equal(fallbackMetadata.document.title, expectedMetadata.en.title);
assert.equal(fallbackMetadata.document.ogLocaleElement.getAttribute('content'), expectedMetadata.en.ogLocale);

const htmlTitleMatch = html.match(/<title>([^<]+)<\/title>/);
assert(htmlTitleMatch);
assert.equal(htmlTitleMatch[1], expectedMetadata.en.title);

assert(!source.includes('innerHTML'));
assert(!source.includes('insertAdjacentHTML'));
assert(!source.includes('outerHTML'));
assert(!/eval\s*\(/.test(source));
assert(!source.includes('new Function'));

[
    ['en', 'en'],
    ['en-US', 'en'],
    ['en-GB', 'en'],
    ['id', 'id'],
    ['id-ID', 'id'],
    ['vi', 'vi'],
    ['vi-VN', 'vi'],
    ['vi_VN', 'vi'],
    ['vn', 'vi'],
    ['ko', 'ko'],
    ['ko-KR', 'ko'],
    ['ko_KR', 'ko'],
    ['kr', 'ko'],
    ['th', 'th'],
    ['th-TH', 'th'],
    ['tl', 'tl'],
    ['tl-PH', 'tl'],
    ['fil', 'tl'],
    ['fil-PH', 'tl'],
    ['zh', 'zh-TW'],
    ['zh-TW', 'zh-TW'],
    ['zh-Hant', 'zh-TW'],
    ['zh-Hant-TW', 'zh-TW'],
    ['zh-HK', 'zh-TW'],
    ['zh-MO', 'zh-TW'],
    ['zh-CN', 'zh-TW'],
    ['zh-Hans', 'zh-TW'],
    ['zh-Hans-CN', 'zh-TW'],
    ['zh-SG', 'zh-TW'],
    ['fr-FR', 'en'],
    ['', 'en'],
    [null, 'en'],
    ['__proto__', 'en'],
    ['constructor', 'en']
].forEach(function(testCase) {
    const actual = runI18n({ languages: [testCase[0]], language: 'en-US' }).document.documentElement.getAttribute('lang');
    assert.equal(actual, testCase[1], String(testCase[0]));
});

[
    [['fr-FR', 'th-TH', 'en-US'], 'th'],
    [['xx-YY', 'fil-PH'], 'tl'],
    [['xx-YY', 'en-US'], 'en']
].forEach(function(testCase) {
    const actual = runI18n({ languages: testCase[0] }).document.documentElement.getAttribute('lang');
    assert.equal(actual, testCase[1], testCase[0].join(', '));
});

assert.equal(runI18n({ language: 'vi-VN' }).document.documentElement.getAttribute('lang'), 'vi');
assert.equal(runI18n({ language: 'ko-KR' }).document.documentElement.getAttribute('lang'), 'ko');
assert.equal(runI18n({ userLanguage: 'th-TH' }).document.documentElement.getAttribute('lang'), 'th');
assert.equal(runI18n({ languages: ['vn'] }).document.documentElement.getAttribute('lang'), 'vi');
assert.equal(runI18n({ languages: ['kr'] }).document.documentElement.getAttribute('lang'), 'ko');

['th', 'tl'].forEach(function(locale) {
    const result = runI18n({ languages: [locale] });
    result.document.dataMsgElements.forEach(function(element) {
        const key = element.getAttribute('data-msg');
        assert.notEqual(element.textContent, translations.en[key], locale + '.' + key + ' must not fall back to English');
    });
});

const zhResult = runI18n({ languages: ['zh-TW'] });
const zhCta = zhResult.document.dataMsgElements.find(function(element) {
    return element.getAttribute('data-msg') === 'msg_cta_header1';
});
assert.equal(zhCta.childNodes.length, 3);
assert.equal(zhCta.childNodes[0].textContent, '每個人都在使用');
assert.equal(zhCta.childNodes[1].tagName, 'BR');
assert.equal(zhCta.childNodes[2].textContent, 'GoTW');

assert.equal(translations.en.msg_cta_header1, 'Everyone is using GoTW');
assert.equal(translations.en.msg_cta_button, 'Start Now for Free!');
assert(!html.includes('msg_cta_header2'));
assert(!source.includes('msg_cta_header2'));

assert.equal(translations.id.msg_feature_item1_content, 'Jadwal kereta TRA dan waktu kedatangan bus secara real-time di berbagai kota');
assert.equal(translations.id.msg_feature_item4_content, 'Desain elegan yang mengutamakan pengguna');
assert.equal(translations.vi.msg_features, 'Tính năng');
assert.equal(translations.vi.msg_contact, 'Liên hệ');
assert.equal(translations.vi.msg_feature_item4_content, 'Thiết kế thanh lịch, ưu tiên người dùng');
assert.equal(translations.ko.msg_download, '다운로드');
assert.equal(translations.ko.msg_features, '기능');
assert.equal(translations.ko.msg_contact, '연락처');

const ctaButtonMatches = Array.from(html.matchAll(/<a\b[^>]*\bdata-msg=["']msg_cta_button["'][^>]*>([^<]*)<\/a>/g));
assert.equal(ctaButtonMatches.length, 2);
ctaButtonMatches.forEach(function(match) {
    assert.equal(match[1], 'Start Now for Free!');
});

const missingKeyResult = runI18n({ languages: ['en-US'] });
const missing = new Element('span', { 'data-msg': 'missing_key' }, 'Original copy');
missingKeyResult.document.dataMsgElements.push(missing);
assert.doesNotThrow(function() {
    missingKeyResult.api.updateMessages('th');
});
assert.equal(missing.textContent, 'Original copy');
assert(!missing.textContent.includes('undefined'));

assert(!/<[^>]*\bdata-msg=["'][^"']+["'][^>]*\blang=/.test(html));
assert(!/<[^>]*\blang=["']en["'][^>]*\bdata-msg=/.test(html));
assert(!/<div\b[^>]*\bclass=["']navbar-menu["'][^>]*\blang=/.test(html));
assert(!/<div\b[^>]*\bclass=["']container["'][^>]*\blang=/.test(html));
assert(!/<div\b[^>]*\bclass=["']cta-content["'][^>]*\blang=/.test(html));

assert(/<span class="sr-only" lang="en">Toggle navigation<\/span>/.test(html));
assert(/<h2 lang="en">We /.test(html));
assert(/<p lang="en">&copy;/.test(html));
assert(/<a href="\/privacy\.html" lang="en">Privacy<\/a>/.test(html));
assert(/<a href="\/term-of-service\.html" lang="en">Terms of Service<\/a>/.test(html));

const langBoundary = runI18n({ languages: ['th-TH'] });
langBoundary.document.staticEnglishElements.forEach(function(element) {
    assert.equal(element.getAttribute('lang'), 'en');
});

assert.equal(baseline.listeners.length, 1);
assert.equal(baseline.listeners[0].eventName, 'languagechange');

console.log('i18n tests passed');
