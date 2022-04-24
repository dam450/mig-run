const dino = document.querySelector('.migs');
const background = document.querySelector('.background');
let position = 0;
var score = 0;


let isJumping = false;

let keyHandler = (event) => {
  console.log(event);
}

/**
 * Função que trata os eventos de pressionamento de teclas do teclado
 * @param {Event} event evento da tecla pressionada
 */
function handleKey(event) {
  if (event.keyCode === 32) {
    console.log('espaço pressionado');
    if (!isJumping) {
      jump();
    }
  }
}

function handleTouch(event) {
  console.log(event)
  if (!isJumping) {
    jump();
  }
}


function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
          dino.classList.remove('migs-jump');
          dino.classList.add('migs');
        } else {
          position -= 20;  //  Descendo 
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20  //  Subindo
      dino.classList.remove('migs');
      dino.classList.add('migs-jump');
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let ramdomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
      score++;
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //game over
      clearInterval(leftInterval);
      document.body.innerHTML = `<h1 class="game-over">Fim de Jogo!</h1><span>Você fez ${score} Pontos</span>`
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }

  }, 20);
  setTimeout(createCactus, ramdomTime);
}

createCactus();
document.addEventListener('keydown', handleKey, false);

window.addEventListener('load', () => {
  document.body.addEventListener('touchstart', (e) => {
    handleTouch(e);
  }, false);
}, false);