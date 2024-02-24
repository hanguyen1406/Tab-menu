var noi = $(".sub-menu").length;
var index = 0;
var changed = true;
var noli = $(".sub-menu ul li").length;
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

function addEventOpenBook() {
    for (let i = 1; i <= noli; i++) {
        $(`#l${i}`).on("click", function (e) {
            // console.log($(this).children("a").html());
            if (i == 1) {
                $("#book-body").html(`<html lang="en"><head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tự Học Guitar - Ebook</title>
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/3209/3209985.png" type="image/png">
        
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
                <!-- import style for vanilla tab -->
                <link href="./vanilla-tab/style.css" rel="stylesheet">
                <link href="./text-editor/style.css" rel="stylesheet">
            </head>
            <body data-new-gr-c-s-check-loaded="14.1156.0" data-gr-ext-installed="" data-new-gr-c-s-loaded="14.1131.0">
                <div class="container">
                    <div class="options">
                        <button id="bold" class="option-button format">
                            <i class="fa-solid fa-bold"></i>
                        </button>
                        <button id="italic" class="option-button format active">
                            <i class="fas fa-italic"></i>
                        </button>
                        <button id="underline" class="option-button format">
                            <i class="fas fa-underline"></i>
                        </button>
        
                        <button id="superscript" class="option-button script">
                            <i class="fa-solid fa-superscript"></i>
                        </button>
                        <button id="subscript" class="option-button script">
                            <i class="fa-solid fa-subscript"></i>
                        </button>
        
                        <button id="insertOrderedList" class="option-button">
                            <div class="fa-solid fa-list-ol"></div>
                        </button>
                        <button id="insertUnorderedList" class="option-button">
                            <i class="fa-solid fa-list"></i>
                        </button>
        
                        <button id="undo" class="option-button">
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                        <button id="redo" class="option-button">
                            <i class="fa-solid fa-rotate-right"></i>
                        </button>
        
                        <button id="createLink" class="adv-option-button">
                            <i class="fa fa-link"></i>
                        </button>
        
                        <button id="unlink" class="option-button">
                            <i class="fa fa-unlink"></i>
                        </button>
        
                        <button id="justifyLeft" class="option-button align active">
                            <i class="fa-solid fa-align-left"></i>
                        </button>
                        <button id="justifyCenter" class="option-button align">
                            <i class="fa-solid fa-align-center"></i>
                        </button>
                        <button id="justifyRight" class="option-button align">
                            <i class="fa-solid fa-align-right"></i>
                        </button>
                        <button id="justifyFull" class="option-button align">
                            <i class="fa-solid fa-align-justify"></i>
                        </button>
                        <button id="indent" class="option-button spacing">
                            <i class="fa-solid fa-indent"></i>
                        </button>
                        <button id="outdent" class="option-button spacing">
                            <i class="fa-solid fa-outdent"></i>
                        </button>
                        <select id="formatBlock" class="adv-option-button">
                            <option value="H1">H1</option>
                            <option value="H2">H2</option>
                            <option value="H3">H3</option>
                            <option value="H4">H4</option>
                            <option value="H5">H5</option>
                            <option value="H6">H6</option>
                        </select>
                        <select id="fontName" class="adv-option-button">
                            <option value="Arial">Arial</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Garamond">Garamond</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Cursive">Cursive</option>
                        </select>
                        <select id="fontSize" class="adv-option-button">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
        
                        <div class="input-wrapper">
                            <input type="color" id="foreColor" class="adv-option-button">
                            <label for="foreColor">Font Color</label>
                        </div>
                        <div class="input-wrapper">
                            <input type="color" id="backColor" class="adv-option-button">
                            <label for="backColor">Highlight Color</label>
                        </div>
                    </div>
                </div>
                <div class="tab"><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" class="dnXmp" style="position: absolute; top: -2px; left: -2px; pointer-events: none;"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: -2px; left: -2px; pointer-events: none;" class="dnXmp"></grammarly-extension>
                    <nav class="tab-stripe">
                        <a class="" href="#Tab1-Q1">1</a>
                        <!-- <a style="font-weight: bold" href="#addTabBtn">+</a> -->
                        <a href="#Tab1-Q2" class="">2</a><a href="#Tab1-Q3" class="">3</a><a href="#Tab1-Q4" class="">4</a><a href="#Tab1-Q5" class="">5</a><a href="#Tab1-Q6" class="">6</a><a href="#Tab1-Q7" class="">7</a><a href="#Tab1-Q8" class="">8</a><a href="#Tab1-Q9" class="active">9</a><a href="#Tab1-Q10" class="">10</a>
                    <a href="#Tab1-Q11" class="">11</a><a href="#Tab1-Q12" class="">12</a><a href="#Tab1-Q13" class="">13</a><a href="#Tab1-Q14" class="">14</a><a href="#Tab1-Q15" class="">15</a><a href="#Tab1-Q16" class="">16</a><a href="#Tab1-Q17" class="">17</a><a href="#Tab1-Q18" class="">18</a><a href="#Tab1-Q19" class="">19</a><a href="#Tab1-Q20" class="">20</a><a href="#Tab1-Q21" class="">21</a><a href="#Tab1-Q22" class="">22</a><a href="#Tab1-Q23" class="active">23</a></nav>
                    <button class="tab-scroll-button left hidden"></button>
                    <button class="tab-scroll-button right"></button>
                    <button class="tab-full-screen-button"></button>
                    <div class="tab-content">
                        <div class="" id="#Tab1-Q1">
                            <div id="text-input" contenteditable="true"><img src="https://i.imgur.com/IexL3fZ.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/iMh64Rg.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/YD8zwbH.jpeg" style="width: 100%;"><br><br></div>
                        </div>
                        <div class="" id="#Tab1-Q2">
                            <div id="text-input" contenteditable="true" spellcheck="false"><img src="https://i.imgur.com/8rL2N0k.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/2zUYHva.jpeg" style="width: 100%;"><br></div>
                        </div><div class="" id="#Tab1-Q3">
                            <div id="text-input" contenteditable="true" spellcheck="false"><img src="https://i.imgur.com/MaO2Yjn.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/J18e2dQ.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/nq4k5q4.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/hTgT1JA.jpeg" style="width: 100%;"><br><div><br><br></div></div>
                        </div><div class="" id="#Tab1-Q4">
                            <div id="text-input" contenteditable="true"><b><font size="5">CHƯƠNG I: GIẢI ĐÁP THẮC MẮC</font></b><br><img src="https://i.imgur.com/j2PurC7.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/usnANaR.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/JfY6ZMi.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/WSnHamV.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/KIVsOYo.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/RRo80IQ.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/4LKfnDa.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/B4SIyKi.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/auxWNEY.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/UHcKbxF.jpeg" style="width: 100%;"><br></div>
                        </div><div class="" id="#Tab1-Q5">
                            <div id="text-input" contenteditable="true"><b><font size="5">CHƯƠNG II: KIẾN THỨC CƠ BẢN</font></b><br><img src="https://i.imgur.com/HNpGdbh.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/DQF85bX.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/hbzJqdV.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/6dm1Ciw.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/G50ZXjJ.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/iwNiqGj.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/KkSbhco.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/LOeG9PU.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/mIYby1o.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/0cKB6fQ.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/WYb3iw7.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/mh7xUKW.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/F9Pw59m.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/rvB5VBI.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/qDFfJH9.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/xxwwEfD.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/yruJyzs.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/6gr8A0V.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/4Ldo5wM.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/EVVrDu1.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/9E7u0sS.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/p6a2Nxx.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/fAcH3BF.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/kWGsr0i.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/XcelI5o.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/mAuA1ak.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/ydkwZyf.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/4tC49mT.jpeg" style="width: 100%;"><br><br></div>
                        </div><div class="" id="#Tab1-Q6">
                            <div id="text-input" contenteditable="true"><b><font size="5">CHƯƠNG IV: THỰC HÀNH - TƯ THẾ ÔM ĐÀN</font></b><br><img src="https://i.imgur.com/S2SLNHq.jpg" style="width: 100%;"><br><img src="https://i.imgur.com/2JtpHT8.jpg" style="width: 100%;"><br><img src="https://i.imgur.com/DYEkGgu.jpg" style="width: 100%;"><br><img src="https://i.imgur.com/2bm258d.jpg" style="width: 100%;"><br><img src="https://i.imgur.com/gIEvx0M.jpg" style="width: 100%;"><br><img src="https://i.imgur.com/QPEeAsd.jpg" style="width: 100%;"><br><img src="https://i.imgur.com/g8WLzlj.jpg" style="width: 100%;"><br><img src="https://i.imgur.com/LaLbg8o.jpg" style="width: 100%;"><br><img src="https://i.imgur.com/7PMk7O9.jpg" style="width: 100%;"><br><b>Xem thêm VIDEO:&nbsp; LƯU Ý VỀ TAY PHẢI &amp; TAY TRÁI</b><br><p><iframe class="youtube-video" src="https://www.youtube.com/embed/bob97M8VR8w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></div>
                        </div><div class="" id="#Tab1-Q7">
                            <div id="text-input" contenteditable="true"><b><font size="5">CHƯƠNG IV: THỰC HÀNH - CHỈNH DÂY ĐÀN</font></b><br><img src="https://i.imgur.com/6saMM0X.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/aFlzSlb.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/E7GbBvb.jpeg" style="width: 100%;"><br><div><img src="https://i.imgur.com/U0QyJ1C.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/jRMkIOn.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/qpYiANx.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/a5nBosH.jpeg" style="width: 100%;"><img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/383172655_222398250824523_3818029473499542189_n.jpg?_nc_cat=103&amp;ccb=1-7&amp;_nc_sid=49d041&amp;_nc_ohc=VekpihosY2AAX9gDgu5&amp;_nc_ht=scontent.fhan20-1.fna&amp;_nc_e2o=s&amp;oh=00_AfAAFZZ0SjF_0qUZ6Rqk_RKCuckCrdO4-XJSCgyrxl36Dw&amp;oe=65187C16" style="font-size: var(--tab-content-font-size); width: 100%;"><br><img src="https://i.imgur.com/t8ciqkg.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/cHb7eKW.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/y4sbsHO.jpeg" style="width: 100%;"><br><br></div></div>
                        </div><div class="" id="#Tab1-Q8">
                            <div id="text-input" contenteditable="true"><b><font size="5">THỰC HÀNH - ĐỌC NOTE/TAB &amp; BẤM GẢY</font></b><br><img src="https://i.imgur.com/53sOM8w.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/cQGG976.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/w4lzuXh.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/LwrAI2B.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/DXmNzcv.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/WGzP72m.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/oK5PhVR.jpeg" style="width: 100%;"><br><h4 style="line-height: 1.3; margin-top: 1em; margin-bottom: 16px; font-weight: bold; font-size: 17.5px; color: rgb(17, 17, 17); font-family: system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Ubuntu, Cantarell, Oxygen, Roboto, Helvetica, Arial, sans-serif;">VIDEO: CÁC LƯU Ý ĐẦU TIÊN VỀ TAY PHẢI &amp; TAY TRÁI<br><p><iframe class="youtube-video" src="https://www.youtube.com/embed/bob97M8VR8w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></h4><h4 style="line-height: 1.3; margin-top: 1em; margin-bottom: 16px; font-weight: bold; font-size: 17.5px; color: rgb(17, 17, 17); font-family: system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Ubuntu, Cantarell, Oxygen, Roboto, Helvetica, Arial, sans-serif;">VIDEO: THÊM LƯU Ý VỀ TAY PHẢI<br><p><iframe class="youtube-video" src="https://www.youtube.com/embed/Pcki3cXKc-Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></h4></div>
                        </div>
                        <div class="active" id="#Tab1-Q9">
                            <div id="text-input" contenteditable="true"><font size="5"><b style="">HƯỚNG DẪN ĐỌC&nbsp;</b><b style="">NOTE VÀ TAB 3 NGĂN ĐẦU</b></font><div><b><br></b></div><div><b><img src="https://i.imgur.com/fBKktEP.jpeg" style="width: 100%;"></b><b style="font-size: var(--tab-content-font-size);"><img src="https://i.imgur.com/jRSSYIB.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/9CxfzDn.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/qetYlJa.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/IuG7o6h.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/8iDxjdY.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/msUXYjY.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/E78hGi7.jpeg" style="width: 100%;"><br><br></b></div></div>
                        </div><div class="" id="#Tab1-Q10">
                            <div id="text-input" contenteditable="true"><b><font size="5">24 BÀI TẬP GIÚP NHỚ NOTE NHẠC VÀ TAB 3 NGĂN ĐẦU</font><br><img src="https://i.imgur.com/PBCzjgY.jpeg" style="width: 100%;"><br><br></b><span style="font-weight: bolder; color: rgb(17, 17, 17); font-family: system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Ubuntu, Cantarell, Oxygen, Roboto, Helvetica, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);">PHẦN BÀI TẬP THỰC HÀNH DƯỚI ĐÂY CÁC BẠN CẦN IN RA, SAU ĐÓ ĐIỀN SỐ TRÊN TAB TƯƠNG ỨNG VỚI NOTE NHẠC, VD NOTE MI (E) SẼ LÀ SỐ 0 Ở DÒNG KẺ TAB ĐẦU TIÊN (TƯƠNG ỨNG DÂY 6, DÂY TO NHẤT, TRÊN ĐÀN)<br></span><b><br><img src="https://i.imgur.com/ITcG66e.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/lnwYnfx.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/oDt9Z5X.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/yle82R7.jpeg" style="width: 100%;"><br><br></b><div><div><br><div><div><b><br></b></div><div><b><br></b></div></div></div></div></div>
                        </div>
                        <div class="" id="#Tab1-Q11">
                            <div id="text-input" contenteditable="true"><b><font size="5">VIDEO THỰC HÀNH ĐỌC TAB 3 NGĂN ĐẦU</font></b><br><b><div style="">Video thực hành #1</div><div style=""><br></div><div style=""><p><iframe class="youtube-video" src="https://www.youtube.com/embed/A49xvaRsLmI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></div></b><div style="font-weight: bold;">Video thực hành #2</div><div><div style="font-weight: bold;"><p><iframe class="youtube-video" src="https://www.youtube.com/embed/WwHN77K8tas" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></div></div><div style="font-weight: bold;">Video thực hành #3</div><div><div style="font-weight: bold;"><p><iframe class="youtube-video" src="https://www.youtube.com/embed/gOYG6cDKycQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></div></div><div style="font-weight: bold;">Video thực hành #4</div><div><div style="font-weight: bold;"><p><iframe class="youtube-video" src="https://www.youtube.com/embed/1DQ83yEKVUc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></div></div><div style="font-weight: bold;">Video thực hành #5</div><div><div style="font-weight: bold;"><p><iframe class="youtube-video" src="https://www.youtube.com/embed/jfV9xOgc4vg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></div></div></div>
                        </div>
                        <div class="" id="#Tab1-Q12">
                            <div id="text-input" contenteditable="true"><b><font size="5">THỰC HÀNH LUYỆN SOLO NOTE ĐƠN 3 NGĂN ĐẦU</font><br></b><div><b><img src="https://i.imgur.com/ugvxTVF.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/ui5Ss4m.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/Qlu08dH.jpeg" style="width: 100%;"><br><br>VIDEO TAB: ĐỘ TA KHÔNG ĐỘ NÀNG<br><p><iframe class="youtube-video" src="https://www.youtube.com/embed/r11APlvpbO4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br><img src="https://i.imgur.com/nrNZY5L.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/SV5hS0v.jpeg" style="width: 100%;"><br></b></div><div></div></div>
                        </div>
                        <div class="" id="#Tab1-Q13">
                            <div id="text-input" contenteditable="true"><p style="margin-bottom: 1em; color: rgb(17, 17, 17);"><font face="Times New Roman" style=""><b style=""><font size="5">KỸ THUẬT TAY TRÁI: LUYỆN NGÓN</font></b><br><font size="5">Luyện ngón hàng ngày để ngón khỏe và linh hoạt, chuyển hợp âm nhanh, nhanh bấm được và chuyển dc hợp âm chặn. Đừng nghe xui dại nghiến răng bấm hợp âm, tay bạn sẽ cứng và k linh hoạt, về sau muốn lên đời chơi thêm intro hoặc chuyển solo/fingerstyle sẽ khó.</font></font></p><p style="margin-top: 0px; margin-bottom: 1em; color: rgb(17, 17, 17);"><font face="Times New Roman" style="" size="5">Và một điều rất quan trọng là nếu bạn đã trưởng thành thì tay bạn không ngắn, không dài, không to, k bé so với cần đàn như những gì bạn tưởng tượng. Cần đàn guitar được thiết kế theo tiêu chuẩn quốc tế và dc cả thế giới dùng nên vde nằm ở chỗ bạn chưa luyện ngón đủ nhiều để ngón khỏe và khéo léo. Bạn có thể lên youtube để xem rất nhiều em thiếu nhi chơi tốt đàn size người lớn.<br></font></p><div><p style="margin-top: 0px; margin-bottom: 1em; color: rgb(17, 17, 17);"><font face="Times New Roman" style="" size="5"><img src="https://i.imgur.com/W82pnaE.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/DCvxB6G.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/u0CTeOq.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/ijWpdLk.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/Trf6UZJ.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/0J3yjyo.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/gAj58hy.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/EHDTN7N.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/6DSOSwk.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/0It3Gl1.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/c11yWYa.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/aDnZKon.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/Xrs232O.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/xlz9TBx.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/iFWyHS1.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/2m6zdZC.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/c4f0d1H.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/datKiKs.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/N2ats3a.jpeg" style="width: 100%;"><br></font><span style="font-family: &quot;Times New Roman&quot;; font-size: x-large; background-color: rgb(224, 233, 255);"><b><i><br>Xem thêm: video lưu ý về tay trái và tay phải<br></i></b></span></p><p><iframe class="youtube-video" src="https://www.youtube.com/embed/bob97M8VR8w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><b><i><br></i></b><p></p></div></div>
                        </div>
                        <div class="" id="#Tab1-Q14">
                            <div id="text-input" contenteditable="true"><p><img src="https://i.imgur.com/b521SdD.jpeg" style="font-size: var(--tab-content-font-size); width: 100%;"></p><img src="https://i.imgur.com/lSFUvaF.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/jA9LLJg.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/kSXFJfh.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/Xobx5pq.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/cpCoyi7.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/eM7q6Bk.jpeg" style="width: 100%;"><br></div>
                        </div>
                        <div class="" id="#Tab1-Q15">
                            <div id="text-input" contenteditable="true"><div><div><b style=""><font size="5">BÀI TẬP LUYỆN TÁCH NGÓN MỌI NƠI MỌI CHỖ K CẦN DÙNG TỚI GUITAR (bài số 1)</font></b></div><font size="5"><div><b>Lưu ý: </b>Các bạn cần thả lỏng ngón tay và bàn tay và làm theo video, đừng dùng sức để tách ngón mà dùng não để điều khiển nhé. Lúc đầu sẽ rất khó, dần sẽ làm dc.</div><div><b>Trình tự:</b> Tách theo thứ tự từng ngón, từng cặp ngón và sau đó tách ngẫu nhiên.</div><div>Để tách ngón linh hoạt, theo ý và k cần dùng sức thì các bạn cần kiên trì và ai tập nhiều rồi cũng sẽ làm dc vì đây chỉ là vde điều khiển dây thần kinh vận động thôi không liên quan gì đến sức mạnh cơ bắp hay năng khiếu âm nhạc</div></font><br><div><p><iframe class="youtube-video" src="https://www.youtube.com/embed/GAFzJnAH-JI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></div></div></div>
                        </div>
                        <div class="" id="#Tab1-Q16">
                            <div id="text-input" contenteditable="true"><b><font size="5">BÀI TẬP GIÚP GIÃN NGÓN</font></b><div><b><font size="5"><br></font></b></div><div><font size="5" style="">Mặc dù bạn không thể kéo dài ngón tay nhưng việc chăm chỉ luyện các bài tập giãn ngón sẽ giúp bạn giãn phần thịt giữa các ngón cũng như làm cho các khớp ngón tay trở nên mềm dẻo, linh hoạt hơn, các ngón thẳng hơn... giúp vươn xa hơn.&nbsp;<br>Đây là một bài tập khó, nhưng rất hiệu quả. Để có kết quả tốt thì các bạn cần luyện tập bài này thường xuyên hàng ngày, nếu bận thì mỗi hôm 15 phút cũng dc. Cần nhớ luyện ngón giống như tập thể dục, nên không bao giờ là XONG, mà cần lặp đi lặp lại hàng ngày. <br>Để đỡ nhàm chán thì các bạn cần luyện tập xen kẽ giữa các bài luyện ngón, gảy note đơn, bấm hợp âm, rải hoặc quạt chả...&nbsp;<br></font></div><div><div><b><font size="5"><p><iframe class="youtube-video" src="https://www.youtube.com/embed/mx0mxLHZtN0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></font></b></div></div></div>
                        </div><div class="" id="#Tab1-Q17">
                            <div id="text-input" contenteditable="true"><font size="5"><b>Chương IV-THỰC HÀNH: Bài 6C - LUYỆN TAY PHẢI</b></font><div><font size="5"><b><br></b></font></div><font size="5">Các bài tập trong phần này cũng chính là các mẫu đệm (điệu) rải cơ bản cho. Khi đệm rải, nhiều bạn chỉ quen gảy theo kiểu Bass 321, 123 gì gì đó mà không biết là các kiểu đệm rải đó chính là từ các bài tập gảy tay phải cơ bản có trong giáo trình guitar cổ điển hoặc các giáo trình guitar cơ bản khác. Thay vì tập kiểu truyền miệng b 321 gì đó thì các bạn thử học đọc note nhạc hoặc tab, để gảy hết các bài tập sau đúng nhịp (tập cùng máy gõ nhịp) thì các bạn sẽ thấy cực kỳ hiệu quả khi ghép hát và hiểu dc nguyên tắc sau này k còn bị gò bó trong mấy kiểu rải phổ biến nữa.</font><div><div><font size="5"><br>Các bạn cần xem video hướng dẫn một số lưu ý về tay phải trước khi bắt đầu nhé<br><p><iframe class="youtube-video" src="https://www.youtube.com/embed/Pcki3cXKc-Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></font><div><div><img src="https://i.imgur.com/muSl3iI.jpeg" style="font-size: x-large; width: 100%;"></div><div><font size="5"><img src="https://i.imgur.com/0PHMFlg.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/ncNFE9f.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/Tnn8RV1.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/1AMHTGn.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/JG8YJjb.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/ZOwdksW.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/U5O7sZh.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/TSZzmKG.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/y0kcKoT.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/H3jWH3p.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/wgkdYjX.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/ytyJFgf.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/zGUXO20.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/SxNtpCs.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/KJgoZQr.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/ZdT2B6f.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/q3uBn2B.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/etnqoEn.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/ydUQMgU.jpeg" style="width: 100%;"><br><p><br></p><br></font></div></div></div></div></div>
                        </div>
                        <div class="" id="#Tab1-Q18">
                            <div id="text-input" contenteditable="true"><div><b style="font-size: var(--tab-content-font-size);"><img src="https://i.imgur.com/CBqn64M.jpeg" style="width: 100%;"></b></div><div><b><img src="https://i.imgur.com/xjIbqrM.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/yhgJHjF.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/QQjpShK.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/7SWR7bj.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/fayUmiX.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/NrxPMO4.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/R0Iv8Za.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/iqZNjk2.jpeg" style="width: 100%;"><br></b></div></div>
                        </div>
                        
                        
                        
                        
                    <div class="" id="#Tab1-Q19">
                            <div id="text-input" contenteditable="true"><img src="https://i.imgur.com/wvL26ht.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/sbMNqIX.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/EveO8mO.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/sjmVMVv.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/061XCqR.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/8yBFca7.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/T4K1ERc.jpeg" style="width: 100%;"><br></div>
                        </div><div class="" id="#Tab1-Q20">
                            <div id="text-input" contenteditable="true"><font size="5">Tiếp theo bạn tập chuyển các hợp âm với máy gõ nhịp để hình thành cảm nhịp. Việc tập với máy gõ nhịp sẽ đưa bạn nhanh lên một level mới, sau này bạn sẽ tự quạt dc tùy hứng hoặc xoắn đuôi xoắn ấy các kiểu mà vẫn đúng nhịp chứ đừng tập theo kiểu quạt lấy được, lúc nhanh lúc chậm và k biết thiếu thừa và k biết lúc nào nên chuyển.</font><br><img src="https://i.imgur.com/B6a0786.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/YfocGQL.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/KW7Cs1b.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/9RInYtw.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/dslZW4J.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/y57cDNu.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/f44yg1i.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/WkMSZOb.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/uMUKKPu.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/ZbZNGT6.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/PFp6c5S.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/UXj7oK7.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/4uuiYqV.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/bSkbN1J.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/qzPH3VV.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/Fjkl49E.jpeg" style="width: 100%;"><br></div>
                        </div><div class="" id="#Tab1-Q21">
                            <div id="text-input" contenteditable="true"><font size="5"><b>HƯỚNG DẪN MỘT SỐ KỸ THUẬT QUẠT CHẢ CƠ BẢN</b></font><div><font size="5"><b><br></b></font></div><div><font size="5"><b><p><iframe class="youtube-video" src="https://www.youtube.com/embed/Mm-P0319SkU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><p><br></p><p>CÁCH TÁCH ÂM TRẦM VÀO KHI QUẠT CHẢ: Mục đích để tiếng quạt dc sạch hơn, đỡ ồn và đa dạng hơn về âm sắc</p><p><iframe class="youtube-video" src="https://www.youtube.com/embed/4_87n9JFGSw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br></b></font></div></div>
                        </div><div class="" id="#Tab1-Q22">
                            <div id="text-input" contenteditable="true"><font size="5">Ở bài trước các bạn đã tập 14 bài chuyển hợp âm với tiết tấu đơn giản chỉ quạt xuống một cái trùng tiếng gõ nhịp. Còn đây là các bài tập quạt với tiết tấu khó hơn dành cho các bạn chăm chỉ luyện tập và muốn sau này có thể tuỳ biến được các kiểu quạt theo ý mình.<br></font><div><font size="5"><br></font></div><div><font size="5"><img src="https://i.imgur.com/SZwRSAC.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/fGCoay8.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/jf2YkSY.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/md1q4cR.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/0mMjM2r.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/y1Q6mRn.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/c5Lersb.jpeg" style="width: 100%;"><br><img src="https://i.imgur.com/tDd4lUg.jpeg" style="width: 100%;"><br><br></font></div></div>
                        </div><div class="active" id="#Tab1-Q23">
                            <div id="text-input" contenteditable="true"><b><font size="5">KỸ THUẬT SLAP</font></b><div><b><font size="5"><br></font></b></div><div><font size="5" style="">Slap là một kỹ thuật cần thiết đối với quạt chả đệm hát và cả fingerstyle, nhìn thì dễ nhưng để làm đúng thì k hề&nbsp;</font></div><span style="font-size: x-large;">đơn giản, vì vậy bạn nên xem hết 3 clip này</span><div><span style="font-size: x-large;"><br></span></div><div><span style="font-size: x-large;"><p><iframe class="youtube-video" src="https://www.youtube.com/embed/3XCss-8ATfI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe><br><br></p><p><iframe class="youtube-video" src="https://www.youtube.com/embed/OoQrnepE6-Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe><br></p><p><br></p><p></p><p><iframe class="youtube-video" src="https://www.youtube.com/embed/YqI3VMMtf2s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></p><br><p></p><br><p></p></span></div></div>
                        </div></div>
                </div>
                <div id="excute" style="text-align: center">
                    <button style="
                            width: fit-content;
                            display: inline;
                            font-size: large;
                            height: fit-content;
                        " onclick="saveVanillaTab()" id="save">
                        Save
                    </button>
        
                    <button style="
                            width: fit-content;
                            display: inline;
                            font-size: large;
                            height: fit-content;
                        " onclick="publishForUser()" id="publish">
                        Publish
                    </button>
                    <button style="
                            width: fit-content;
                            display: inline;
                            font-size: large;
                            height: fit-content;
                        " onclick="exportTab()" id="export">
                        Export
                    </button>
                    <button style="
                            width: fit-content;
                            display: inline;
                            font-size: large;
                            height: fit-content;
                        " id="import" onclick="importTab()">
                        Import
                    </button>
                </div>
        
                <div class="context-menu" id="contextMenu" style="font-weight: bold; display: none; left: 1239px; top: 139px;">
                    <div class="context-menu-item" id="deleteItem">
                        Delete <i class="fas fa-trash-alt"></i>
                    </div>
                    <div class="context-menu-item" id="insertItem">
                        Insert <i class="fas fa-sign-in-alt"></i>
                    </div>
                    <div class="context-menu-item" id="moveRightItem">
                        Move right <i class="fas fa-long-arrow-alt-right"></i>
                    </div>
                    <div class="context-menu-item" id="moveLeftItem">
                        Move left <i class="fas fa-long-arrow-alt-left"></i>
                    </div>
                </div>
        
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
        
                <!-- script for text editor -->
                <script src="./text-editor/script.js"></script>
                <!-- script for vanilla tab -->
                <script src="./vanilla-tab/script.js"></script>
        <div></div>
        <div></div>
        <grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration><grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>
        <grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>
        <grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>
       <grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>
        <div></div>
        <grammarly-popups data-grammarly-shadow-root="true" class="dnXmp" style="--rem: 16;"></grammarly-popups>
        <div></div>
        <div></div>
        <div></div></body><!-- script for rich text edior --></html>
        `);
            } else $("#book-body").html(i + ". " + $(this).children("a").html());
        });
    }
}

$(document).ready(() => {
    $(document).on("contextmenu", ".sub-menu", handleContextMenu);
    addEventForItem();
    addEventOpenBook();
    $(document).on("click", function (event) {
        var contextMenu = $("#contextMenu");
        if (!$(event.target).closest("#contextMenu").length) {
            contextMenu.hide();
        }
    });
    window.addEventListener("beforeunload", function (event) {
        if (!changed) {
            // console.log('changed');
            event.returnValue =
                "Data have been changed. Are you sure to reload?";
        }
    });
    console.log(noli);
    const targetNode = document.querySelector(".nano-content");

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            $("#save").addClass("changed");
            changed = false;
        });
    });

    // Configure the MutationObserver to observe changes to the target div element
    const config = { childList: true, subtree: true };
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
            $(".sub-menu").eq(index).children("ul").append(`
            <li id="l${$(".sub-menu ul li").length + 1}">
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
    $("#save").click(() => {
        if ($("#save").hasClass("changed")) {
        } else {
            alert("Chưa chỉnh sửa data!");
        }
    });
});
