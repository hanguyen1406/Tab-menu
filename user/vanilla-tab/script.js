// script for vanilla tab
// const $ = document.querySelector.bind(document);
var current_active_tab = 0;

var currentTab = 0;
var advancedOptionButton = document.querySelectorAll(".adv-option-button");
var alignButtons = document.querySelectorAll(".align");
var spacingButtons = document.querySelectorAll(".spacing");
var formatButtons = document.querySelectorAll(".format");
var scriptButtons = document.querySelectorAll(".script");
var $$ = document.querySelectorAll.bind(document);

var fontName = document.getElementById("fontName");
var fontSizeRef = document.getElementById("fontSize");
var writingArea = document.getElementById("text-input");
var linkButton = document.getElementById("createLink");
function addEventTab() {
    $$("div.tab").forEach((x) => {
        const Tab_Stripe = x.querySelector(".tab-stripe");
        const Tab_Content = x.querySelector(".tab-content");
        const Tab_Stripe_a = [...Tab_Stripe.children];
        const Tab_Content_div = [...Tab_Content.children];

        function SetTab(index) {
            Tab_Stripe_a[current_active_tab].classList.remove("active");
            Tab_Content_div[current_active_tab].classList.remove("active");

            Tab_Stripe_a[index].classList.add("active");
            Tab_Content_div[index].classList.add("active");
            current_active_tab = index;
        }

        if (location.hash) {
            const UrlTab = Tab_Content.querySelector(location.hash);
            iOfUrlTab = Tab_Content_div.indexOf(UrlTab);
            iOfUrlTab = iOfUrlTab === -1 ? 0 : iOfUrlTab;
            SetTab(iOfUrlTab);
        }

        Tab_Stripe_a.forEach(
            (x, index) => (
                (x.onclick = (e) => {
                    SetTab(index);
                    e.preventDefault();
                }),
                x.addEventListener("contextmenu", (e) => {
                    e.preventDefault(); // Prevent the default context menu
                    contextMenu.style.display = "block";
                    contextMenu.style.left = e.clientX + "px";
                    contextMenu.style.top = e.clientY + "px";
                    currentTab = index;
                    // console.log(`button ${x.innerHTML} clicked`)
                })
            )
        );
    });

    // Functions for drag scrolling, scroll-button hiding & full-screen button
    $$(".tab").forEach((x) => {
        const Tab_Stripe = x.querySelector(".tab-stripe");
        const Left_Button = x.querySelector(".tab-scroll-button.left");
        const Right_Button = x.querySelector(".tab-scroll-button.right");
        const Full_screen_Button = x.querySelector(".tab-full-screen-button");

        Full_screen_Button.onclick = () => {
            if (document.fullscreenElement) document.exitFullscreen();
            else x.requestFullscreen();
        };

        // Tab Scroll Button Start
        function update_steps() {
            let steps = Tab_Stripe.clientWidth - 100;
            function Scroll(steps) {
                Tab_Stripe.scrollLeft += steps;
            }
            Left_Button.onclick = () => Scroll(-steps);
            Right_Button.onclick = () => Scroll(steps);
        }
        update_steps();
        window.addEventListener("resize", update_steps);
        // Tab Scroll Button End

        // Tab Scroll Button Hiding Start
        function check_scroll() {
            let current_scroll_pos = Tab_Stripe.scrollLeft;
            let container_width = Tab_Stripe.clientWidth;
            let scrollable_width = Tab_Stripe.scrollWidth;
            let scroll_start_offset = 20;
            let scroll_end_offset =
                scrollable_width - container_width - scroll_start_offset;

            if (current_scroll_pos <= scroll_start_offset) {
                Left_Button.classList.add("hidden");
                Right_Button.classList.remove("hidden");
            } else if (current_scroll_pos < scroll_end_offset) {
                Left_Button.classList.remove("hidden");
                Right_Button.classList.remove("hidden");
            } else if (current_scroll_pos >= scroll_end_offset) {
                Left_Button.classList.remove("hidden");
                Right_Button.classList.add("hidden");
            }
        }
        Tab_Stripe.addEventListener("scroll", check_scroll);
        // Tab Scroll Button Hiding End

        // MouseDown -> MouseMove To Scroll
        let isDown;
        let startX;
        let scrollLeft;
        // Switch To Global(Window) Event Listener https://htmldom.dev/drag-to-scroll/
        // ↳ isDown = 1, ONLY when target coming from Tab_Stripe
        Tab_Stripe.addEventListener("mousedown", (e) => {
            isDown = 1;
            startX = e.pageX - Tab_Stripe.offsetLeft;
            scrollLeft = Tab_Stripe.scrollLeft;
            Tab_Stripe.classList.add("active");
            e.preventDefault();
        });
        Tab_Stripe.addEventListener("mouseleave", () => {
            isDown = 0;
            Tab_Stripe.classList.remove("active");
        });
        Tab_Stripe.addEventListener("mouseup", () => {
            isDown = 0;
            Tab_Stripe.classList.remove("active");
        });
        Tab_Stripe.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            const x = e.pageX - Tab_Stripe.offsetLeft;
            const scroll = (x - startX) * 2;
            Tab_Stripe.scrollLeft = scrollLeft - scroll;
            e.preventDefault();
        });
    });
}

