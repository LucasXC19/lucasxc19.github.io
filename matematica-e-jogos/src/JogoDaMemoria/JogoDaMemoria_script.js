function embaralha(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function paraRomano(num) {
  if (isNaN(num)){
    return num
  }
  const simbolosRomanos = [
    { valor: 1000, simbolo: 'M' },
    { valor: 900, simbolo: 'CM' },
    { valor: 500, simbolo: 'D' },
    { valor: 400, simbolo: 'CD' },
    { valor: 100, simbolo: 'C' },
    { valor: 90, simbolo: 'XC' },
    { valor: 50, simbolo: 'L' },
    { valor: 40, simbolo: 'XL' },
    { valor: 10, simbolo: 'X' },
    { valor: 9, simbolo: 'IX' },
    { valor: 5, simbolo: 'V' },
    { valor: 4, simbolo: 'IV' },
    { valor: 1, simbolo: 'I' }
  ];
  let result = '';
  for (const { valor, simbolo } of simbolosRomanos) {
    while (num >= valor) {
      result += simbolo;
      num -= valor;
    }
  }
  return result;
}

function geraNumeros(){
  let numeros = [];
  while (numeros.length < 40){
    let rd = parseInt(100*Math.random()+1);
    if (numeros.indexOf(rd.toString()) == -1){
      numeros.push(rd.toString());
      numeros.push(paraRomano(rd));
    }
  }
  return numeros;
}

let numeros = embaralha(geraNumeros());

function geraCartas(n) {
  for (let i = 1; i <= n; i++) {
    let $carta = $("<div></div>")
      .attr("id", i.toString())
      .addClass("carta");

    let $frente = $("<div></div>")
      .addClass("frente")
      .html(numeros[i-1]);

    let $fundo = $("<div></div>")
      .addClass("fundo");

    let $imagem = $("<img>")
      .attr("src", "carta.png");

    $fundo.append($imagem);
    $carta.append($frente).append($fundo);
    $carta.on("click", viraCarta);

    $("#mesa").append($carta);
  }
}

let viradas = [];

function viraCarta(){
  if ((viradas.length < 2) && (viradas.indexOf($(this).attr("id")) == -1)){
    $(this).toggleClass("gira");
    viradas.push($(this).attr("id"));
  }
  if ((viradas.length == 2) && ($(this).attr("id") == viradas[1])){
    setTimeout(desvira, 5000);
    function desvira(){
      $("#" + viradas[0]).toggleClass("gira");
      $("#" + viradas[1]).toggleClass("gira");
      let num1 = $("#" + viradas[0]).children(".frente").html();
      let num2 = $("#" + viradas[1]).children(".frente").html();
      if (paraRomano(num1) == paraRomano(num2)){
        $("#" + viradas[0]).css("visibility", "hidden");
        $("#" + viradas[1]).css("visibility", "hidden");
      }
      viradas = [];
    }
  }
}

$(document).ready(function() {
  geraCartas(40);
});

