/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
// document.domain = '192.168.50.10';
CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config
    config.enterMode = CKEDITOR.ENTER_BR;
    config.shiftEnterMode = CKEDITOR.ENTER_BR;
    // The toolbar groups arrangement, optimized for two toolbar rows.
    config.font_names = '宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;' + config.font_names;
    config.toolbar = 'MyToolbar';
    config.allowedContent = true;

    config.toolbar_MyToolbar = [
        ['Source', 'Undo', 'Redo', '-', 'SelectAll', 'RemoveFormat'],
        ['Format', 'Font', 'FontSize'],
        ['Table', 'Image'],
        ['Cut', 'Copy', 'Paste'],
        ['TextColor', 'BGColor'],
        ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
        ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Maximize', 'Link', 'Iframe'],
    ];

    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    config.removeButtons = 'Underline,Subscript,Superscript';

    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced';

    // 图片上传配置
    config.filebrowserUploadUrl = api_host + '/notice/upload_file';
    config.image_previewText = ' ';
};