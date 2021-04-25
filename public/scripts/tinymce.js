// tinymce.init({
//     selector: '#tiny-mce-post-body',
//     plugins: ['allychecker advcode advlist lists link checklist autolink autosave code', 'preview', 'searchreplace', 'wordcount', 'media table emoticons image imagetools'],
//     toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview',
//     height: 300,
//     automatic_uploads: true
// });

tinymce.init({
    selector: '#tiny-mce-post-body',
    plugins: ['a11ychecker advcode advlist link autosave casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker', 'preview', 'searchreplace', 'wordcount', 'media table emoticons image imagetools'],
    toolbar: 'bold italic underline |  bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview |alignleft aligncenter alignright alignjustify | a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table',
    toolbar_mode: 'floating',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    height: 300,
    automatic_uploads: true,
    images_upload_url: 'postAcceptor.php',
    images_upload_handler: function (blobInfo, success, failure) {
        console.log('handler in')
        let headers = new Headers();
        headers.append('Accept', 'Application/JSON');

        let formData = new FormData();
        formData.append('post-image', blobInfo.blob(), blobInfo.filename());

        let req = new Request('/upload/post-image', {
            method: "POST",
            headers,
            mode: "cors",
            body: formData
        });
        fetch(req)
            .then(res => res.json())
            .then(data => success(data.imgUrl))
            .catch(err => failure("Post image failure"))
    }

});