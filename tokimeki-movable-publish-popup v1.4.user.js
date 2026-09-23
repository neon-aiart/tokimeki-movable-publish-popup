// ==UserScript==
// @name           TOKIMEKI Movable Publish Popup
// @name:en        TOKIMEKI Movable Publish Popup
// @name:ja        TOKIMEKI Movable Publish Popup
// @description    Makes the TOKIMEKI post popup draggable.
// @description:en Makes the TOKIMEKI post popup draggable.
// @description:ja TOKIMEKIの投稿ポップアップをドラッグで移動可能にします
// @version        1.4
// @icon           data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚓</text></svg>
// @author         ねおん
// @namespace      https://bsky.app/profile/neon-ai.art
// @homepage       https://github.com/neon-aiart
// @match          https://tokimeki.blue/*
// @match          https://tokimekibluesky.vercel.app/*
// @match          http://localhost:5173/*
// @grant          GM_addStyle
// @run-at         document-idle
// @license        PolyForm Noncommercial 1.0.0; https://polyformproject.org/licenses/noncommercial/1.0.0/
// ==/UserScript==

/* ==============================================================================
 * IMPORTANT NOTICE / 重要事項
 * ==============================================================================
 * ⛄ Copyright (c) 2026 ねおん (Neon)
 * Licensed under the PolyForm Noncommercial License 1.0.0.
 * * [JP] 本スクリプトは個人利用・非営利目的でのみ使用・改変が許可されます。
 * 無断転載、作者名の書き換え、およびクレジットの削除は固く禁じます。
 * 本スクリプトを改変・配布（フォーク）する場合は、必ず元の作者名（ねおん）
 * およびこのクレジット表記を維持してください。
 * * [EN] This script is licensed for personal and non-commercial use only.
 * Unauthorized re-uploading, modification of authorship, or removal of
 * author credits is strictly prohibited. If you fork this project, you MUST
 * retain the original credits and authorship.
============================================================================== */

