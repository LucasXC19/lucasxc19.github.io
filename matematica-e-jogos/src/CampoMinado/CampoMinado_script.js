//Campo Minado. Criado por Lucas Xavier
//gera bombas
let bombas = [];
while (bombas.length < 10){
  let rd = Math.floor(100 * Math.random()) + 1;
  if (bombas.indexOf(rd) == -1){
    bombas.push(rd);
  }
}

let cliques = 0;

//Armazena em um vetor as posições vizinhas a uma posição dada
function vizinhanca(pos) {
  let viz = [];
  if ((pos - 1) % 10 != 0) viz.push(pos - 1);
  if ((pos + 1) % 10 != 1) viz.push(pos + 1);
  if ((pos - 10) > 0) viz.push(pos - 10);
  if ((pos + 10) < 101) viz.push(pos + 10);
  if (((pos - 9) > 0) && (pos - 9) % 10 != 1) viz.push(pos - 9);
  if (((pos + 9) < 101) && (pos + 9) % 10 != 0) viz.push(pos + 9);
  if (((pos - 11) > 0) && (pos - 11) % 10 != 0) viz.push(pos - 11);
  if (((pos + 11) < 101) && (pos + 11) % 10 != 1) viz.push(pos + 11);
  return viz;
}

//Verifica se em determinada posição existe uma bomba
function temBomba(pos) {
  return bombas.indexOf(pos) != -1;
}

//verifica se um quadrado não possui bomba em sua vizinhança
function quadZerado(pos){
  return $("#" + pos).html() == "";
}

//Altera a cor de um quadrado
function mudaCor(pos) {
  $("#" + pos).attr("class", "btn btn-success clicado");
}

// Cria tabuleiro do campo minado
$(document).ready(function() {
  for (let i = 1; i < 101; i++) {
    let nb = 0;
    for (let p of vizinhanca(i)) {
      if (temBomba(p)) nb++;
    }
    let conteudo = nb === 0 ? "" : nb.toString();
    if (temBomba(i)) conteudo = "B";

    let $btn = $("<button></button>")
      .attr("id", i)
      .attr("type", "button")
      .addClass("btn btn-secondary")
      .css({
        width: "40px",
        height: "40px",
        margin: "2px"
      })
      .html(conteudo)
      .on("click", function() {
        clicou(i);
      });

    $("#tabuleiro").append($btn);
  }
});

//Revela o valor de um quadrado ou se possui uma bomba e muda sua cor
function clicou(pos) {
  const $btn = $("#" + pos);
  // Evita clicar novamente em quadrados já revelados
  if ($btn.hasClass("clicado")) return;

  if (temBomba(pos)) {
    alert("BUM!!!");
    location.reload();
  } else {
    mudaCor(pos);
    cliques++;
    console.log(cliques);
  }

  if (quadZerado(pos)){
    for (let p of vizinhanca(pos)) {
      if (!$("#" + p).hasClass("clicado")) {
        clicou(p);
      }
    }
  }
}

