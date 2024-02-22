var noi = $(".sub-menu").length;
var index = 0;

function removeAllEventListeners(element) {
    var newElement = element.cloneNode(true);
    element.outerHTML = newElement.outerHTML;
    return newElement;
}

const addEventForItem = async () => {
    $("#leftside-navigation .sub-menu > a").off("click");
    $("#leftside-navigation .sub-menu > a").on("click", function (e) {
        index = $("#leftside-navigation .sub-menu").index($(this).parent());
        $("#leftside-navigation ul ul").slideUp(),
            $(this).next().is(":visible") || $(this).next().slideDown();
        e.stopPropagation();
        // console.log(index);
    });
    addEventForItem2();

    for (let i = 0; i < noi; i++) {
        var imageUploadInput = document.querySelectorAll(".image")[i];
        console.log(imageUploadInput);
        // await removeAllEventListeners(imageUploadInput);
        imageUploadInput.addEventListener("change", function (event) {
            var selectedFile = event.target.files[0];
            if (selectedFile) {
                var formData = new FormData();
                formData.append("imageFile", selectedFile);
                index = i;
                console.log("index: " + index);
                // Perform AJAX request to upload file
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "saveIcon.php", true);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        // console.log(xhr.responseText);
                        $(".iconTitle")
                            .eq(index)
                            .attr("src", `./img/${selectedFile.name}`);
                    } else {
                        console.log("Error uploading image!");
                    }
                };
                xhr.onerror = function () {
                    console.log("Error uploading image!");
                };
                xhr.send(formData);
            } else {
                console.log("No file selected");
            }
        });
    }
};
function addEventForItem2() {
    $("#leftside-navigation .sub-menu ul li .up2").on("click", function (e) {
        console.log(this);
        e.preventDefault();
        var listItem = $(this).parent().parent();
        var prevListItem = listItem.prev();

        if (prevListItem.length) {
            listItem.insertBefore(prevListItem);
        }
    });
    $("#leftside-navigation .sub-menu ul li .down2").on("click", function (e) {
        console.log(this);
        e.preventDefault();
        var listItem = $(this).parent().parent();
        var nextListItem = listItem.next();

        if (nextListItem.length) {
            nextListItem.insertBefore(listItem);
        }
    });

    $("#leftside-navigation .sub-menu ul li .delete2").on(
        "click",
        function (e) {
            var result = confirm("Chắc chắn xóa?");
            if (result) {
                $(this).closest("li").remove();
            }
        }
    );
}

// Add an event listener for when a file is selected

const testLog = (i) => {
    console.log(i);
};

function handleContextMenu(event) {
    event.preventDefault();
    var contextMenu = $("#contextMenu");
    index = $(".sub-menu").index($(this));
    contextMenu.css({
        display: "block",
        left: event.pageX,
        top: event.pageY,
    });
}

$(document).ready(() => {
    $(document).on("contextmenu", ".sub-menu", handleContextMenu);
    addEventForItem();
    $(document).on("click", function (event) {
        var contextMenu = $("#contextMenu");
        if (!$(event.target).closest("#contextMenu").length) {
            contextMenu.hide();
        }
    });

    $("#up").click(async () => {
        if (index > 0) {
            var html1 = $(".sub-menu").eq(index).html();
            var html2 = $(".sub-menu")
                .eq(index - 1)
                .html();
            var result = window.confirm(
                `Chắc chắn đổi chỗ tiêu đề ${index - 1} và ${index}`
            );
            if (result) {
                await $(".sub-menu")
                    .eq(index - 1)
                    .html(html1);
                await $(".sub-menu").eq(index).html(html2);
                addEventForItem();
            }
        }
    });
    $("#down").click(async () => {
        if (index < noi - 1) {
            var html1 = $(".sub-menu").eq(index).html();
            var html2 = $(".sub-menu")
                .eq(index + 1)
                .html();
            var result = window.confirm(
                `Chắc chắn đổi chỗ tiêu đề ${index} và ${index + 1}`
            );
            if (result) {
                await $(".sub-menu").eq(index).html(html2);
                await $(".sub-menu")
                    .eq(index + 1)
                    .html(html1);
                addEventForItem();
            }
        }
    });
    $("#delete").click(() => {
        var result = window.confirm(`Chắc chắn xóa tiêu đề ${index}`);
        if (result) {
            $(".sub-menu").eq(index).remove();
        }
    });
    $("#add").click(() => {
        var itemName = prompt(`Tên tiêu đề thêm mới:`);
        if (itemName) {
            $(".sub-menu").eq(index).children("ul").append(`
            <li>
                <a>${itemName}</a>
                <span style="margin-top: 10px">
                    <img class="titleIcon up2" src="./img/up.png" />
                    <img
                        class="titleIcon down2"
                        src="./img/down.png"
                    />
                    <img
                        class="titleIcon delete2"
                        src="./img/delete.png"
                    />
                </span>
            </li>`);
            addEventForItem();
        }
    });
    $("#rename").click(() => {
        var userInput = prompt(
            `Tên tiêu đề ${index} mới:`,
            $(".title").eq(index).html()
        );

        if (userInput !== null) {
            $(".title").eq(index).html(userInput);
        }
    });
    $("#addItem").click(() => {
        var userInput = prompt(`Tên tiêu đề thêm mới:`);
        noi++;
        if (userInput !== null) {
            $(".nano-content").append(`
            <li class="sub-menu">
                <a>
                    <label for="image${noi}">
                        <img
                            class="titleIcon iconTitle"
                            src="./img/list.png"
                        />
                        <input
                            type="file"
                            id="image${noi}"
                            accept="image/*"
                        />
                    </label>
                    <span class="title">${userInput}</span>
                    <i class="arrow fa fa-angle-right pull-right"></i>
                </a>
                <ul></ul>
            </li>
            `);
            addEventForItem();
        }
    });
});
