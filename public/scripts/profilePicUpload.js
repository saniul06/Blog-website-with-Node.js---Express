window.onload = function () {
    var baseCropping = $("#cropped-iamge").croppie({
        viewport: {
            width: 200,
            height: 200,
        },
        boundary: {
            width: 300,
            height: 300,
        },
    });

    function readableFile(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            baseCropping
                .croppie("bind", {
                    url: event.target.result,
                })
                .then(
                    $(".cr-slider").attr({
                        min: 0.5,
                        max: 1.5,
                    })
                );
        };
        reader.readAsDataURL(file);
    }

    $("#profilePicsFile").on("change", function (e) {
        if (this.files[0]) {
            readableFile(this.files[0]);
            $("#crop-modal").modal("show");
        }
    });

    $("#cancel-cropping").on("click", function (e) {
        $("crop-modal").modal("hide");
    });

    $("#upload-image").on("click", function () {
        baseCropping
            .croppie("result", "blob")
            .then((blob) => {
                let formData = new FormData();
                let file = document.getElementById("profilePicsFile").files[0];
                let name = generateFileName(file.name);
                formData.append("profilePics", blob, name);
                let headers = new Headers();
                headers.append("Accept", "Appilcaion/JSON");
                let req = new Request("/upload/profile-pics", {
                    method: "POST",
                    headers,
                    mode: "cors",
                    body: formData,
                });
                return fetch(req);
            })
            .then((res) => res.json())
            .then((data) => {
                document.getElementById("removeProfilePics").style.display =
                    "block";
                    console.log(data.profilePics)
                    console.log(data)
                document.getElementById("profilePics").src = data.profilePics;
                $("#crop-modal").modal("hide");
            });

        function generateFileName(name) {
            const type = /jpg|jpeg|gif/;
            return name.replace(type, "png");
        }
    });
};
