//gera bombas
let bombas = [];
while (bombas.length < 10){
  rd = Math.floor(100 * Math.random()) + 1;
  if (bombas.indexOf(rd) == -1){
    bombas.push(rd);
  }
}

let cliques = 0;

//Armazena em um vetor as posições vizinhas a uma posição dada
function vizinhanca(pos) {
  viz = [];
  if ((pos - 1) % 10 != 0) {
    viz.push(pos - 1);
  }
  if ((pos + 1) % 10 != 1) {
    viz.push(pos + 1);
  }
  if ((pos - 10) > 0) {
    viz.push(pos - 10);
  }
  if ((pos + 10) < 101) {
    viz.push(pos + 10);
  }
  if (((pos - 9) > 0) && (pos - 9) % 10 != 1) {
    viz.push(pos - 9);
  }
  if (((pos + 9) < 101) && (pos + 9) % 10 != 0) {
    viz.push(pos + 9);
  }
  if (((pos - 11) > 0) && (pos - 11) % 10 != 0) {
    viz.push(pos - 11);
  }
  if (((pos + 11) < 101) && (pos + 11) % 10 != 1) {
    viz.push(pos + 11);
  }
  return viz;
}

//Verifica se em determinada posição existe uma bomba
function temBomba(pos) {
  return bombas.indexOf(pos) != -1
}

//verifica se um quadrado não possui bomba em sua vizinhança
function quadZerado(pos){
  return document.getElementById(pos.toString()).innerHTML == "";
}

//Altera a cor de um quadrado
function mudaCor(pos) {
  document.getElementById(pos.toString()).setAttribute("class", "clicado");
}

// Cria tabuleiro do campo minado
for (let i = 1; i < 101; i++) {
  let btn = document.createElement("button");
  let nb = 0;
  for (p of vizinhanca(i)) {
    if (temBomba(p)) {
      nb++;
    }
  }
  btn.id = i.toString();
  btn.innerHTML = nb.toString();
  if (temBomba(i)) {
    btn.innerHTML = "B";
  }
  if (nb == 0) {
    btn.innerHTML = "";
  }
  btn.setAttribute("type", "button");
  btn.addEventListener("click", function () {
    clicou(i);
  });
  document.getElementById("tabuleiro").appendChild(btn);
}

//Revela o valor de um quadrado ou se possui uma bomba e muda sua cor
function clicou(pos) {
  if (temBomba(pos)) {
    alert("BUM!!!");
    location.reload();
  }
  else {
    mudaCor(pos);
    cliques++;
    console.log(cliques);
  }
  if (quadZerado(pos)){
    for (p of vizinhanca(pos)) {
      clicou(p);
    }
  }
}

