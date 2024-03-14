// Show and Hide Mobile Menu
$(".burger").on("click", function () {
    $(".burger").toggleClass("burger-open");
    $(".mobileNav").toggleClass("mobileNav-open");
});

fetch("../editor/index.html") // Replace '/path/to/your/file.txt' with the actual path to your file
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text(); // Assuming the file contains text data
    })
    .then((data) => {
        var test = document.createElement("div");
        test.innerHTML = data;
        var nanoCt = test.querySelector(".nano-content");
        nanoCt.className = "mobileNav_tier1";
        nanoCt.id = "";
        for (let i = 0; i < nanoCt.children.length; i++) {
            const e = nanoCt.children[i];
            e.className = "";
            var img = e.querySelector("img");
            var a = e.querySelector("a");
            img.src = "../editor/img/" + img.src.split("/")[(img.src.split("/")).length - 1];
            console.log(img.src);
            img.style = "width: 30px; height: 30px;border-radius: 25px";
            e.querySelector("label").remove();
            var ulChild = e.querySelector("ul");
            a.className = "mobileNav_tier1_item";
            a.insertBefore(img, a.firstChild);
            ulChild.style = "";
            ulChild.className = "mobileNav_tier2";
            ulChild.querySelectorAll("img").forEach((e) => e.remove());
            ulChild
                .querySelectorAll("li")
                .forEach((e) => (e.className = "ebook"));
            const firstChild = ulChild.firstChild;
            e.querySelector("span").className = "icon-text";
            const newChild = document.createElement("li");
            newChild.innerHTML = `<h1 class="mobileNav_tier2_heading">${
                e.querySelector("span").innerHTML
            }</h1>`;

            ulChild.insertBefore(newChild, firstChild);
            ulChild
                .querySelectorAll("a")
                .forEach((e) => (e.className = "mobileNav_tier2_item"));

            if (i == 0) e.className = "active";
        }

        console.log(nanoCt);
        var mobileNav = document.querySelector(".mobileNav");
        mobileNav.innerHTML = "";
        mobileNav.appendChild(nanoCt);

        $(".mobileNav_tier1 li").on("click", function () {
            $(".mobileNav_tier1 li").removeClass("active");
            $(this).toggleClass("active");
        });
        $(".arrow").remove();

        addEventOpenBook();
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });

function addEventOpenBook() {
    $(".ebook").each((i, e) => {
        $(e).on("click", async function (e) {
            try {
                currentEbook = $(this).attr("id").slice(1);
                var id = currentEbook;
                await fetch(`./htmlcode/${id}.json`)
                    .then((response) => response.json())
                    .then((json) => {
                        // console.log(json['index'])
                        $("#book-body").html(json["index"]);
                    });
            } catch (error) {
                alert("Khong co ebook nay");
            }
        });
    });
}
