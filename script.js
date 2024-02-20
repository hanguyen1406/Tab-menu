var noi = $(".sub-menu").length;
var index = 0;

const addEventForItem = () => {
    $("#leftside-navigation .sub-menu > a").on("click", function (e) {
        index = $("#leftside-navigation .sub-menu").index($(this).parent());
        $("#leftside-navigation ul ul").slideUp(),
            $(this).next().is(":visible") || $(this).next().slideDown();
        e.stopPropagation();
        // console.log(index);
    });
};
$("#leftside-navigation .sub-menu ul li .up2").on("click", function(e) {
    console.log(this);
    e.preventDefault(); // Prevent the default behavior of the anchor element
    var listItem = $(this).parent().parent(); // Get the parent <li> element
    var prevListItem = listItem.prev(); // Get the previous <li> element

    // Check if there's a previous <li> element
    if (prevListItem.length) {
        // Swap the <li> elements
        listItem.insertBefore(prevListItem);
    }
});
$("#addItem").click(() => {
    var userInput = window.prompt("Điền tên tiêu đề:");
    // Check if the user entered something
    if (userInput !== null) {
        console.log(userInput);
    }
});

for (let i = 0; i < noi; i++) {
    var imageUploadInput = document.getElementById("image" + (i + 1));
    imageUploadInput.addEventListener("change", function (event) {
        var selectedFile = event.target.files[0];
        if (selectedFile) {
            var formData = new FormData();
            formData.append("imageFile", selectedFile);

            // Perform AJAX request to upload file
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "saveIcon.php", true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
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
// Add an event listener for when a file is selected

const upItem = (i) => {
    console.log("up:", i);
    if (i > 0) {
        var a = $(".sub-menu").eq(index).children("ul");
        console.log(a.html());
    }
};

const downItem = (i) => {
    console.log("down:", i);
};
const deleteItem = (i) => {
    console.log("delete:", i);
};

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

    $("#up").click(() => {
        if (index > 0) {
            var html1 = $(".sub-menu").eq(index).html();
            var html2 = $(".sub-menu")
                .eq(index - 1)
                .html();
            var result = window.confirm(
                `Chắc chắn đổi chỗ tiêu đề ${index - 1} và ${index}`
            );
            if (result) {
                $(".sub-menu")
                    .eq(index - 1)
                    .html(html1);
                $(".sub-menu").eq(index).html(html2);
                $("#leftside-navigation .sub-menu > a").off("click");
                addEventForItem();
            }
        }
    });
    $("#down").click(() => {
        if (index < noi - 1) {
            var html1 = $(".sub-menu").eq(index).html();
            var html2 = $(".sub-menu")
                .eq(index + 1)
                .html();
            var result = window.confirm(
                `Chắc chắn đổi chỗ tiêu đề ${index} và ${index + 1}`
            );
            if (result) {
                $(".sub-menu").eq(index).html(html2);
                $(".sub-menu")
                    .eq(index + 1)
                    .html(html1);
                $("#leftside-navigation .sub-menu > a").off("click");
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
        // var currentItem = $(".sub-menu").eq(index);
        // var clonedItem = currentItem.clone();
        // clonedItem
        //     .children("a")
        //     .children("label")
        //     .attr("for", "image" + ++noi);
        // console.log(clonedItem.html());
        // currentItem.after(clonedItem);
        // $("#leftside-navigation .sub-menu > a").off("click");
        // addEventForItem();
        var itemName = prompt(`Tên tiêu đề thêm mới:`);
        if (itemName) {
            $(".sub-menu").eq(index).children("ul").append(`
            <li>
                <a>${itemName}</a>
                <span style="margin-top: 10px">
                    <img class="titleIcon" src="./img/up.png" />
                    <img
                        class="titleIcon"
                        src="./img/down.png"
                    />
                    <img
                        class="titleIcon"
                        src="./img/delete.png"
                    />
                </span>
            </li>`);
        }
    });
    $("#rename").click(() => {
        var userInput = prompt(`Tên tiêu đề ${index} mới:`);

        if (userInput !== null) {
            $(".title").eq(index).html(userInput);
        }
    });
});
