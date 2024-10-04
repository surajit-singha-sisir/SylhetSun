
print = console.log;
// ----------------------
//   INDEX PAGE START
// ----------------------
document.addEventListener('DOMContentLoaded', function () {
    slider();
});


function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].trim().split('=');
        if (cookiePair[0] === name) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}


function shareLinkLead(event) {
    const platform = event.currentTarget.getAttribute('data-platform');

    const currentUrl = document.getElementById('sun-lead-url').href;

    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${currentUrl}`;
            break;
        case 'twitter-x':
            shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`;
            break;
        default:
            console.error('Unsupported platform');
            return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
}




function navToggle(event) {
    const navToggleBar = event.currentTarget;
    const ul = navToggleBar.querySelector('ul');
    const img = navToggleBar.querySelector('img');

    if (ul.classList.contains('show')) {
        ul.classList.remove('show');
        img.classList.add('img-rotate-45');
    } else {
        img.classList.remove('img-rotate-45');
        ul.classList.add('show');
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-toggle-bar')) {
            ul.classList.remove('show');
            img.classList.add('img-rotate-45');
        }
    });
}


function hamburgerToggle() {
    const hambData = document.querySelector('.hamb-shows');
    const isHidden = hambData.classList.contains('hide');
    const body = document.querySelector('body');
    body.classList.toggle('overflow-hidden');

    const addOverflow = document.querySelector('nav.nav-bar');

    addOverflow.classList.toggle('nav-overflow');

    // HAMBURGER ICON CHANGE
    const spans = document.querySelectorAll('.hamburger span');
    spans[0].classList.toggle('hamb-rotate-1');
    spans[1].classList.toggle('hamb-rotate-2');
    spans[2].classList.toggle('hamb-rotate-3');



    if (isHidden) {
        hambData.style.transition = 'transform 0.3s ease-in-out';
        hambData.style.transform = 'translateY(-100%)';

        setTimeout(() => {
            hambData.style.transform = 'translateY(0)';
        }, 10);

        hambData.classList.remove('hide');

    } else {
        hambData.style.transition = 'transform 0.3s ease-in-out';
        hambData.style.transform = 'translateY(-100%)';

        setTimeout(() => {
            hambData.classList.add('hide');
        }, 300);
    }

    document.addEventListener('click', function (event) {
        const hambData = document.querySelector('.hamb-shows');
        const hamburger = document.querySelector('.hamburger');

        if (!hamburger.contains(event.target) && !hambData.contains(event.target)) {
            hambData.style.transition = 'transform 0.3s ease-in-out';
            hambData.style.transform = 'translateY(-100%)';


            spans[0].classList.remove('hamb-rotate-1');
            spans[1].classList.remove('hamb-rotate-2');
            spans[2].classList.remove('hamb-rotate-3');
            body.classList.remove('overflow-hidden');

            setTimeout(() => {
                addOverflow.classList.remove('nav-overflow');
                hambData.classList.add('hide');
            }, 300);
        }
    });

}

function slider() {
    const items = document.querySelectorAll('.items .inner-item');
    let currentIndex = 0;
    const totalItems = items.length;
    const delay = 5000;
    let sliderInterval;

    items.forEach(item => {
        item.classList.add('transform-out');
    });

    function moveToNextSlide() {
        items[currentIndex].classList.remove('active');
        items[currentIndex].classList.add('transform-out');
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].classList.remove('transform-in', 'transform-out');
        items[currentIndex].classList.add('active', 'transform-in');
    }

    items[currentIndex].classList.add('active');
    sliderInterval = setInterval(moveToNextSlide, delay);

    items.forEach(item => {
        item.addEventListener('click', function () {
            moveToNextSlide();
            clearInterval(sliderInterval);
            sliderInterval = setInterval(moveToNextSlide, delay);
        });
    });
}

// ----------------------
//   INDEX PAGE END
// ----------------------


// ----------------------
//   POST VIEW START
// ----------------------