(function () {
    'use strict';

    const SCRIPT_VERSION = '1.4';
    const DEBUG = false;
    if (DEBUG) console.log(`[${getDateTimeFormats().display}] ⚓ TOKIMEKI Movable Publish Popup v${SCRIPT_VERSION}: デバッグモード`);

    const STORAGE_KEY = 'tokimeki_movable_publish_popup';
    const SAVED_HEIGHT = false; // 高さも保存

    let cachedPos = null; // メモリ上にデータを保持するキャッシュ変数

    // スタイルの注入
    GM_addStyle(`
        /* 1. 親枠を強制的 Flexbox 化 & リサイズハンドルを許可 */
        .publish-group--popup .publish-wrap {
            position: relative;
            display: flex;
            flex-direction: column;
        }
        .publish-group--popup .publish-wrap.publish-wrap {
            overflow: visible;
        }

        /* 2. 内部ボディとフォームを高さ追従させる */
        .publish-group--popup .publish-wrap .publish-body,
        .publish-group--popup .publish-wrap form {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            min-height: 0;
        }

        /* 3. エディタ本体の高さ制限と内部スクロールを解除 */
        .publish-group--popup .editor,
        .publish-group--popup .tiptap {
            max-height: none;
            overflow-y: visible;
            flex: 1 1 auto;
        }

        .publish-group--popup .editor {
            height: auto;
        }

        .publish-group--popup .publish-wrap textarea {
            flex: 1 1 auto;
            resize: none;
        }

        /* 4. 位置固定モード */
        .publish-group--popup .publish-wrap[data-custom-pos="true"] {
            position: fixed;
            transform: none;
        }

        /* ヘッダー領域をドラッグハンドル化 */
        .publish-group--popup .publish-header {
            cursor: move;
            user-select: none; /* テキスト選択防止 */
            -webkit-user-select: none;
        }

        /* 底辺のリサイズハンドル */
        .publish-resize-handle-bottom {
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 10px;
            cursor: ns-resize;
            background: transparent;
        }

        /* ドラッグ移動中の誤作動防止 */
        body.is-popup-dragging {
            user-select: none;
            -webkit-user-select: none;
        }
    `);

    /**
     * Dateオブジェクトから用途別のフォーマット済み文字列を生成するユーティリティ
     * @param {Date} dateObj - 対象のDateオブジェクト（指定がない場合は現在時刻）
     */
    function getDateTimeFormats(dateObj = new Date()) {
        const pad = (num) => num.toString().padStart(2, '0');
        const y = dateObj.getFullYear();
        const m = pad(dateObj.getMonth() + 1);
        const d = pad(dateObj.getDate());
        const h = pad(dateObj.getHours());
        const min = pad(dateObj.getMinutes());
        const s = pad(dateObj.getSeconds());

        return {
            // 1. コンソール出力や画面表示用 (2026/09/04 22:50:39)
            display: `${y}/${m}/${d} ${h}:${min}:${s}`,

            // 2. ファイル名用：OS禁止文字を除外 (20260904_225039)
            name: `${y}${m}${d}_${h}${min}${s}`,

            // 3. メタデータ/外部互換用 (ISO 8601 UTC)
            iso: dateObj.toISOString(),
        };
    }

    // 位置の読み込み（初回のみ localStorage を見に行く）
    function loadPosition() {
        if (cachedPos !== null) return cachedPos; // 読み込み済みならキャッシュを返す

        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            cachedPos = saved ? JSON.parse(saved) : {};
            if (DEBUG) console.log('[DEBUG] ⚓ データ読み込み(Storage):', cachedPos);
        } catch (e) {
            if (DEBUG) console.error('[DEBUG] ⚓ データ読み込みエラー:', e);
            cachedPos = {};
        }
        return cachedPos;
    }
    // 位置の保存（値に変更があった場合のみ書き込み）
    function savePosition(left, top, height) {
        try {
            const current = { ...loadPosition(), }; // キャッシュを取得して浅いコピー

            // 変更があるかチェック
            const isLeftChanged = left !== undefined && current.left !== left;
            const isTopChanged = top !== undefined && current.top !== top;
            const isHeightChanged = SAVED_HEIGHT && height !== undefined && current.height !== height;

            if (!isLeftChanged && !isTopChanged && !isHeightChanged) return;

            // プロパティ更新
            if (left !== undefined) current.left = left;
            if (top !== undefined) current.top = top;
            if (SAVED_HEIGHT && height !== undefined) current.height = height;

            // キャッシュとストレージの両方を確実に更新
            cachedPos = current;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
            if (DEBUG) console.log('[DEBUG] ⚓ データ保存:', current);
        } catch (e) {
            if (DEBUG) console.error('[DEBUG] ⚓ データ保存エラー:', e);
        }
    }

    // 設定の消去
    function clearPosition() {
        try {
            const saved = { ...loadPosition(), };

            // 位置・サイズに関する設定プロパティのみをピンポイントで削除
            delete saved.left;
            delete saved.top;
            delete saved.height;

            // 残りのプロパティ数をチェック
            if (Object.keys(saved).length === 0) {
                // 他に設定が何も残っていなければキー自体を完全に削除
                cachedPos = {};
                localStorage.removeItem(STORAGE_KEY);
                if (DEBUG) console.log('[DEBUG] ⚓ 位置情報および設定データを完全削除');
            } else {
                // 他の設定が残っていれば更新して保存
                cachedPos = saved;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
                if (DEBUG) console.log('[DEBUG] ⚓ 位置情報を削除（他の設定は維持）:', saved);
            }
        } catch (e) {
            if (DEBUG) console.error('[DEBUG] ⚓ データ削除エラー:', e);
        }
    }

    // ポップアップ位置・サイズを初期状態にリセットする関数
    function resetPosition(wrap) {
        clearPosition();
        wrap.removeAttribute('data-custom-pos');
        wrap.style.left = '';
        wrap.style.top = '';

        // エディタの高さ指定を解除
        const editorEl = wrap.querySelector('.tiptap') || wrap.querySelector('.editor');
        if (editorEl) {
            editorEl.style.height = '';
        }
    }

    // ポップアップが開いたときに記憶した位置へ復元する監視処理
    const observer = new MutationObserver(() => {
        const group = document.querySelector('.publish-group--popup');
        const wrap = group?.querySelector('.publish-wrap');

        if (!group || !wrap) return;

        const isExpanded = group.classList.contains('publish-group--expanded');

        if (isExpanded) {
            // リサイズハンドルがなければ追加
            if (!wrap.querySelector('.publish-resize-handle-bottom')) {
                const handle = document.createElement('div');
                handle.className = 'publish-resize-handle-bottom';
                wrap.appendChild(handle);
            }

            // 保存された位置・高さの復元
            if (!wrap.dataset.posApplied) {
                const pos = loadPosition();

                // データが存在する場合のみ復元処理を実行
                if (pos && (pos.left !== undefined || pos.height !== undefined)) {
                    if (typeof pos.left === 'number' && typeof pos.top === 'number') {
                        wrap.style.left = `${pos.left}px`;
                        wrap.style.top = `${pos.top}px`;
                        wrap.setAttribute('data-custom-pos', 'true');
                    }

                    if (SAVED_HEIGHT && typeof pos.height === 'number') {
                        const editorEl = wrap.querySelector('.tiptap') || wrap.querySelector('.editor');
                        if (editorEl) {
                            editorEl.style.height = `${pos.height}px`;
                        }
                    }
                }

                // 復元フラグを立てる（空データの場合でも何度も読みに行かないようここでセット）
                wrap.dataset.posApplied = 'true';
                if (DEBUG) console.log('[DEBUG] ⚓ 保存された位置と高さを復元:', pos);
            }
        } else {
            delete wrap.dataset.posApplied;
        }
    });

    observer.observe(document.body, { childList: true, subtree: true, });

    // ダブルクリックによるリセット処理
    document.addEventListener('dblclick', (e) => {
        const header = e.target.closest('.publish-header');
        if (!header) return;

        const group = header.closest('.publish-group--popup');
        if (!group) return;

        // ボタンや入力欄のダブルクリック時はリセットしない
        if (e.target.closest('button, input, a, textarea')) return;

        const wrap = header.closest('.publish-wrap');
        if (!wrap) return;

        resetPosition(wrap);
    });

    // イベントリスナー（ヘッダー移動 ＆ 底辺リサイズ）
    document.addEventListener('mousedown', (e) => {
        // --- 1. 底辺リサイズ処理 ---
        const resizeHandle = e.target.closest('.publish-resize-handle-bottom');
        if (resizeHandle) {
            const wrap = resizeHandle.closest('.publish-wrap');
            if (!wrap) return;

            // テキスト入力エリア要素（.tiptap または .editor）を取得
            const editorEl = wrap.querySelector('.tiptap') || wrap.querySelector('.editor');
            if (!editorEl) return;

            e.preventDefault();
            e.stopPropagation();

            // ドラッグ開始時点の「画面上の表示位置 (Top/Left)」を固定する
            const currentRect = wrap.getBoundingClientRect();
            wrap.style.top = `${currentRect.top}px`;
            wrap.style.left = `${currentRect.left}px`;
            wrap.setAttribute('data-custom-pos', 'true'); // 中央寄せを解除して固定位置モードにする

            document.body.classList.add('is-popup-dragging');

            const startY = e.clientY;
            // 現在の表示上の高さを取得（未設定時は180pxを基準）
            const initialHeight = editorEl.getBoundingClientRect().height || 180;

            const minHeight = 180;
            const maxHeight = 450; // 180px の 2.5 倍

            const onMouseMove = (moveEvent) => {
                const dy = moveEvent.clientY - startY;
                let newHeight = initialHeight + dy;
                newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

                // エディタ本体の要素の高さを直接変更
                editorEl.style.height = `${newHeight}px`;
            };

            const onMouseUp = () => {
                document.body.classList.remove('is-popup-dragging');
                const currentHeight = parseFloat(editorEl.style.height);
                if (currentHeight) {
                    // 上位置が変わった可能性に備えて現在位置と高さを同時に保存
                    const finalRect = wrap.getBoundingClientRect();
                    savePosition(finalRect.left, finalRect.top, currentHeight);
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            return;
        }

        // --- 2. ヘッダー移動（ドラッグ）処理 ---
        const header = e.target.closest('.publish-header');
        if (!header) return;

        // ポップアップ内ヘッダーのみ対象
        const group = header.closest('.publish-group--popup');
        if (!group) return;

        // ボタンや入力要素のクリック時はドラッグしない
        if (e.target.closest('button, input, a, textarea, [role="button"]')) return;

        const wrap = header.closest('.publish-wrap');
        if (!wrap) return;

        document.body.classList.add('is-popup-dragging');

        const rect = wrap.getBoundingClientRect();
        const startX = e.clientX;
        const startY = e.clientY;
        const initialLeft = rect.left;
        const initialTop = rect.top;

        // 手動で位置指定モードに変更
        wrap.setAttribute('data-custom-pos', 'true');
        wrap.style.left = `${initialLeft}px`;
        wrap.style.top = `${initialTop}px`;

        const onMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;

            let newLeft = initialLeft + dx;
            let newTop = initialTop + dy;

            // 移動範囲の基準（.deck があればその表示領域、無ければ画面全体）
            const boundsEl = document.querySelector('.deck') || document.body;
            const bounds = boundsEl.getBoundingClientRect();

            // publish-wrap 全体が bounds（.deck）内に収まる限界値を計算
            const minLeft = bounds.left;
            const maxLeft = bounds.right - rect.width;
            const minTop = bounds.top;
            const maxTop = bounds.bottom - rect.height;

            // boundsよりポップアップの方が大きい場合の画面外ハミ出し考慮
            const safeMaxLeft = Math.max(minLeft, maxLeft);
            const safeMaxTop = Math.max(minTop, maxTop);

            newLeft = Math.max(minLeft, Math.min(newLeft, safeMaxLeft));
            newTop = Math.max(minTop, Math.min(newTop, safeMaxTop));

            wrap.style.left = `${newLeft}px`;
            wrap.style.top = `${newTop}px`;
        };

        const onMouseUp = () => {
            document.body.classList.remove('is-popup-dragging');
            // 終了時の位置を保存
            const currentRect = wrap.getBoundingClientRect();
            savePosition(currentRect.left, currentRect.top);

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
})();
