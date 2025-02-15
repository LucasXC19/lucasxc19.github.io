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
  { valor: 1, simbolo: 'I' }];
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
    rd = parseInt(100*Math.random()+1);
    if (numeros.indexOf(rd) == -1){
      numeros.push(rd.toString());
      numeros.push(paraRomano(rd));
    }
  }
  return numeros;
}

let numeros = embaralha(geraNumeros());

function geraCartas(n) {
  for (let i = 1; i <= n; i++) {
    carta = document.createElement("div");
    carta.id = i.toString();
    carta.setAttribute("class", "carta");
    frente = document.createElement("div");
    frente.setAttribute("class", "frente");
    frente.innerHTML = numeros[i-1];
    fundo = document.createElement("div");
    fundo.setAttribute("class", "fundo");
    imagem = document.createElement("img");
    imagem.src = "carta.png";
    carta.addEventListener("click", viraCarta);
    fundo.appendChild(imagem);
    carta.appendChild(frente);
    carta.appendChild(fundo);
    document.getElementById("mesa").appendChild(carta);
  }
}

let viradas = [];

function viraCarta(){
  if ((viradas.length < 2) && (viradas.indexOf(this.id) == -1)){
    this.classList.toggle("gira");
    viradas.push(this.id)
  }
  if ((viradas.length == 2) && (this.id == viradas[1])){
    let espera = setTimeout(desvira, 5000);
    function desvira(){
      document.getElementById(viradas[0]).classList.toggle("gira");
      document.getElementById(viradas[1]).classList.toggle("gira");
      let num1 = document.getElementById(viradas[0]).children[0].innerHTML;
      let num2 = document.getElementById(viradas[1]).children[0].innerHTML;
      if (paraRomano(num1) == paraRomano(num2)){
        document.getElementById(viradas[0]).style.visibility = "hidden";
        document.getElementById(viradas[1]).style.visibility = "hidden";
      }
      viradas.pop();
      viradas.pop();
    }
  }
}

geraCartas(40);

