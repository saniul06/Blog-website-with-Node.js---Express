widow.onload = function(){
    var baseCropping = $('#crop-image').croppie({
        viewport: {
            width: 300,
            height: 300
        },
        boundary: {
            width: 400,
            height: 400
        }
    })
}