addEventTab();
// Hide the context menu when clicking outside of it
// document.addEventListener("click", () => {
//     contextMenu.style.display = "none";
// });

function deletedTab(index) {
    // console.log(`tab ${index} deleted`);

    const Tab_Stripe = document.querySelector(".tab-stripe");
    const Tab_Content = document.querySelector(".tab-content");
    const Tab_Stripe_a = [...Tab_Stripe.children];
    const Tab_Content_div = [...Tab_Content.children];
    let size = Tab_Stripe_a.length;
    // console.log(Tab_Content_div);
    if (size == 1) {
        alert("Không thể xóa khi có 1 tab!");
        return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa tab ${index + 1}`) == true) {
        Tab_Stripe_a[size - 1].remove();
        for (let i = index; i < size - 1; i++) {
            Tab_Content_div[i].innerHTML = Tab_Content_div[i + 1].innerHTML;
        }
        Tab_Content_div[size - 1].remove();
    }
}

function tabMoveLeft(index) {
    const Tab_Content = document.querySelector(".tab-content");
    const Tab_Content_div = [...Tab_Content.children];
    let size = Tab_Content_div.length;
    if (size > 1 && index > 0) {
        if (
            confirm(
                `Bạn có chắc chắn muốn di chuyển tab ${index + 1} sang trái`
            ) == true
        ) {
            [
                Tab_Content_div[index].innerHTML,
                Tab_Content_div[index - 1].innerHTML,
            ] = [
                Tab_Content_div[index - 1].innerHTML,
                Tab_Content_div[index].innerHTML,
            ];
        }
    }
}

function tabMoveRight(index) {
    const Tab_Stripe = document.querySelector(".tab-stripe");
    const Tab_Content = document.querySelector(".tab-content");
    const Tab_Stripe_a = [...Tab_Stripe.children];
    const Tab_Content_div = [...Tab_Content.children];
    let size = Tab_Stripe_a.length;
    if (size > 1 && index < size - 1) {
        if (
            confirm(
                `Bạn có chắc chắn muốn di chuyển tab ${index + 1} sang phải`
            ) == true
        ) {
            [
                Tab_Content_div[index].innerHTML,
                Tab_Content_div[index + 1].innerHTML,
            ] = [
                Tab_Content_div[index + 1].innerHTML,
                Tab_Content_div[index].innerHTML,
            ];
        }
    }
}

// Log the name of the clicked item when a context menu item is clicked
document.querySelectorAll(".context-menu-item").forEach((item) => {
    item.addEventListener("click", () => {
        // console.log(`${item.textContent.trim()}`);
        let s = item.textContent.trim();
        switch (s) {
            case "Delete": {
                deletedTab(currentTab);
                break;
            }
            case "Insert": {
                addTab(currentTab);
                break;
            }
            case "Move left": {
                // console.log("left");
                tabMoveLeft(currentTab);
                break;
            }
            case "Move right": {
                // console.log("right");

                tabMoveRight(currentTab);
                break;
            }
        }
    });
});

function addTab(index) {
    var tabStripe = document.querySelector(".tab-stripe");
    var tabContent = document.querySelector(".tab-content");
    var tabContent_div = [...tabContent.children];

    // tabStripe.outerHTML
    var size = [...tabStripe.children].length;
    // console.log(size);
    var a = document.createElement("a");
    a.innerHTML = size + 1;
    a.href = `#Tab1-Q${size + 1}`;

    var divTab = tabContent_div[0].cloneNode(true);
    divTab.classList.remove("active");
    divTab.querySelector("#text-input").innerHTML = "";
    tabStripe.appendChild(a);
    tabContent.insertBefore(divTab, tabContent_div[index + 1]);
    tabContent_div = [...tabContent.children];
    // console.log(tabContent_div);
    for (let i = 0; i <= size; i++) tabContent_div[i].id = `#Tab1-Q${i + 1}`;
    //readd event to new tab
    addEventTab();
}

async function saveVanillaTab() {
    //remove a element
    changed = true;
    $("#save").removeClass("changed");
    var fc = $("#book-body > :first-child").html();
    $("#book-body > :first-child").remove();
    var data = {
        index: currentEbook,
        data: {
            index: $("#book-body").html(),
        },
    };
    await fetch("./saveEbook.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            $("#book-body").prepend(`<a>${fc}</a>`);
            alert("Saved");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function publishForUser() {
    var doc = document.cloneNode(true),
        textInput = [];
    //remove .container, atribute conteneditable, .context-menu, #excute

    doc.querySelector(".container").remove();
    doc.querySelector(".context-menu").remove();
    doc.querySelector("#excute").remove();
    doc.querySelectorAll("#text-input").forEach((value, index) => {
        value.removeAttribute("contenteditable");
        textInput.push(value.innerHTML);
        if (index > 1) {
            var title = value.querySelector("b");
            if (title) {
                value.innerHTML = title.outerHTML + "<br>";
                var loader = document.createElement("a");
                loader.href = "#";
                loader.id = "tittle";
                loader.innerHTML = "<b>Click để tải nội dung.</b>";
                value.appendChild(loader);
            }
        }
    });

    //prepare for floating icon
    var wrapper = document.createElement("div");
    doc.querySelector(".tab").appendChild(wrapper);
    wrapper.outerHTML = `<div class="wrapper">
        <link href="./floating.css" rel="stylesheet" />
        <input type="checkbox" />
        <div class="fab"></div>
        <div class="fac">
            <a id="pdf" href="#"><i class="fas fa-file-pdf"></i></a>
        </div>
    </div>`;

    // Create a new script element
    const scriptElement = document.createElement("script");
    const scriptElement2 = document.createElement("script");

    // Set the src attribute to "./floating.js"
    scriptElement.src = "./floating.js";
    scriptElement2.src = "./pdf-lib.min.js";

    // Append the script element to the <body>
    doc.body.appendChild(scriptElement2);
    doc.body.appendChild(scriptElement);

    // var data = doc.querySelector("html").innerHTML;
    var data = doc.documentElement.outerHTML;

    fetch("publishUser.php", {
        method: "POST",
        body: JSON.stringify({
            data: data,
            textInput: textInput,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            alert("Published");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    saveVanillaTab();
}

async function exportTab() {
    // saveVanillaTab();
    const currentDate = new Date();

    // Get the various components of the date and time
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is 0-based, so add 1
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();
    var version = `${hour}${minute}${second}_${day}${month}${year}`;

    await saveVanillaTab();
    // console.log(currentEbook);
    var fileUrl = `htmlcode/${currentEbook}.json`;
    fetch(fileUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            var jsonString = JSON.stringify(data);
            var blob = new Blob([jsonString], { type: "application/json" });
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.href = url;
            link.download = version + ".json";

            document.body.appendChild(link);

            link.click();
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

function importTab() {
    // Create a hidden input element of type 'file'
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json"; // Specify accepted file types, if needed

    fileInput.click();

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            // Check if the file has a .json extension
            if (file.name.endsWith(".json")) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    try {
                        const jsonData = JSON.parse(event.target.result);
                        var fc = $("#book-body > :first-child").html();

                        $("#book-body").html(jsonData["index"]);
                        $("#book-body").prepend(`<a>${fc}</a>`);

                        $("#save").addClass("changed");
                        changed = false;
                    } catch (error) {
                        console.error("Invalid JSON File:", error);
                    }
                };

                reader.readAsText(file);
            } else {
                console.log("Không đúng định dạng file");
            }
        } else {
            console.log("No file selected.");
        }
        // Remove the hidden input element
        fileInput.remove();
        // location.reload();
    });
}