// SHARE SOCIAL
function shareLink(event) {
    const a = event.querySelector('i');
    const href = a.getAttribute('href');
    const url = window.location.href;
    const windowFeatures = 'width=600, height=400, scrollbars=no, resizable=no';

    // FACEBOOK SHARE
    if (a.classList.contains('fa-facebook-f')) {
        const shareUrl = 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(url);
        window.open(shareUrl, '_blank', windowFeatures);

    }

    // MESSENGER SHARE
    if (a.classList.contains('fa-facebook-messenger')) {
        const shareUrl = 'https://m.me/?link=' + encodeURIComponent(url);
        window.open(shareUrl, '_blank', windowFeatures);
    }



    // TWITTER-X SHARE
    if (a.classList.contains('fa-x-twitter')) {
        const shareUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent('Check this out!');
        window.open(shareUrl, '_blank', windowFeatures);
    }


    // WHATSAPP SHARE
    if (a.classList.contains('fa-whatsapp')) {
        const shareUrl = 'https://wa.me/' + href + '?text=' + encodeURIComponent(url);
        window.open(shareUrl, '_blank', windowFeatures);
    }

    // LINKEDIN SHARE
    if (a.classList.contains('fa-linkedin')) {
        const shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
        window.open(shareUrl, '_blank', windowFeatures);
    }



    function xhr() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://surmakontho.com/news/got_share', true);

        const csrfToken = getCookie('csrftoken');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-CSRFToken', csrfToken);


        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.error('Error:', xhr.status);
                }
            }
        };

        // https://sylhetsun.net/news/news_details/RW3bk0D?address=sdfa
        function getNewsId() {
            const url = window.location.href;
            const id = url.split('/').pop().split('?')[0];
            return id;
        }
        let plat = '';
        const brand = event.querySelector('i').classList;
        if (brand.contains('fa-facebook-f')) {
            plat = 'facebook';
        } else if (brand.contains('fa-facebook-messenger')) {
            plat = 'messenger';
        } else if (brand.contains('fa-x-twitter')) {
            plat = 'twitter';
        } else if (brand.contains('fa-whatsapp')) {
            plat = 'whatsapp';
        } else if (brand.contains('fa-linkedin')) {
            plat = 'linkedin';
        }

        const newsId = getNewsId();
        xhr.send(JSON.stringify({
            news_id: newsId,
            platform: plat,
            counter: true
        }));
    }
    xhr();

}






// INCREASE FONT SIZE
function plusButton() {
    const article = document.getElementById('article');
    const fontSize = parseFloat(window.getComputedStyle(article).getPropertyValue('font-size'));

    if (fontSize >= 32) {
        alert("Maximum font size reached.");
    } else {
        article.style.fontSize = (fontSize + 1) + 'px';
    }
}

// DECREASE FONT SIZE
function minusButton() {
    const article = document.getElementById('article');
    const fontSize = parseFloat(window.getComputedStyle(article).getPropertyValue('font-size'));

    if (fontSize <= 14) {
        alert("Minimum font size reached.");
    } else {
        article.style.fontSize = (fontSize - 1) + 'px';
    }
}

function onstickyhide() {
    const hideContainer = document.getElementById('onstickyhide');
    const onstickychange = document.getElementById('onstickychange');
    const sunsocialshares = document.getElementById('sun-social-shares');

    function operation1() {
        const currentHeight = window.pageYOffset;
        if (currentHeight > 750) {
            hideContainer.classList.add('hide');
            onstickychange.classList.remove('f-just-between');
            onstickychange.classList.add('f-just-center', 'sticky');
            sunsocialshares.classList.add('social-shares-gradient');
            sunsocialshares.style.marginTop = '35px';

        } else {
            hideContainer.classList.remove('hide');
            onstickychange.classList.add('f-just-between');
            onstickychange.classList.remove('f-just-center', 'sticky');
            sunsocialshares.classList.remove('social-shares-gradient');
            sunsocialshares.style = '';
        }
    }

    function operation2() {
        const currentHeight = window.pageYOffset;
        if (currentHeight > 600) {
            hideContainer.classList.add('hide');
            onstickychange.classList.remove('f-just-between');
            onstickychange.classList.add('f-just-center', 'sticky');
            sunsocialshares.classList.add('social-shares-gradient');
            sunsocialshares.style.marginTop = '25px';

        } else {
            hideContainer.classList.remove('hide');
            onstickychange.classList.add('f-just-between');
            onstickychange.classList.remove('f-just-center', 'sticky');
            sunsocialshares.classList.remove('social-shares-gradient');
            sunsocialshares.style = '';
        }
    }

    function handleSize() {
        const width = window.innerWidth;
        if (width < 420) {
            window.addEventListener('touchmove', operation2);
        } else {
            window.addEventListener('scroll', operation1);
        }
    }
    handleSize();

}

function newsID() {
    const url = window.location.href;
    console.log(url);
    const id = url.split('/').pop().split('?')[0];
    return id;
}





let startTime = 0;
let intervalId;

function trackStartTime() {
    startTime = 0;
    intervalId = setInterval(() => {
        startTime++;
    }, 1000);
};

function sendTotalTime() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://surmakontho.com/news/got_engagement", true);
    xhr.setRequestHeader("Content-Type", "application/json");


    const news_Id = newsID();
    const data = JSON.stringify({ time: startTime, news_id: news_Id });
    xhr.send(data);
}

window.onbeforeunload = function () {
    clearInterval(intervalId);
    sendTotalTime();
};

window.onload = function () {
    trackStartTime();
};






window.addEventListener('load', function () {
    onstickyhide();
    // engagements();

});









// ----------------------
//    POST VIEW END
// ----------------------