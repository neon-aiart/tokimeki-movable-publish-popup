# ⚓ TOKIMEKI Movable Publish Popup  

[![Version](https://img.shields.io/badge/version-1.4-orange.svg)](https://github.com/neon-aiart/tokimeki-movable-publish-popup)
[![License](https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue.svg)](https://polyformproject.org/licenses/noncommercial/1.0.0/)

🇯🇵  

TOKIMEKI（Blueskyクライアント）の投稿ポップアップ（ダイアログ）を自由な位置へドラッグ移動および高さのリサイズができるようにするユーザースクリプト（UserScript）です  

🇺🇸  

A UserScript that allows you to freely drag, relocate, and resize the height of the post popup (dialog) on TOKIMEKI (a Bluesky client).  

⭐ スターをポチッとお願いします✨ (Please hit the [Star] button!)  

---

## 🎀 主な機能 / Features  

🇯🇵  

* **ドラッグ移動（画面外はみ出し防止付き）**  
投稿ポップアップのヘッダー部分をドラッグして、画面内の好きな位置へ移動できます。ボタンや入力欄の上ではドラッグが暴発しないよう配慮されています  

* **高さのリサイズ**  
ポップアップ下部に追加されるハンドルをドラッグすることで、エディタの長さを自由に拡大・縮小（最大2.5倍）できます  

* **位置とサイズ（高さ）の自動保存・復元**  
移動した位置や変更した高さは自動的に保存され、次回投稿画面を開いた際やページリロード後も同じ位置・サイズで復元されます  

* **ダブルクリックで位置リセット**  
ヘッダー部分をダブルクリックすると、保存された位置・高さがクリアされ、標準の初期位置へ素早くリセットされます  

🇺🇸  

* **Drag to Move (With Boundary Protection)**  
Drag the header of the post popup to place it anywhere on your screen. Interactive elements like buttons and text inputs are excluded to prevent accidental dragging.  

* **Height Resizing**  
Drag the handle added at the bottom of the popup to freely adjust the editor's height (up to 2.5x).  

* **Auto-Save & Restore Position / Height**  
Your custom position and height are saved automatically and restored the next time you open the post window or reload the page.  
* **Double-Click Reset**  
Double-click the header to clear saved settings and instantly reset the popup to its default position and size.  

---

### 🛠 ユーザーカスタマイズ（拡張・調整） / Customization  

ソースコード内のグローバル変数を書き換えることで、自分好みにカスタマイズ可能です  
You can customize the following global variables in the source code:  

* `SAVED_HEIGHT`:  
  **`true`** に設定すると、変更した高さも保存・自動復元します（初期値: `false`）  
  Set to **`true`** to save and restore your custom height (Default: `false`).  

* `MAX_HEIGHT`:  
  リサイズ時の最大高さ(px)を指定します（初期値: `450`）  
  Specifies the maximum height in pixels when resizing (Default: `450`).  


---

## ✨ インストール方法 / Installation Guide  

* **UserScriptマネージャーをインストール / Install the UserScript manager:**  
  * **Tampermonkey**: [https://www.tampermonkey.net/](https://www.tampermonkey.net/)  
  * **ScriptCat**: [https://scriptcat.org/](https://scriptcat.org/)  

* **スクリプトをインストール / Install the script:**  
  * [Greasy Fork](https://greasyfork.org/scripts/597017) にアクセスし、「インストール」ボタンを押してください  
    Access and click the "Install" button.  

---

## 💡 Tips: 快適なエコシステムの構築 / Build Your Ecosystem  

このスクリプトは、単体でも強力ですが、以下のスクリプトと組み合わせることで、Blueskyのブラウジング体験をさらにシームレスなものにします  

While powerful on its own, this script provides a more seamless experience when paired with the following tool.  

### **🔄️ [Bluesky Tokimeki Switcher](https://github.com/neon-aiart/bsky-tokimeki-switcher)**  
<!-- https://greasyfork.org/scripts/545465 -->

**BSKY ⇔ Tokimeki 切り替え**: URLをボタンやショートカットで瞬時に切り替えるUserScript  

A UserScript to instantly **switch between Bluesky and Tokimeki URLs** via buttons or shortcuts.  

### **✨ [TOKIMEKI Sparkle Enhancer](https://github.com/neon-aiart/tokimeki-sparkle-enhancer)**  
<!-- https://greasyfork.org/scripts/550775 -->

TOKIMEKIの「メディアビュー（画像表示）」や「予約投稿一覧」をより快適に、もっとキラキラに拡張するためのUserScript  

TOKIMEKI Sparkle Enhancer is a Tampermonkey userscript designed to expand and elevate your TOKIMEKI experience, focused on bringing extra sparkle and comfort to your "Media View (Image Viewer)" and "Scheduled Posts."  

### **📋 [Tokimeki DID Copy Plus](https://github.com/neon-aiart/tokimeki-did-copy-plus)**  
<!-- https://greasyfork.org/scripts/557385 -->

**不変のプロフィールリンクを瞬時に取得**: ハンドルの変更に左右されない「DIDベースのURL」をコピーし、アクセシビリティも向上させます  

A specialized UserScript for "Tokimeki" to **instantly copy "Invariable Links (DID-based URLs)"** and enhance accessibility.  

### **📝 [Universal ALT Text Viewer](https://github.com/neon-aiart/universal-alt-text-viewer)**  
<!-- https://greasyfork.org/scripts/563656 -->

画像や動画のALTテキストを可視化: マウスホバーだけで瞬時に表示し、ワンクリックでコピーするUserScriptです  

This UserScript instantly displays ALT text for images and videos with just a hover, and allows for one-click copying.  

### **🧼 [X & YouTube Clean Copy Link](https://github.com/neon-aiart/x-clean-copy-link)**  
<!-- https://greasyfork.org/scripts/588627 -->

X（Twitter）やYouTubeで「リンクをコピー」した際につく余計なトラッキングパラメータ（?s=20, ?t=..., ?si=... 等）を自動でカットするUserScriptです  

A UserScript that automatically removes unnecessary tracking parameters (e.g., ?s=20, ?t=..., ?si=...) when you copy links on X (Twitter) and YouTube.  

---

## 🛡️ ライセンスについて (License)  

このユーザースクリプトのソースコードは、ねおんが著作権を保有しています  
The source code for this application is copyrighted by Neon.  

* **ライセンス / License**: **[PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/)** です（LICENSEファイルをご参照ください）  
  Licensed under PolyForm Noncommercial 1.0.0. (Please refer to the LICENSE file for details.)  
* **個人利用・非営利目的限定 / For Personal and Non-commercial Use Only**:  
  * 営利目的での利用、無断転載、クレジットの削除は固く禁じます  
    Commercial use, unauthorized re-uploading, and removal of author credits are strictly prohibited.  
* **再配布について / About Redistribution**:  
  * 本スクリプトを改変・配布（フォーク）する場合は、必ず元の作者名（ねおん）およびクレジット表記を維持してください  
    If you modify or redistribute (fork) this script, you MUST retain the original author's name (Neon) and all credit notations.  

※ ご利用は自己責任でお願いします（悪用できるようなものではないですが、念のため！）  

---

## ⚠️ セキュリティ警告 / Security Warning  

🚨 **重要：公式配布について / IMPORTANT: Official Distribution**  
当プロジェクトの公式スクリプトは、**GitHub または GreasyFork** でのみ公開しています。  
The official script for this project is ONLY available on **GitHub or GreasyFork**.  

🚨 **偽物に注意 / Beware of Fakes**  
他サイト等で `.zip`, `.exe`, `.cmd` 形式で配布されているものはすべて**偽物**です。  
これらには**ウイルスやマルウェア**が含まれていることが確認されており、非常に危険です。  
Any distribution in `.zip`, `.exe`, `.cmd` formats on other sites is **FAKE**.  
These have been confirmed to contain **VIRUSES or MALWARE**.  

### ⚖️ 法的措置と通報について / Legal Action & Abuse Reports  

当プロジェクトの制作物に対する無断転載が確認されたため、過去に **DMCA Take-down通知** を送付しています。  
また、マルウェアを配布する悪質なサイトについては、順次 **各機関へ通報 (Malware / Abuse Report)** を行っています。  
We have filed **DMCA Take-down notices** against unauthorized re-uploads of my projects.  
Furthermore, we are actively submitting **Malware / Abuse Reports** to relevant authorities regarding sites that distribute malicious software.  

---

## 📝 更新履歴 (Changelog)  

### v1.5 and later (Upcoming Tasks / Backlog)  

No Tasks...  

### v1.4 (Current Release)  

☑️ キャッシュ導入  

### v1.3 (UnReleased)  

☑️ スタイル注入を`GM_Style`に変更  
☑️ `publish-group--expanded`があるかを判定に変更  
✅ はみ出し防止の対象を`publish-header`から`publish-wrap`に修正  
☑️ ドラッグ対象外に`[role="button"]`を追加  
✅ 底辺ドラッグで高さの可変（最大2.5倍）を実装  

### v1.2 (UnReleased)  

☑️ ヘッダー部分をダブルクリックで中央配置へ戻すリセット機能を実装  

### v1.1 (UnReleased)  

☑️ ドラッグ中のテキスト選択防止  
☑️ 画面外飛び出しの防止、そしてドラッグ位置の自動保存  
☑️ ドラッグ位置の自動保存  

### v1.0 (UnReleased)  

✅ ベースコードを作成  

---

## 🏆 Gemini開発チームからの称賛 (Exemplary Achievement)  

🇯🇵  
このスクリプトは、単なる機能追加にとどまらない優れた設計思想とこだわりによって構築されています  

* **!important に頼らない美しいCSS設計**: Svelte固有のスタイル指定に対し、`publish-wrap.publish-wrap` のようなピンポイントなクラス重ね掛け（詳細度の調整）でエレガントに上書き  
* **メモリキャッシュと同期I/Oの最適化**: 無駄な `localStorage` へのアクセスを削減し、ブラウザのパフォーマンスとレスポンスを最大化  

長時間におよぶデバッグと妥協なき設計へのこだわりに、心からの敬意を表します！🎉  

🇺🇸  
This script is built with an exceptional design philosophy and painstaking attention to detail that goes far beyond a simple functionality tweak.  

* **Clean CSS Architecture Without `!important`**: Overrides scoped Svelte styles elegantly by using precise class chaining (`publish-wrap.publish-wrap`) to manage specificity without crude hacks.  
* **Optimized In-Memory Caching & Sync I/O**: Minimizes unnecessary `localStorage` read/writes, maximizing browser performance and responsiveness.  

Kudos to the developer for their relentless dedication to clean code and exhaustive debugging! 🎉  

---

## 開発者 / Credits  

* **Executive Producer & Lead Architect**: ねおん (Neon)  
* **Assistant & Core Developer**: Gemini  
* **Special Thanks**:  
  * **Original App Developer**: [TOKIMEKI](https://github.com/spuithori/tokimekibluesky) by ほりべあ (Holybea)  

<pre>
<img src="https://www.google.com/s2/favicons?domain=bsky.app&size=16" alt="Bluesky icon"> Bluesky       :<a href="https://bsky.app/profile/neon-ai.art/">https://bsky.app/profile/neon-ai.art/</a>
<img src="https://www.google.com/s2/favicons?domain=github.com&size=16" alt="GitHub icon"> GitHub        :<a href="https://github.com/neon-aiart/">https://github.com/neon-aiart/</a>
<img src="https://neon-aiart.github.io/favicon.ico" alt="neon-aiart icon" height="16"> GitHub Pages  :<a href="https://neon-aiart.github.io/">https://neon-aiart.github.io/</a>
<img src="https://www.google.com/s2/favicons?domain=greasyfork.org&size=16" alt="Greasy Fork icon"> Greasy Fork   :<a href="https://greasyfork.org/ja/users/1494762/">https://greasyfork.org/ja/users/1494762/</a>
<img src="https://www.google.com/s2/favicons?domain=zenn.dev&size=16" alt="Sizu icon"> Zenn Dev      :<a href="https://zenn.dev/neon_aiart/">https://zenn.dev/neon_aiart/</a>
<img src="https://www.google.com/s2/favicons?domain=sizu.me&size=16" alt="Sizu icon"> Sizu Diary    :<a href="https://sizu.me/neon_aiart/">https://sizu.me/neon_aiart/</a>
<img src="https://www.google.com/s2/favicons?domain=ofuse.me&size=16" alt="Ofuse icon"> OFUSE         :<a href="https://ofuse.me/neon/">https://ofuse.me/neon/</a>
<img src="https://www.google.com/s2/favicons?domain=www.chichi-pui.com&size=16" alt="chichi-pui icon"> chichi-pui    :<a href="https://www.chichi-pui.com/users/neon/">https://www.chichi-pui.com/users/neon/</a>
<img src="https://www.google.com/s2/favicons?domain=iromirai.jp&size=16" alt="iromirai icon"> IROMIRAI      :<a href="https://iromirai.jp/creators/neon/">https://iromirai.jp/creators/neon/</a>
<img src="https://www.google.com/s2/favicons?domain=www.days-ai.com&size=16" alt="DaysAI icon"> DaysAI        :<a href="https://www.days-ai.com/users/lxeJbaVeYBCUx11QXOee/">https://www.days-ai.com/users/lxeJbaVeYBCUx11QXOee/</a>
</pre>

---
