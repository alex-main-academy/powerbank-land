// work with menu
const openMenuBtn = document.querySelector(".js-menu-open");
const closeMenuBtn = document.querySelector(".js-menu-close");
const menuElement = document.querySelector(".js-menu");

const handleOpenElement = (elem) => {
    document.body.classList.add("is-menu-open");
    elem.classList.add("is-open");
};

const handleCloseElement = (elem) => {
    document.body.classList.remove("is-menu-open");
    elem.classList.remove("is-open");
};

openMenuBtn.addEventListener("click", () => {
    handleOpenElement(menuElement);
});
closeMenuBtn.addEventListener("click", () => {
    handleCloseElement(menuElement);
});

// work with anchors link
function scrollToAnchor(anchorId) {
    const targetElement = document.getElementById(anchorId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 50;
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
        });
    }
}

const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const anchorId = this.getAttribute("href").substring(1);
        scrollToAnchor(anchorId);
        handleCloseElement(menuElement);
    });
});

// work with loader
const animationData = {
    container: document.getElementById("lottie2-container"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "lottie/loader.json",
};

const anim = lottie.loadAnimation(animationData);

// send data to Google Sheets
const form = document.querySelector(".js-form");
const loader = document.querySelector(".js-loader");
const thanksModal = document.querySelector(".js-modal");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const time = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    form.querySelector(".js-form-time").value = time;

    const scriptURL =
        "https://script.google.com/macros/s/AKfycbyO03vz9mMO2y2rPpL2cxD_X8rU6uSunrC_eirx7Xhdj0I9lzhQKn7nQndm7msBM3-9/exec";

    loader.classList.add("active");

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            loader.classList.remove("active");
            thanksModal.classList.add("is-open");
            form.reset();

            setTimeout(() => {
                thanksModal.classList.remove("is-open");
            }, 2000);
        })
        .catch((error) => {
            console.error("Error!", error.message);
        });
});
