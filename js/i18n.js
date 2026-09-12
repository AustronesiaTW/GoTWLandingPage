/*!
 * GoTW i18n Module - Lightweight internationalization with auto language detection
 * No external dependencies - Pure vanilla JavaScript
 */

(function() {
    'use strict';

    var DEFAULT_LOCALE = 'en';
    var SUPPORTED_LOCALES = ['en', 'zh-TW', 'id', 'vi', 'ko', 'th', 'tl'];
    var LOCALE_ALIASES = {
        'en': 'en',
        'id': 'id',
        'vi': 'vi',
        'vn': 'vi',
        'ko': 'ko',
        'kr': 'ko',
        'th': 'th',
        'tl': 'tl',
        'fil': 'tl'
    };

    var PAGE_METADATA = {
        'en': {
            'title': 'GoTW - Taiwan Transportation App | Real-time Train & Bus Info',
            'ogLocale': 'en_US'
        },
        'zh-TW': {
            'title': 'GoTW－台灣交通 App｜即時火車與公車資訊',
            'ogLocale': 'zh_TW'
        },
        'id': {
            'title': 'GoTW - Aplikasi Transportasi Taiwan | Info Kereta & Bus Real-time',
            'ogLocale': 'id_ID'
        },
        'vi': {
            'title': 'GoTW - Ứng dụng giao thông Đài Loan | Tàu & xe buýt thời gian thực',
            'ogLocale': 'vi_VN'
        },
        'ko': {
            'title': 'GoTW - 대만 교통 앱 | 실시간 기차·버스 정보',
            'ogLocale': 'ko_KR'
        },
        'th': {
            'title': 'GoTW - แอปเดินทางไต้หวัน | ข้อมูลรถไฟและรถบัสเรียลไทม์',
            'ogLocale': 'th_TH'
        },
        'tl': {
            'title': 'GoTW - App sa Transportasyon sa Taiwan | Real-time na Tren at Bus',
            'ogLocale': 'tl_PH'
        }
    };

    var own = Object.prototype.hasOwnProperty;

    var translations = {
        'en': {
            'msg_download': 'Download',
            'msg_features': 'Features',
            'msg_contact': 'Contact',
            'msg_header_content': 'Provide all of Taiwan information you want, anywhere and anytime!',
            'msg_download_header': 'Discover Taiwan with us!',
            'msg_download_description': 'Our app is available on any mobile device! Download now to get started!',
            'msg_feature_header': 'Simple features make life easier',
            'msg_feature_description': 'Check out what you can do with this app!',
            'msg_feature_item1': 'Real time',
            'msg_feature_item1_content': 'TRA Schedules & Bus Real Time Arrivals in multiple cities',
            'msg_feature_item2': 'Helper',
            'msg_feature_item2_content': 'An easy to use feature, help you ask for directions',
            'msg_feature_item3': 'Cities',
            'msg_feature_item3_content': 'Realtime bus info of Taiwan',
            'msg_feature_item4': 'Design',
            'msg_feature_item4_content': 'Elegant and user first design',
            'msg_cta_header1': 'Everyone is using GoTW',
            'msg_cta_button': 'Start Now for Free!'
        },
        'zh-TW': {
            'msg_download': '下載',
            'msg_features': '特色',
            'msg_contact': '聯絡我們',
            'msg_header_content': '隨時隨地提供您想要的所有台灣資訊！',
            'msg_download_header': '與我們一起探索台灣！',
            'msg_download_description': '我們的 App 可在任何移動設備上使用！ 立即下載即可開始使用！',
            'msg_feature_header': '簡單的功能使生活更輕鬆',
            'msg_feature_description': '看看你可以用這個 App 做什麼！',
            'msg_feature_item1': '即時',
            'msg_feature_item1_content': '多個城市的火車時刻表和公車動態',
            'msg_feature_item2': '問路',
            'msg_feature_item2_content': '簡單的功能，可以幫助您詢問路線',
            'msg_feature_item3': '城市',
            'msg_feature_item3_content': '支援全台灣的公車動態',
            'msg_feature_item4': '設計',
            'msg_feature_item4_content': '簡潔和用戶第一的設計',
            'msg_cta_header1': '每個人都在使用\nGoTW',
            'msg_cta_button': '立即免費開始使用！'
        },
        'id': {
            'msg_download': 'Download',
            'msg_features': 'Fitur',
            'msg_contact': 'Kontak',
            'msg_header_content': 'Berikan semua informasi Taiwan yang Anda inginkan, dimana saja dan kapan saja!',
            'msg_download_header': 'Temukan Taiwan bersama kami!',
            'msg_download_description': 'Aplikasi kami tersedia di perangkat mobile manapun! Download sekarang untuk memulai!',
            'msg_feature_header': 'Fitur sederhana membuat hidup lebih mudah',
            'msg_feature_description': 'Lihat apa yang dapat Anda lakukan dengan aplikasi ini!',
            'msg_feature_item1': 'Waktu sebenarnya',
            'msg_feature_item1_content': 'Jadwal kereta TRA dan waktu kedatangan bus secara real-time di berbagai kota',
            'msg_feature_item2': 'Pembantu',
            'msg_feature_item2_content': 'Fitur yang mudah digunakan, membantu Anda menanyakan arah',
            'msg_feature_item3': 'Kota',
            'msg_feature_item3_content': 'Info bus waktu-nyata Taiwan',
            'msg_feature_item4': 'Desain',
            'msg_feature_item4_content': 'Desain elegan yang mengutamakan pengguna',
            'msg_cta_header1': 'Semua orang menggunakan GoTW',
            'msg_cta_button': 'Mulai Sekarang Gratis!'
        },
        'vi': {
            'msg_download': 'Tải về',
            'msg_features': 'Tính năng',
            'msg_contact': 'Liên hệ',
            'msg_header_content': 'Cung cấp tất cả các thông tin Đài Loan bạn muốn, mọi nơi và mọi lúc!',
            'msg_download_header': 'Khám phá Đài Loan với chúng tôi!',
            'msg_download_description': 'Ứng dụng của chúng tôi có sẵn trên bất kỳ thiết bị di động! Tải xuống ngay để bắt đầu!',
            'msg_feature_header': 'Các tính năng đơn giản giúp cuộc sống dễ dàng hơn',
            'msg_feature_description': 'Kiểm tra những gì bạn có thể làm với ứng dụng này!',
            'msg_feature_item1': 'Thời gian thực',
            'msg_feature_item1_content': 'Lịch trình của TRA và xe buýt Thời gian thực Đến nhiều thành phố',
            'msg_feature_item2': 'Người trợ giúp',
            'msg_feature_item2_content': 'Một tính năng dễ sử dụng, giúp bạn hỏi đường',
            'msg_feature_item3': 'Các thành phố',
            'msg_feature_item3_content': 'Thông tin xe buýt thời gian thực của Đài Loan',
            'msg_feature_item4': 'Thiết kế',
            'msg_feature_item4_content': 'Thiết kế thanh lịch, ưu tiên người dùng',
            'msg_cta_header1': 'Mọi người đang sử dụng GoTW',
            'msg_cta_button': 'Bắt đầu miễn phí ngay!'
        },
        'ko': {
            'msg_download': '다운로드',
            'msg_features': '기능',
            'msg_contact': '연락처',
            'msg_header_content': '언제 어디서든 원하는 대만 정보를 제공합니다!',
            'msg_download_header': '함께 대만을 탐색하세요!',
            'msg_download_description': '저희 앱은 모든 모바일 기기에서 이용 가능합니다! 지금 다운로드하여 시작하세요!',
            'msg_feature_header': '간편한 기능으로 삶을 더욱 편리하게',
            'msg_feature_description': '이 앱으로 무엇을 할 수 있는지 확인해보세요!',
            'msg_feature_item1': '실시간',
            'msg_feature_item1_content': '다양한 도시에서 대만 철도 일정 및 버스 실시간 도착 정보',
            'msg_feature_item2': '도우미',
            'msg_feature_item2_content': '사용하기 쉬운 기능으로, 방향 문의를 도와줍니다.',
            'msg_feature_item3': '도시',
            'msg_feature_item3_content': '대만의 버스 실시간 정보',
            'msg_feature_item4': '디자인',
            'msg_feature_item4_content': '우아하고 사용자 중심의 디자인',
            'msg_cta_header1': '모두가 GoTW를 사용하고 있습니다',
            'msg_cta_button': '지금 무료로 시작하세요!'
        },
        'th': {
            'msg_download': 'ดาวน์โหลด',
            'msg_features': 'ฟีเจอร์',
            'msg_contact': 'ติดต่อ',
            'msg_header_content': 'ให้ข้อมูลไต้หวันที่คุณต้องการได้ทุกที่ทุกเวลา!',
            'msg_download_header': 'สำรวจไต้หวันไปกับเรา!',
            'msg_download_description': 'แอปของเราใช้งานได้บนอุปกรณ์มือถือทุกเครื่อง! ดาวน์โหลดตอนนี้เพื่อเริ่มต้น!',
            'msg_feature_header': 'ฟีเจอร์เรียบง่าย ช่วยให้ชีวิตง่ายขึ้น',
            'msg_feature_description': 'ดูสิว่าคุณทำอะไรได้บ้างด้วยแอปนี้!',
            'msg_feature_item1': 'เรียลไทม์',
            'msg_feature_item1_content': 'ตารางรถไฟ TRA และเวลารถบัสมาถึงแบบเรียลไทม์ในหลายเมือง',
            'msg_feature_item2': 'ผู้ช่วย',
            'msg_feature_item2_content': 'ฟีเจอร์ที่ใช้งานง่าย ช่วยให้คุณถามเส้นทางได้',
            'msg_feature_item3': 'เมือง',
            'msg_feature_item3_content': 'ข้อมูลรถบัสแบบเรียลไทม์ทั่วไต้หวัน',
            'msg_feature_item4': 'ดีไซน์',
            'msg_feature_item4_content': 'ดีไซน์เรียบหรูและคำนึงถึงผู้ใช้เป็นอันดับแรก',
            'msg_cta_header1': 'ทุกคนกำลังใช้ GoTW',
            'msg_cta_button': 'เริ่มใช้ฟรีตอนนี้!'
        },
        'tl': {
            'msg_download': 'I-download',
            'msg_features': 'Mga Tampok',
            'msg_contact': 'Makipag-ugnayan',
            'msg_header_content': 'Ibinibigay ang lahat ng impormasyong Taiwan na kailangan mo, saanman at anumang oras!',
            'msg_download_header': 'Tuklasin ang Taiwan kasama kami!',
            'msg_download_description': 'Available ang aming app sa anumang mobile device! I-download ngayon para makapagsimula!',
            'msg_feature_header': 'Pinapasimple ng mga tampok ang araw-araw',
            'msg_feature_description': 'Tingnan kung ano ang magagawa mo gamit ang app na ito!',
            'msg_feature_item1': 'Agad-agad',
            'msg_feature_item1_content': 'Mga iskedyul ng TRA at real-time na dating ng bus sa maraming lungsod',
            'msg_feature_item2': 'Katulong',
            'msg_feature_item2_content': 'Madaling gamiting tampok na tumutulong sa iyo magtanong ng direksyon',
            'msg_feature_item3': 'Mga Lungsod',
            'msg_feature_item3_content': 'Real-time na impormasyon ng bus sa Taiwan',
            'msg_feature_item4': 'Disenyo',
            'msg_feature_item4_content': 'Eleganteng disenyo na inuuna ang gumagamit',
            'msg_cta_header1': 'Ginagamit ng lahat ang GoTW',
            'msg_cta_button': 'Magsimula nang Libre Ngayon!'
        }
    };

    function hasOwn(object, key) {
        return own.call(object, key);
    }

    function isSupportedLocale(locale) {
        return SUPPORTED_LOCALES.indexOf(locale) !== -1 && hasOwn(translations, locale);
    }

    function normalizeLocale(candidate) {
        if (typeof candidate !== 'string') {
            return null;
        }

        var normalized = candidate.trim().replace(/_/g, '-').toLowerCase();
        if (!normalized) {
            return null;
        }

        var base = normalized.split('-')[0];
        if (base === 'zh') {
            return 'zh-TW';
        }

        if (!hasOwn(LOCALE_ALIASES, base)) {
            return null;
        }

        var locale = LOCALE_ALIASES[base];
        return isSupportedLocale(locale) ? locale : null;
    }

    function getLanguagePreferences() {
        if (navigator.languages && Object.prototype.toString.call(navigator.languages) === '[object Array]' && navigator.languages.length > 0) {
            return navigator.languages;
        }

        if (navigator.language) {
            return [navigator.language];
        }

        if (navigator.userLanguage) {
            return [navigator.userLanguage];
        }

        return [];
    }

    function detectLanguage() {
        var preferences = getLanguagePreferences();

        for (var i = 0; i < preferences.length; i++) {
            var locale = normalizeLocale(preferences[i]);
            if (locale) {
                return locale;
            }
        }

        return DEFAULT_LOCALE;
    }

    function getMessage(locale, key) {
        if (isSupportedLocale(locale) && hasOwn(translations[locale], key)) {
            return translations[locale][key];
        }

        if (hasOwn(translations[DEFAULT_LOCALE], key)) {
            return translations[DEFAULT_LOCALE][key];
        }

        if (window.console && typeof window.console.warn === 'function') {
            window.console.warn('Missing translation key: ' + key);
        }

        return null;
    }

    function renderTextWithLineBreaks(element, value) {
        var parts = value.split('\n');

        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        for (var i = 0; i < parts.length; i++) {
            if (i > 0) {
                element.appendChild(document.createElement('br'));
            }
            element.appendChild(document.createTextNode(parts[i]));
        }
    }

    function updateMetadata(locale) {
        var lang = isSupportedLocale(locale) && hasOwn(PAGE_METADATA, locale) ? locale : DEFAULT_LOCALE;
        var metadata = PAGE_METADATA[lang];
        var ogLocale = document.querySelector('meta[property="og:locale"]');

        document.title = metadata.title;

        if (ogLocale) {
            ogLocale.setAttribute('content', metadata.ogLocale);
        }
    }

    function updateMessages(locale) {
        var lang = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
        var elements = document.querySelectorAll('[data-msg]');

        document.documentElement.setAttribute('lang', lang);
        updateMetadata(lang);

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var key = el.getAttribute('data-msg');
            var message = getMessage(lang, key);

            if (message !== null) {
                renderTextWithLineBreaks(el, message);
            }
        }
    }

    function applyDetectedLanguage() {
        updateMessages(detectLanguage());
    }

    function init() {
        applyDetectedLanguage();

        if (window.addEventListener) {
            window.addEventListener('languagechange', applyDetectedLanguage, false);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
