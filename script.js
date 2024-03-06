var noi = $(".sub-menu").length;
var index = 0;
var changed = true,
    changedEbook = false;

var noli;

//declare for vanilla tab
const $$ = document.querySelectorAll.bind(document);
let advancedOptionButton = null;
let alignButtons = null;
let spacingButtons = null;
let formatButtons = null;
let scriptButtons = null;

let fontName = null;
let fontSizeRef = null;
let writingArea = null;
let linkButton = null;
let current_active_tab = 0;
let currentTab = 0;
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];
const intializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    fontSizeRef.value = 3;
};
const targetNode = document.querySelector(".nano-content");
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        $("#save").addClass("changed");
        changed = false;
    });
});
const observer1 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        console.log("changed");
        $("#save").addClass("changed");
        changed = false;
    });
});
const config = { childList: true, subtree: true };
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
        // console.log(this);
        e.stopPropagation();
        e.preventDefault();
        var listItem = $(this).parent().parent();
        var prevListItem = listItem.prev();

        if (prevListItem.length) {
            listItem.insertBefore(prevListItem);
        }
    });

    $("#leftside-navigation .sub-menu ul li .down2").on("click", function (e) {
        // console.log(this);
        e.stopPropagation();
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
            e.stopPropagation();
            var result = confirm("Chắc chắn xóa?");
            if (result) {
                $(this).closest("li").remove();
            }
        }
    );

    $("#leftside-navigation .sub-menu ul li .rename2").on(
        "click",
        function (e) {
            e.stopPropagation();
            const text = $(this).closest("li").find("a");
            var itemName = prompt(`Tên tiêu đề mới:`, text.text());
            if (itemName) {
                text.html(itemName);
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
    var contextMenu = $("#contextMenu1");
    index = $(".sub-menu").index($(this));
    contextMenu.css({
        display: "block",
        left: event.pageX,
        top: event.pageY,
    });
}

function addEventOpenBook() {
    $(".sub-menu ul li").each((i, e) => {
        $(e).on("click", async function (e) {
            try {
                var id = $(this).attr("id").slice(1);
                await fetch(`./htmlcode/${id}.json`)
                    .then((response) => response.json())
                    .then((json) => {
                        // console.log(json['index'])
                        $("#book-body").html(
                            `<a>${i + 1}. ${$(this).children("a").html()}</a>${
                                json["index"]
                            }`
                        );
                    });
            } catch (error) {
                console.log("Khong co ebook nay");
            }
            var tabct = document.querySelector(".tab-content");
            observer1.observe(tabct, config);
        });
    });
}

(async () => {
    try {
        const response = await fetch("./htmlcode/config.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const json = await response.json();
        window.noli = json["noli"]; // Assign noli variable to global scope
        console.log(noli); // Log the fetched data
        addEventOpenBook();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();

function saveBody() {
    changed = true;
    var htmlContent = $("html").html();
    $("#save").removeClass("changed");
    $("style").remove();
    $("head").append(
        `<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css"/><link rel="stylesheet" href="./style.css" />`
    );
    var htmlContent = document.documentElement.outerHTML;
    fetch("saveBody.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "htmlContent=" + encodeURIComponent(htmlContent),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then((data) => {
            console.log(data); // Log the response from PHP script
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

$(document).ready(() => {
    $(document).on("contextmenu", ".sub-menu", handleContextMenu);
    addEventForItem();
    $(document).on("click", function (event) {
        event.stopPropagation();
        var contextMenu = $("#contextMenu1");
        if (!$(event.target).closest("#contextMenu").length) {
            contextMenu.hide();
        }
        $("#contextMenu").hide();
    });
    window.addEventListener("beforeunload", function (event) {
        if (!changed) {
            // console.log('changed');
            event.returnValue =
                "Data have been changed. Are you sure to reload?";
        }
    });
    // console.log(noli);

    observer.observe(targetNode, config);

    $("#up").click(function (e) {
        e.preventDefault();
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
                addEventForItem();
            }
        }
    });
    $("#down").click(function (e) {
        e.preventDefault();
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
                addEventForItem();
            }
        }
    });
    $("#delete").click(function (e) {
        e.preventDefault();
        var result = window.confirm(`Chắc chắn xóa tiêu đề ${index}`);
        if (result) {
            $(".sub-menu").eq(index).remove();
        }
    });
    $("#add").click(function (e) {
        e.preventDefault();
        var itemName = prompt(`Tên tiêu đề thêm mới:`);
        if (itemName) {
            noli++;
            var conf = {
                noli: { noli: noli },
                tabCt: {
                    index: '<html lang="en"><head>\n        <meta charset="UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <title>T\u1ef1 H\u1ecdc Guitar - Ebook</title>\n        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/3209/3209985.png" type="image/png">\n\n        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">\n        <!-- import style for vanilla tab -->\n        <link href="./vanilla-tab/style.css" rel="stylesheet">\n        <link href="./text-editor/style.css" rel="stylesheet">\n    </head>\n    <body data-new-gr-c-s-check-loaded="14.1156.0" data-gr-ext-installed="" data-new-gr-c-s-loaded="14.1156.0">\n        <div class="container">\n            <div class="options">\n                <button id="bold" class="option-button format">\n                    <i class="fa-solid fa-bold"></i>\n                </button>\n                <button id="italic" class="option-button format active">\n                    <i class="fas fa-italic"></i>\n                </button>\n                <button id="underline" class="option-button format">\n                    <i class="fas fa-underline"></i>\n                </button>\n\n                <button id="superscript" class="option-button script">\n                    <i class="fa-solid fa-superscript"></i>\n                </button>\n                <button id="subscript" class="option-button script">\n                    <i class="fa-solid fa-subscript"></i>\n                </button>\n\n                <button id="insertOrderedList" class="option-button">\n                    <div class="fa-solid fa-list-ol"></div>\n                </button>\n                <button id="insertUnorderedList" class="option-button">\n                    <i class="fa-solid fa-list"></i>\n                </button>\n\n                <button id="undo" class="option-button">\n                    <i class="fa-solid fa-rotate-left"></i>\n                </button>\n                <button id="redo" class="option-button">\n                    <i class="fa-solid fa-rotate-right"></i>\n                </button>\n\n                <button id="createLink" class="adv-option-button">\n                    <i class="fa fa-link"></i>\n                </button>\n\n                <button id="unlink" class="option-button">\n                    <i class="fa fa-unlink"></i>\n                </button>\n\n                <button id="justifyLeft" class="option-button align active">\n                    <i class="fa-solid fa-align-left"></i>\n                </button>\n                <button id="justifyCenter" class="option-button align">\n                    <i class="fa-solid fa-align-center"></i>\n                </button>\n                <button id="justifyRight" class="option-button align">\n                    <i class="fa-solid fa-align-right"></i>\n                </button>\n                <button id="justifyFull" class="option-button align">\n                    <i class="fa-solid fa-align-justify"></i>\n                </button>\n                <button id="indent" class="option-button spacing">\n                    <i class="fa-solid fa-indent"></i>\n                </button>\n                <button id="outdent" class="option-button spacing">\n                    <i class="fa-solid fa-outdent"></i>\n                </button>\n                <select id="formatBlock" class="adv-option-button">\n                    <option value="H1">H1</option>\n                    <option value="H2">H2</option>\n                    <option value="H3">H3</option>\n                    <option value="H4">H4</option>\n                    <option value="H5">H5</option>\n                    <option value="H6">H6</option>\n                </select>\n                <select id="fontName" class="adv-option-button">\n                    <option value="Arial">Arial</option>\n                    <option value="Verdana">Verdana</option>\n                    <option value="Times New Roman">Times New Roman</option>\n                    <option value="Garamond">Garamond</option>\n                    <option value="Georgia">Georgia</option>\n                    <option value="Courier New">Courier New</option>\n                    <option value="Cursive">Cursive</option>\n                </select>\n                <select id="fontSize" class="adv-option-button">\n                    <option value="1">1</option>\n                    <option value="2">2</option>\n                    <option value="3">3</option>\n                    <option value="4">4</option>\n                    <option value="5">5</option>\n                    <option value="6">6</option>\n                    <option value="7">7</option>\n                </select>\n\n                <div class="input-wrapper">\n                    <input type="color" id="foreColor" class="adv-option-button">\n                    <label for="foreColor">Font Color</label>\n                </div>\n                <div class="input-wrapper">\n                    <input type="color" id="backColor" class="adv-option-button">\n                    <label for="backColor">Highlight Color</label>\n                </div>\n            </div>\n        </div>\n        <div class="tab"><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension>\n            <nav class="tab-stripe">\n                <a class="active" href="#Tab1-Q1">1</a>\n                <!-- <a style="font-weight: bold" href="#addTabBtn">+</a> -->\n                \n            </nav>\n            <button class="tab-scroll-button left hidden"></button>\n            <button class="tab-scroll-button right"></button>\n            <button class="tab-full-screen-button"></button>\n            <div class="tab-content">\n                <div class="active" id="#Tab1-Q1">\n                    <div id="text-input" contenteditable="true" spellcheck="false"><br><br></div>\n                </div>\n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n                \n            </div>\n        </div>\n        <div id="excute" style="text-align: center">\n            <button style="\n                    width: fit-content;\n                    display: inline;\n                    font-size: large;\n                    height: fit-content;\n                " onclick="saveVanillaTab()" id="saveEbook">\n                Save\n            </button>\n\n            <button style="\n                    width: fit-content;\n                    display: inline;\n                    font-size: large;\n                    height: fit-content;\n                " onclick="publishForUser()" id="publish">\n                Publish\n            </button>\n            <button style="\n                    width: fit-content;\n                    display: inline;\n                    font-size: large;\n                    height: fit-content;\n                " onclick="exportTab()" id="export">\n                Export\n            </button>\n            <button style="\n                    width: fit-content;\n                    display: inline;\n                    font-size: large;\n                    height: fit-content;\n                " id="import" onclick="importTab()">\n                Import\n            </button>\n        </div>\n\n        <div class="context-menu" id="contextMenu" style="font-weight: bold; display: none; left: 331px; top: 141px;">\n            <div class="context-menu-item" id="deleteItem">\n                Delete <i class="fas fa-trash-alt"></i>\n            </div>\n            <div class="context-menu-item" id="insertItem">\n                Insert <i class="fas fa-sign-in-alt"></i>\n            </div>\n            <div class="context-menu-item" id="moveRightItem">\n                Move right <i class="fas fa-long-arrow-alt-right"></i>\n            </div>\n            <div class="context-menu-item" id="moveLeftItem">\n                Move left <i class="fas fa-long-arrow-alt-left"></i>\n            </div>\n        </div>\n\n        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\n        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>\n        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>\n\n        <!-- script for text editor -->\n        <script src="./text-editor/script.js"></script>\n        <!-- script for vanilla tab -->\n        <script src="./vanilla-tab/script.js"></script>\n\n        <div id="5386CA82-7210-0F03-F0B8-355E1D75DEB4"></div>\n\n        <div id="7AED1372-33EB-4BE0-41A5-C4BAC04DA6C6"></div>\n\n        <div id="B474ABDC-1C4A-A599-A5FA-416E31C6C6EB"></div>\n\n        <div id="39A9C575-D3CD-015B-5FBF-EA06C0341D48"></div>\n    \n    \n\n<div id="3F33D0BE-7BC7-8C36-64E2-CE811CDD5C33"></div>\n<div id="DE4C0925-BF73-BE95-B09F-587F844B389D"></div>\n<div id="EB29B2C5-B3A6-BEAF-6993-462EFC18DFF9"></div>\n<div id="C8C16FE7-771B-E6E5-CF14-E402AE1EF923"></div>\n<div id="09518C6E-4B7F-091A-4DF3-00F694F5F8FC"></div>\n<div id="571ED2CE-1C9A-80B5-84E2-CAB3F898ED9A"></div>\n<div id="D701A9B4-141E-CF69-9335-D7420796F0AD"></div>\n<div id="B8B8ADA9-AFF0-63C2-E8DD-DF94C44A2551"></div>\n<div id="E27153D5-DB6A-597C-9520-8735ED949455"></div>\n<div></div>\n<div></div>\n<grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration><grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>\n<grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>\n<grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>\n<div></div>\n<grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>\n<div></div>\n\n<div></div>\n<div></div>\n\n\n\n\n</body><!-- script for rich text edior --><grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups></html>\n',
                },
            };
            fetch("saveConf.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(conf),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then((data) => {
                    console.log(data); // Log the response from PHP script
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            //save current noli to sever
            $(".sub-menu").eq(index).children("ul").append(`
            <li id="l${noli}">
                <a title="${itemName}">${itemName}</a>
                <span style="margin-top: 10px">
                    <img class="titleIcon up2" src="./img/up.png" />
                    <img
                        class="titleIcon down2"
                        src="./img/down.png"
                    />
                    <img
                        class="titleIcon rename2"
                        src="./img/edit.png"
                    />
                    <img
                        class="titleIcon delete2"
                        src="./img/delete.png"
                    />
                </span>
            </li>`);
            addEventForItem();
            addEventOpenBook();
        }
    });
    $("#rename").click(function (e) {
        e.preventDefault();
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
        if (userInput !== null) {
            noi++;
            $(".nano-content").append(`
            <li class="sub-menu">
                <a>
                    <label for="image${noi}">
                        <img
                            class="titleIcon iconTitle"
                            src="./img/list.png"
                        />
                        <input
                            class="image"
                            type="file"
                            id="image${noi}"
                            accept="image/*"
                        />
                    </label>
                    <span title="${userInput}" class="title">${userInput}</span>
                    <i class="arrow fa fa-angle-right pull-right"></i>
                </a>
                <ul></ul>
            </li>
            `);
            addEventForItem();
        }
    });
    $("#save").click(() => {
        if ($("#save").hasClass("changed")) {
            saveBody();
            alert("Lưu data mới thành công!");
        } else {
            alert("Chưa chỉnh sửa data!");
        }
    });
});
