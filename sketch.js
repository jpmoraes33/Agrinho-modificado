let gralhas = []; // Armazena todas as gralhas azuis criadas
let arvores = [];
let cidadeX;
let nuvens = []; // Array para armazenar as nuvens
let casa; // Variável para a casa
let lago; // Variável para o lago
let flores = []; // Array para armazenar as flores

function setup() {
  createCanvas(800, 400);
  cidadeX = width / 2;
  // Cria algumas nuvens iniciais
  for (let i = 0; i < 3; i++) {
    nuvens.push(new Nuvens(random(width), random(50, 100)));
  }
  casa = new Casa(cidadeX - 100, height / 2 + 20); // Posição da casa
  lago = new Lago(50, height / 2 + 50, 150, 80); // Posição e tamanho do lago
  // Cria algumas flores iniciais
  for (let i = 0; i < 10; i++) {
    flores.push(new Flor(random(100, width - 100), random(height / 2 + 20, height - 20)));
  }
}

function draw() {
  background(135, 206, 235); // céu

  // Desenha as nuvens
  for (let nuvem of nuvens) {
    nuvem.mostrar();
    nuvem.mover();
  }

  // campo
  noStroke();
  fill(144, 238, 144);
  rect(0, height / 2, width, height / 2);

  // Desenha o lago
  lago.mostrar();

  // sol
  fill(235, 223, 0);
  ellipse(80, 80, 80);

  // cidade (prédios)
  for (let i = 0; i < 5; i++) {
    let x = cidadeX + i * 40;
    let y = height / 2 - 100;
    let largura = 30;
    let altura = 100;

    // Prédio
    fill(100);
    rect(x, y, largura, altura);

    // Janelas (3 linhas, 2 colunas por prédio)
    let janelaLargura = 6;
    let janelaAltura = 10;
    let espacamentoX = 8;
    let espacamentoY = 20;

    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 2; coluna++) {
        let janelaX = x + 5 + coluna * espacamentoX;
        let janelaY = y + 10 + linha * espacamentoY;
        fill(255, 255, 150); // Amarelo claro (luz)
        rect(janelaX, janelaY, janelaLargura, janelaAltura);
      }
    }
  }

  // Desenha a casa
  casa.mostrar();

  // Desenha as flores
  for (let flor of flores) {
    flor.mostrar();
  }

  // campo árvore
  for (let arvore of arvores) {
    arvore.mostrar();
  }

  // Mostra as gralhas azuis
  for (let gralha of gralhas) {
    gralha.voar();
    gralha.mostrar();
  }
}

function mousePressed() {
  if (mouseY > height / 2 && mouseX < cidadeX) {
    arvores.push(new Arvore(mouseX, mouseY));
    gralhas.push(new GralhaAzul(0, random(50, 150))); // Cria uma gralha voando
  }
  // Adiciona uma nova nuvem ao clicar
  nuvens.push(new Nuvens(mouseX, mouseY));
  // Adiciona uma nova flor ao clicar
  flores.push(new Flor(mouseX, mouseY));
}

class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = 0;
  }

  mostrar() {
    this.altura = min(this.altura + 1, 80); // Crescimento mais alto

    // Tronco
    fill(101, 67, 33);
    rect(this.x - 2, this.y - this.altura, 4, this.altura);

    // Camadas da copa da araucária (em forma de disco)
    let numCamadas = 3;
    let camadaAltura = 15;
    let camadaLargura = [60, 45, 30]; // Tamanho das copas

    for (let i = 0; i < numCamadas; i++) {
      fill(34, 139, 34);
      ellipse(
        this.x,
        this.y - this.altura - i * camadaAltura,
        camadaLargura[i],
        15
      );
    }
  }
}

class GralhaAzul {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = random(1, 3);
    this.tamanho = 20;
  }

  voar() {
    this.x += this.velocidade;
    if (this.x > width + this.tamanho) {
      this.x = -this.tamanho;
      this.y = random(50, 150);
    }
  }

  mostrar() {
    fill(70, 130, 180); // Azul acinzentado para o corpo
    ellipse(this.x, this.y, this.tamanho, this.tamanho * 0.7); // Corpo oval

    fill(0); // Preto para o bico
    triangle(
      this.x + this.tamanho / 2,
      this.y,
      this.x + this.tamanho / 2 + 8,
      this.y - 5,
      this.x + this.tamanho / 2 + 8,
      this.y + 5
    );

    fill(0); // Preto para o olho
    ellipse(this.x + this.tamanho * 0.2, this.y - this.tamanho * 0.15, 3, 3);
  }
}

class Nuvens {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = random(50, 100);
    this.velocidade = random(0.2, 1); // Nuvens se movem mais lentamente
  }

  mover() {
    this.x += this.velocidade;
    if (this.x > width + this.tamanho / 2) {
      this.x = -this.tamanho / 2;
    }
  }

  mostrar() {
    fill(220); // Cinza claro
    ellipse(this.x, this.y, this.tamanho, this.tamanho * 0.6);
    ellipse(this.x + this.tamanho / 2, this.y - this.tamanho * 0.2, this.tamanho * 0.8, this.tamanho * 0.5);
    ellipse(this.x + this.tamanho / 2, this.y + this.tamanho * 0.2, this.tamanho * 0.8, this.tamanho * 0.5);
  }
}

class Casa {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.largura = 80;
    this.altura = 60;
    this.corpoCor = color(240, 230, 140); // Bege claro
    this.telhadoCor = color(160, 82, 45); // Marrom tijolo
    this.chamineX = this.x + this.largura - 20;
    this.chamineY = this.y - 20;
    this.larguraChamine = 15;
    this.alturaChamine = 30;
  }

  mostrar() {
    // Corpo da casa
    fill(this.corpoCor);
    rect(this.x, this.y, this.largura, this.altura);

    // Telhado
    fill(this.telhadoCor);
    triangle(
      this.x,
      this.y,
      this.x + this.largura / 2,
      this.y - 20,
      this.x + this.largura,
      this.y
    );

    // Chaminé
    fill(120); // Cinza para a chaminé
    rect(
      this.chamineX,
      this.chamineY,
      this.larguraChamine,
      this.alturaChamine
    );

    // Porta
    fill(255, 160, 122); // Cor da porta: pêssego
    rect(
      this.x + this.largura / 4,
      this.y + this.altura / 2,
      this.largura / 2,
      this.altura / 2
    );

    // Janela (uma janela)
    fill(255, 255, 224); // Cor da janela: amarelo claro
    rect(
      this.x + 10,
      this.y + 10,
      this.largura / 3,
      this.altura / 3
    );
  }
}

class Lago {
  constructor(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.cor = color(0, 0, 200); // Cor azul escura
  }

  mostrar() {
    fill(this.cor);
    ellipse(this.x, this.y, this.largura, this.altura);
  }
}

class Flor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = random(10, 20);
    this.corPetalo = color(random(0, 255), random(0, 255), random(0, 255)); // Cor aleatória
    this.corCentro = color(255, 255, 0); // Centro amarelo
  }

  mostrar() {
    // Pétalas
    for (let i = 0; i < 5; i++) {
      let angulo = (TWO_PI / 5) * i;
      let px = this.x + cos(angulo) * this.tamanho;
      let py = this.y + sin(angulo) * this.tamanho;
      fill(this.corPetalo);
      ellipse(px, py, this.tamanho, this.tamanho * 0.6);
    }
    // Centro
    fill(this.corCentro);
    ellipse(this.x, this.y, this.tamanho / 2, this.tamanho / 2);
  }
}
