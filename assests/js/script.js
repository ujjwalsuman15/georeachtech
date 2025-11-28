new Swiper(".placedStudentSwiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    mousewheel: true,
    slidesPerView: "auto",
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBultets: true
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
//placedStudent end 

//Student Review start 
new Swiper('.slider-wrapper', {
    loop: true,
    gapCursor: true,
    spaceBetween: 20,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBultets: true
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        680: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        },
        1024: {
            slidesPerView: 3
        },
    }
});
// Student Review start end


//WRITTEN-REVIEW js section start 

var swiper = new Swiper(".myreviewSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: true,
    // loopFillGroupWithBlank: true,
    // pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    // },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 90000,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});

// WRITTEN-REVIEW js section start end

// form js section start start

const form = document.getElementById('google-sheet-form');
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyiN-tdz-6cO9CHFFEQFwIYXT8K6rjHB3I5r2TQAEIEU8GsZbLrssQ1ucoztCp3DRo/exec"; // <-- replace with your Apps Script Web App URL

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const fd = new FormData(form);

    fetch(WEB_APP_URL, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data.result === 'success') {
                alert('Form submitted successfully! Row: ' + data.row);
                form.reset();
            } else {
                alert('Submission failed: ' + (data.message || 'Unknown error'));
                console.error(data);
            }
        })
        .catch(err => {
            console.error('Network/server error:', err);
            alert('Network or server error. Check console for details.');
        });
});
// form js section start end
