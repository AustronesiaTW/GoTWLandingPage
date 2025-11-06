/*!
 * GoTW i18n Module - Lightweight internationalization with auto language detection
 * No external dependencies - Pure vanilla JavaScript
 */

(function() {
    'use strict';

    // All translations in a single object
    const translations = {
        "en": {
            "msg_download": "Download",
            "msg_features": "Features",
            "msg_contact": "Contact",
            "msg_header_content": "Provide all of Taiwan information you want, anywhere and anytime!",
            "msg_download_header": "Discover Taiwan with us!",
            "msg_download_description": "Our app is available on any mobile device! Download now to get started!",
            "msg_feature_header": "Simple features make life easier",
            "msg_feature_description": "Check out what you can do with this app!",
            "msg_feature_item1": "Real time",
            "msg_feature_item1_content": "TRA Schedules & Bus Real Time Arrivals in multiple cities",
            "msg_feature_item2": "Helper",
            "msg_feature_item2_content": "An easy to use feature, help you ask for directions",
            "msg_feature_item3": "Cities",
            "msg_feature_item3_content": "Realtime bus info of Taiwan",
            "msg_feature_item4": "Design",
            "msg_feature_item4_content": "Elegant and user first design",
            "msg_cta_header1": "Everyone is using ",
            "msg_cta_header2": "Start download"
        },
        "zh-TW": {
            "msg_download": "下載",
            "msg_features": "特色",
            "msg_contact": "聯絡我們",
            "msg_header_content": "隨時隨地提供您想要的所有台灣資訊！",
            "msg_download_header": "與我們一起探索台灣！",
            "msg_download_description": "我們的 App 可在任何移動設備上使用！ 立即下載即可開始使用！",
            "msg_feature_header": "簡單的功能使生活更輕鬆",
            "msg_feature_description": "看看你可以用這個 App 做什麼！",
            "msg_feature_item1": "即時",
            "msg_feature_item1_content": "多個城市的火車時刻表和公車動態",
            "msg_feature_item2": "問路",
            "msg_feature_item2_content": "簡單的功能，可以幫助您詢問路線",
            "msg_feature_item3": "城市",
            "msg_feature_item3_content": "支援全台灣的公車動態",
            "msg_feature_item4": "設計",
            "msg_feature_item4_content": "簡潔和用戶第一的設計",
            "msg_cta_header1": "每個人都在使用<br>現在下載"
        },
        "vn": {
            "msg_download": "Tải về",
            "msg_features": "Tính năng, đặc điểm",
            "msg_contact": "Tiếp xúc",
            "msg_header_content": "Cung cấp tất cả các thông tin Đài Loan bạn muốn, mọi nơi và mọi lúc!",
            "msg_download_header": "Khám phá Đài Loan với chúng tôi!",
            "msg_download_description": "Ứng dụng của chúng tôi có sẵn trên bất kỳ thiết bị di động! Tải xuống ngay để bắt đầu!",
            "msg_feature_header": "Các tính năng đơn giản giúp cuộc sống dễ dàng hơn",
            "msg_feature_description": "Kiểm tra những gì bạn có thể làm với ứng dụng này!",
            "msg_feature_item1": "Thời gian thực",
            "msg_feature_item1_content": "Lịch trình của TRA và xe buýt Thời gian thực Đến nhiều thành phố",
            "msg_feature_item2": "Người trợ giúp",
            "msg_feature_item2_content": "Một tính năng dễ sử dụng, giúp bạn hỏi đường",
            "msg_feature_item3": "Các thành phố",
            "msg_feature_item3_content": "Thông tin xe buýt thời gian thực của Đài Loan",
            "msg_feature_item4": "Thiết kế",
            "msg_feature_item4_content": "Thiết kế thanh lịch và người dùng đầu tiên",
            "msg_cta_header1": "Mọi người đang sử dụng ",
            "msg_cta_header2": "Bắt đầu Tải về"
        },
        "id": {
            "msg_download": "Download",
            "msg_features": "Fitur",
            "msg_contact": "Kontak",
            "msg_header_content": "Berikan semua informasi Taiwan yang Anda inginkan, dimana saja dan kapan saja!",
            "msg_download_header": "Temukan Taiwan bersama kami!",
            "msg_download_description": "Aplikasi kami tersedia di perangkat mobile manapun! Download sekarang untuk memulai!",
            "msg_feature_header": "Fitur sederhana membuat hidup lebih mudah",
            "msg_feature_description": "Lihat apa yang dapat Anda lakukan dengan aplikasi ini!",
            "msg_feature_item1": "Waktu sebenarnya",
            "msg_feature_item1_content": "TRA Schedule & Bus Real Time Arrivals di banyak kota",
            "msg_feature_item2": "Pembantu",
            "msg_feature_item2_content": "Fitur yang mudah digunakan, membantu Anda menanyakan arah",
            "msg_feature_item3": "Kota",
            "msg_feature_item3_content": "Info bus waktu-nyata Taiwan",
            "msg_feature_item4": "Desain",
            "msg_feature_item4_content": "Desain pertama yang elegan dan user",
            "msg_cta_header1": "Semua orang menggunakan",
            "msg_cta_header2": "Mulai Unduh"
        },
        "kr": {
            "msg_download": "다운로드 ",
            "msg_features": "기능 ",
            "msg_contact": "연락처 ",
            "msg_header_content": "언제 어디서든 원하는 대만 정보를 제공합니다!",
            "msg_download_header": "함께 대만을 탐색하세요!",
            "msg_download_description": "저희 앱은 모든 모바일 기기에서 이용 가능합니다! 지금 다운로드하여 시작하세요!",
            "msg_feature_header": "간편한 기능으로 삶을 더욱 편리하게",
            "msg_feature_description": "이 앱으로 무엇을 할 수 있는지 확인해보세요!",
            "msg_feature_item1": "실시간",
            "msg_feature_item1_content": "다양한 도시에서 대만 철도 일정 및 버스 실시간 도착 정보",
            "msg_feature_item2": "도우미",
            "msg_feature_item2_content": "사용하기 쉬운 기능으로, 방향 문의를 도와줍니다.",
            "msg_feature_item3": "도시",
            "msg_feature_item3_content": "대만의 버스 실시간 정보",
            "msg_feature_item4": "디자인",
            "msg_feature_item4_content": "우아하고 사용자 중심의 디자인",
            "msg_cta_header1": "누구나 사용 중입니다",
            "msg_cta_header2": "지금 다운로드 시작"
        }
    };

    /**
     * Detect browser language with fallback logic
     * @returns {string} Language code (en, zh-TW, vn, id, kr)
     */
    function detectLanguage() {
        // Get browser language
        var userLang = navigator.language || navigator.userLanguage || 'en';

        // Normalize language code
        // Convert zh_TW, zh-tw, zh_CN, zh to zh-TW
        if (userLang.toLowerCase().indexOf('zh') === 0) {
            userLang = 'zh-TW';
        }
        // Convert vi, vi-VN to vn
        else if (userLang.toLowerCase().indexOf('vi') === 0) {
            userLang = 'vn';
        }
        // Convert id-ID to id
        else if (userLang.toLowerCase().indexOf('id') === 0) {
            userLang = 'id';
        }
        // Convert ko, ko-KR to kr
        else if (userLang.toLowerCase().indexOf('ko') === 0) {
            userLang = 'kr';
        }

        // Return detected language if available, otherwise default to English
        return translations[userLang] ? userLang : 'en';
    }

    /**
     * Update all elements with data-msg attributes
     * @param {string} lang - Language code
     */
    function updateMessages(lang) {
        var t = translations[lang] || translations['en'];
        var elements = document.querySelectorAll('[data-msg]');

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var key = el.getAttribute('data-msg');
            if (t[key]) {
                el.innerHTML = t[key];
            }
        }

        // Update lang attribute on all [lang] elements
        var langElements = document.querySelectorAll('#mainDiv [lang]');
        for (var j = 0; j < langElements.length; j++) {
            langElements[j].setAttribute('lang', lang);
        }
    }

    /**
     * Initialize i18n on DOM ready
     */
    function init() {
        // Detect language
        var detectedLang = detectLanguage();

        // Apply translations
        updateMessages(detectedLang);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded
        init();
    }

})();
