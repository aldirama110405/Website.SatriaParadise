document.addEventListener("DOMContentLoaded", function() {
    let sections = document.querySelectorAll("section");
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
    };

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = "translateY(50px)";
        section.style.transition = "all 0.5s ease-in-out";
        observer.observe(section);
    });
});

// Fungsi untuk membuka Google Maps dengan lokasi spesifik
function openMap(location) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(url, "_blank");
}

// Mengatur lokasi spesifik untuk setiap tour
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".tour-card:nth-child(1)").setAttribute("onclick", "openMap('Pantai Lovina, Bali')");
    document.querySelector(".tour-card:nth-child(2)").setAttribute("onclick", "openMap('Uluwatu, Bali')");
    document.querySelector(".tour-card:nth-child(3)").setAttribute("onclick", "openMap('Gunung Batur, Bali')");
    document.querySelector(".tour-card:nth-child(4)").setAttribute("onclick", "openMap('Tegenungan Waterfall, Ubud, Bali')");
    document.querySelector(".tour-card:nth-child(5)").setAttribute("onclick", "openMap('Pasih Uug, Nusa Penida, Bali')");
    document.querySelector(".tour-card:nth-child(6)").setAttribute("onclick", "openMap('Jimbaran, Bali')");
});

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const avatar = document.querySelector(".avatar");

        if (avatar) {
            avatar.addEventListener("click", function () {
                Swal.fire({
                    title: "Halo! 👋",
                    text: "Apakah ada yang ingin Anda tanyakan?",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Ya, saya ingin bertanya!",
                    cancelButtonText: "Tidak, terima kasih"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("Silakan tanyakan apa yang ingin Anda ketahui!", "", "success");
                    }
                });
            });
        } else {
            console.error("Elemen avatar tidak ditemukan!");
        }
    }, 1000); // Tambahkan delay kecil untuk memastikan elemen telah dimuat
});


function showDetails(title, description, price) {
    Swal.fire({
        title: title,
        html: `<p>${description}</p><p><strong>Harga: ${price}</strong></p>`,
        icon: "info"
    });
}

(function(){
    emailjs.init("6BIDbkLKrdmnGwCP0"); 
})();

function sendEmail(name, email, bookingDate) {
    var templateParams = {
        user_name: name,
        user_email: email,
        booking_date: bookingDate
    };

    emailjs.send("service_f3t8o48", "template_m4h1wkc", templateParams)
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        Swal.fire("Pesanan Berhasil!", "Pesanan Anda telah dikirim ke email kami.", "success");
    }, function(error) {
        console.log("FAILED...", error);
        Swal.fire("Oops!", "Terjadi kesalahan saat mengirim email.", "error");
    });
}

function showBookingForm() {
    Swal.fire({
        title: 'Isi Detail Pemesanan',
        html: `
            <label style="display:block; text-align:left;">Nama:</label>
            <input type="text" id="name" class="swal2-input" placeholder="Masukkan Nama">
            <label style="display:block; text-align:left;">Email:</label>
            <input type="email" id="email" class="swal2-input" placeholder="Masukkan Email">
            <label style="display:block; text-align:left;">Tanggal Booking:</label>
            <input type="date" id="bookingDate" class="swal2-input">
        `,
        showCancelButton: true,
        confirmButtonText: 'Konfirmasi Booking',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#ff4500',
        preConfirm: () => {
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let bookingDate = document.getElementById('bookingDate').value;
            
            if (!name || !email || !bookingDate) {
                Swal.showValidationMessage('Harap isi semua kolom!');
                return false;
            }

            sendEmail(name, email, bookingDate);
        }
    });
}



var templateParams = {
    user_name: "Nama Lengkap",
    user_email: "email@example.com",
    booking_date: "2025-03-03"
};

emailjs.send("vice_f3t8o48", "template_m4h1wkc", templateParams)
.then(response => {
    console.log("SUCCESS!", response);
})
.catch(error => {
    console.error("FAILED...", error);
});



let currentIndex = 0;
const reviewContainer = document.querySelector(".review-container");
const totalReviews = document.querySelectorAll(".review").length;
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let autoSlide;

function updateCarousel() {
    reviewContainer.style.transition = "transform 0.5s ease-in-out";
    reviewContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextReview() {
    currentIndex = (currentIndex + 1) % totalReviews;
    updateCarousel();
    resetAutoSlide();
}

function prevReview() {
    currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlide = setInterval(nextReview, 5000); // Auto-slide tiap 5 detik
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

// Event Listener untuk tombol
nextButton.addEventListener("click", () => {
    nextReview();
    disableButtonsTemporarily();
});
prevButton.addEventListener("click", () => {
    prevReview();
    disableButtonsTemporarily();
});

// Fungsi untuk menghindari spam click
function disableButtonsTemporarily() {
    nextButton.disabled = true;
    prevButton.disabled = true;
    setTimeout(() => {
        nextButton.disabled = false;
        prevButton.disabled = false;
    }, 500); // Disable sementara 0.5 detik
}

// Mulai auto-slide saat halaman load
startAutoSlide();
