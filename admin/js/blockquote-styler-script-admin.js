const blockquote_styler_style = document.getElementById('blockquote-styler-style');


blockquote_styler_style.addEventListener('change', function () {
    const blockquote_styler_style_value = blockquote_styler_style.value;

    // save the value to the database
    wp.ajax.post('blockquote_styler_style', {
        blockquote_styler_style_value: blockquote_styler_style_value
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
});
