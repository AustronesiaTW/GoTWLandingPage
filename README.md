# GoTW 台灣通

GoTW（Guide of Taiwan）行動應用程式的官方網站。提供台灣鐵路時刻表查詢、即時公車到站資訊、路線規劃等功能。

網站連結：[https://www.austronesia.tw](https://www.austronesia.tw)

## 專案簡介

本專案是 GoTW 行動應用程式的推廣頁面，用於展示應用程式的功能特色、提供下載連結，以及相關的法律文件。GoTW 是一款專為台灣設計的大眾運輸資訊應用程式，支援 iOS 和 Android 平台。

### 應用程式功能

- 台灣鐵路管理局（TRA）列車時刻表查詢
- 全台多個城市的即時公車到站資訊
- 路線規劃與導航協助
- 多語言介面支援

## 主要特色

- **多語言支援**：英文、繁體中文、越南文、印尼文、韓文
- **響應式設計**：完美適配各種裝置螢幕
- **現代化介面**：基於 Bootstrap 4 框架打造
- **完整的法律文件**：隱私權政策、服務條款、資料刪除說明

## 技術架構

- **前端框架**：Bootstrap 4.1.2
- **JavaScript 函式庫**：jQuery 3.0.0
- **CSS**：純 CSS（不使用預處理器）
- **國際化**：jquery.i18n.properties
- **圖示庫**：Font Awesome、Simple Line Icons
- **部署**：GitHub Pages（純靜態網站，無需建置）

## 本地開發

本專案是純靜態網站，無需建置系統。

### 啟動本地伺服器

可使用任何靜態伺服器，例如：

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (如已安裝 http-server)
npx http-server -p 8000
```

然後在瀏覽器開啟 `http://localhost:8000`

### 樣式修改

- **主題樣式**: 直接編輯 `css/new-age.css`，然後手動壓縮為 `css/new-age.min.css`
- **自訂樣式**: 編輯 `css/gotw.css`
- **手動壓縮工具**: https://www.toptal.com/developers/cssminifier

### JavaScript 修改

- **主題腳本**: 編輯 `js/new-age.js`，然後手動壓縮為 `js/new-age.min.js`
- **自訂腳本**: 編輯 `js/index.js`、`js/i18nHelper.js` 等檔案
- **手動壓縮工具**: https://www.toptal.com/developers/javascript-minifier

## 專案結構

```
├── index.html                      # 主要推廣頁面
├── privacy.html                    # 隱私權政策
├── tos.html                        # 服務條款
├── facebook-data-deletion.html     # Facebook 資料刪除說明
├── gulpfile.js                     # Gulp 建置設定
├── package.json                    # NPM 相依套件
├── less/                           # LESS 原始檔案
├── css/                            # 編譯後的 CSS 檔案
├── js/                             # JavaScript 檔案
├── lib/                            # 第三方函式庫
│   └── jquery-i18n/                # 多語言支援
│       └── bundle/index/           # 語言檔案 (.properties)
└── img/                            # 圖片資源
```

## 頁面說明

- **首頁** (`index.html`)：應用程式介紹、功能展示、下載連結
- **隱私權政策** (`privacy.html`)：個人資料收集與使用說明
- **服務條款** (`tos.html`)：使用條款、責任限制、法律聲明
- **資料刪除** (`facebook-data-deletion.html`)：Facebook 平台資料刪除指示

## 開發注意事項

- 樣式修改請直接編輯 `css/` 目錄下的 CSS 檔案（本專案不再使用 LESS 預處理器）
- 修改後記得手動壓縮 CSS/JS 檔案以保持 .min 版本同步
- 多語言文字使用 `data-msg` 屬性配合語言檔案
- 語言檔案位於 `lib/jquery-i18n/bundle/index/Messages_*.properties`

## 多語言支援

本網站支援以下語言：

- 英文 (en)
- 繁體中文 (zh-TW)
- 越南文 (vn)
- 印尼文 (id)
- 韓文 (kr)

語言切換器位於導覽列右上角，會自動偵測瀏覽器語言設定。

## 應用程式下載

- **iOS**：[App Store](https://itunes.apple.com/us/app/gotw-taiwan-railway-train-bus/id1197499231)
- **Android**：[Google Play](https://play.google.com/store/apps/details?id=com.ionicframework.austronesiatwrail742342)

## 授權資訊

本專案採用 MIT 授權條款。

Copyright 2016-2025 Austronesiatw

本網站基於 [Start Bootstrap - New Age](http://startbootstrap.com/template-overviews/new-age/) 模板開發。
