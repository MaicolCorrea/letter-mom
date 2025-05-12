
const envelope = document.getElementById('envelope');
const envelopeFlap = document.getElementById('envelopeFlap');
const cardWrapper = document.getElementById('cardWrapper');
const card = document.getElementById('card');
const instruction = document.getElementById('instruction');

let isEnvelopeOpen = false;
let isCardOut = false;
let isCardOpen = false;

envelope.addEventListener('click', function () {
    if (!isEnvelopeOpen) {
        envelopeFlap.classList.add('open');
        isEnvelopeOpen = true;

        setTimeout(() => {
            cardWrapper.classList.add('out');
            isCardOut = true;

            instruction.textContent = 'Haz clic en la tarjeta para abrirla';
        }, 600);
    }
});

card.addEventListener('click', function (e) {
    if (isCardOut) {
        e.stopPropagation();

        if (!isCardOpen) {
            this.classList.add('open');
            isCardOpen = true;
            instruction.textContent = 'Haz clic en la tarjeta para cerrarla';
            createConfetti();
        } else {
            this.classList.remove('open');
            isCardOpen = false;
            instruction.textContent = 'Haz clic en la tarjeta para abrirla';
        }
    }
});

cardWrapper.addEventListener('click', function (e) {
    if (isCardOut) {
        e.stopPropagation();
    }
});

function createConfetti() {
    const colors = ['#ff77e9', '#ff9a9e', '#fecfef', '#ffc3a0', '#ffafbd'];

    const oldConfetti = document.querySelectorAll('.confetti');
    oldConfetti.forEach(c => c.remove());

    // Crear nuevo confeti
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-5%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.animationDelay = Math.random() * 3 + 's';

        document.body.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function setupImageUpload(elementId) {
    const container = document.getElementById(elementId);

    container.addEventListener('click', function (e) {
        e.stopPropagation();

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    container.innerHTML = '';

                    const img = document.createElement('img');
                    img.src = event.target.result;
                    container.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        };

        input.click();
    });
}

setupImageUpload('frontImage');
setupImageUpload('insideImage');