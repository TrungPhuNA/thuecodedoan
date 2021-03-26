CKEDITOR.plugins.add( 'articles', {
    icons: 'articles',
    init: function( editor ) {
        editor.addCommand( 'insertArticle', {
            exec: function( editor ) {
                var now = new Date();
                var popup = document.getElementById("article_content_md");
                popup.classList.toggle("show");
                editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
            }
        });
        editor.ui.addButton( 'Articles', {
            label: 'Articles',
            command: 'insertArticle',
            toolbar: 'insert'
        });

    }
});