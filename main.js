const siguintePOke = (_) => {
  //recargo-el pokemon a lelegir
  //recuperar escenario-1
  const escenario_1 = document.getElementById("escenario-1");
  escenario_1.hidden = false;
  //ocular escenario-2
  const escenario_2 = document.getElementById("escenario-2");
  escenario_2.hidden = true;
  desabilitarBotenes(op1Evento, op2Evento, op3Evento, botonSkipEvento, false);
  pokeAleatorio1();
};
// ---------------------------------------------------------------------------------------------------------------------------
document.getElementById("refresh").addEventListener("click", siguintePOke);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandonNumeroPoke() {
  return Math.floor(Math.random() * 1000);
}
// ---------------------------------------------------------------------------------------------------------------------------
//validar para que no sea 2 opciones de nombre Pokemon
function validar(params, array123, tam) {
  let flag = true;
  do {
    if (!array123.includes(params)) {
      flag = false;
    } else {
      params = getRandomInt(tam);
    }
  } while (flag);

  return params;
}

//-----------------------------------------------------------refactorizar-----------------------------------------------------------
sessionStorage.setItem("numPoke", getRandonNumeroPoke());

function pokeAleatorio1() {
  fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=" +
      sessionStorage.getItem("numPoke")
  )
    .then((res) => res.json())
    .then((data) => {
      objeto = JSON.stringify(data.results);
      objeto = JSON.parse(objeto);
      let arrayMostrar = [];
      let tamArray=objeto.length;
      let pokeramdomName = getRandomInt(tamArray);
      arrayMostrar.push(pokeramdomName);
      let pokeramdomName2 = validar(
        getRandomInt(tamArray),
        arrayMostrar,
        tamArray
      );

      arrayMostrar.push(pokeramdomName2);

      let pokeramdomName3 = validar(
        getRandomInt(tamArray),
        arrayMostrar,
        tamArray
      );
      arrayMostrar.push(pokeramdomName3);

      const namePOke = objeto[pokeramdomName].name;
      const namePOke2 = objeto[pokeramdomName2].name;
      const namePOke3 = objeto[pokeramdomName3].name;

      sessionStorage.setItem("pokemonAdivinar2", namePOke2);
      sessionStorage.setItem("pokemonAdivinar3", namePOke3);
      dameMiPokemon(namePOke);
      
    });
}

async function dameMiPokemon(poke) {
  try {
    //console.log(poke);
    const promesa = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
    const pokemon = await promesa.json();
    const sprite = pokemon.sprites.front_default;
    //console.log("Los datos de mi pokemon:", pokemon);
    //console.log("Ruta del sprite:", sprite);

    const imagen = document.getElementById("imagenPoke");
    imagen.src = sprite;
    imagen.width = 300;
    imagen.height = 300;
    imagen.id = "imagenPoke";
    imagen.alt = `${poke}`;

    document.getElementById("imagenPoke").style.margin = "9%";
    document.getElementById("test").innerText = `${poke}`;

    sessionStorage.setItem("pokemonAdivinar", `${poke}`);

    document.getElementById("imagenPoke").style.filter = "brightness(0.1)";
  } catch (err) {
    //console.log("Ops:", err);
  }
}
pokeAleatorio1();
//-----------------------------------------------------------^^refactorizar^^-----------------------------------------------------------

// verificar que el pokemon es el escrito
const botonAdivinar = document.getElementById("boton-adivinar");

const pokemonIngresado = document.querySelector("#pokemonIngresado");
const botonQuitarSombra = document.getElementById("boton-quitar-sombra");

botonAdivinar.onclick = (e) => {
  e.preventDefault();
  isCorrect(pokemonIngresado.value, true,true);
};

// Quita sombra de pokemon
botonQuitarSombra.onclick = (e) => {
  e.preventDefault();
  quitarSombra();
  document.getElementById("imagenPoke").style.filter = "brightness(1)";
  ponerOpciones(sessionStorage.getItem("pokemonAdivinar"));
};
// ----------------------------------------------------------------------------------------------------------------------------
// Logica para verificar si el nombre es el correcto, se envia un booleano para restrungir el aceso
//arengla el bug que se si no acierta la opc correcta se ordene de nuevo las opciones
function isCorrect(nomePokemon, ordenar = false,aumentar=false) {
  if (nomePokemon === sessionStorage.getItem("pokemonAdivinar")) {
    //console.log("ok");
    elimiarPokeByWin();
    aumentarVida(aumentar);

    /// ....falta aumentar Vida
  } else {
    //console.log("No ok");
    quitarSombra();
    document.getElementById("imagenPoke").style.filter = "brightness(1)";
    if (ordenar) {
      ponerOpciones(sessionStorage.getItem("pokemonAdivinar"));
    }
    elimiarPokeByLose();
  }
}
// ---------------------------------------------------------------------------------------------------------------------------
function quitarSombra() {
  //desabilitar input advinar pokemon quitar sombra
  const escenario_1 = document.getElementById("escenario-1");
  escenario_1.hidden = true;
}
// ---------------------------------------------------------------------------------------------------------------------------
function ponerOpciones(namePoke) {
  //añadir opciones
  const escenario_2 = document.getElementById("escenario-2");
  escenario_2.hidden = false;

  const op1 = document.getElementById("op1");
  const op2 = document.getElementById("op2");
  const op3 = document.getElementById("op3");

  const opA = sessionStorage.getItem("pokemonAdivinar2");
  const opB = sessionStorage.getItem("pokemonAdivinar3");
  const opC = namePoke;

  //Funciona pero no me gusta
  var numeros = [opA, opB, opC];

  numerosDesordenados = []; // array vacio

  for (i = 0; i < 3; i++) {
    //creo bucle para llenar array vacío
    x = desordenar(numeros);
    numerosDesordenados[i] = x;
    //console.log(i, x);
  }

  //console.log(numerosDesordenados);
  op1.innerText = numerosDesordenados[2][0];
  op2.innerText = numerosDesordenados[2][1];
  op3.innerText = numerosDesordenados[2][2];
}
// ---------------------------------------------------------------------------------------------------------------------------
//desordenar array para que se cambie la opcion correcta
function desordenar(unArray) {
  var t = unArray.sort(function (a, b) {
    return Math.random() - 0.5;
  });

  return [...t];
} // esta función me desordena un array
// ---------------------------------------------------------------------------------------------------------------------------
// function name(params) {
const aumentarPokemon = document.getElementById("aumentarPokemon");
aumentarPokemon.onclick = (e) => {
  let actual = localStorage.getItem("numPoke");

  localStorage.setItem("numPoke", Number(actual) + 1000);
};
// ---------------------------------------------------------------------------------------------------------------------------

const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");

op1.onclick = (e) => {
  e.preventDefault();
  //console.log("Me hiciste clic", op1.textContent);
  isCorrect(op1.textContent);
};

op2.onclick = (e) => {
  e.preventDefault();
  //console.log("Me hiciste clic", op2.textContent);
  isCorrect(op2.textContent);
};

op3.onclick = (e) => {
  e.preventDefault();
  //console.log("Me hiciste clic", op3.textContent);
  isCorrect(op3.textContent);
};
// ---------------------------------------------------------------------------------------------------------------------------

//eliminar poke poner a win o lose

function elimiarPokeByWin() {
  const pokeMio = document.getElementById("imagenPoke");
  pokeMio.remove();

  const pathGif = "gif/ok" + getRandomInt(3) + ".gif";

  const imagen = document.createElement("img");
  imagen.src = pathGif;
  imagen.width = 300;
  imagen.height = 300;
  imagen.id = "imagenPoke";
  document.getElementById("pokemones").append(imagen);
}

function elimiarPokeByLose() {
  const pokeMio = document.getElementById("imagenPoke");
  pokeMio.remove();

  const pathGif = "gif/error" + getRandomInt(3) + ".gif";

  const imagen = document.createElement("img");
  imagen.src = pathGif;
  imagen.width = 300;
  imagen.height = 300;
  imagen.id = "imagenPoke";
  document.getElementById("pokemones").append(imagen);
}

// eventos para disminuior el numero de vidas
// como voy a  saber cual es el poke correcto???

const op1Evento = document.getElementById("op1");
const vidas = document.getElementById("vidas");
const intentosOK = document.getElementById("intentosOK");

op1Evento.addEventListener("click", function () {
  //console.log(vidas.textContent);
  // buscar los numeros en la cadeena de string y restarle 1
  disminuirVida(false, op1Evento.textContent);

  mostrarContadorEnOpcion(op1Evento);
  desabilitarBotenes(op3Evento, op2Evento, "null", botonSkipEvento);
});

const op2Evento = document.getElementById("op2");

op2Evento.addEventListener("click", function () {
  //console.log(vidas.textContent);
  // buscar los numeros en la cadeena de string y restarle 1
  disminuirVida(false, op2Evento.textContent);
  mostrarContadorEnOpcion(op2Evento);
  desabilitarBotenes(op1Evento, op3Evento, "null", botonSkipEvento);
});

const op3Evento = document.getElementById("op3");

op3Evento.addEventListener("click", function () {
  //console.log(vidas.textContent);
  // buscar los numeros en la cadeena de string y restarle 1
  disminuirVida(false, op3Evento.textContent);
  mostrarContadorEnOpcion(op3Evento);

  desabilitarBotenes(op1Evento, op2Evento, "null", botonSkipEvento);
});

function desabilitarBotenes(params, params1, params3, params4, estado = true) {
  params.disabled = estado;
  params1.disabled = estado;
  params3.disabled = estado;
  params4.disabled = estado;
  document.getElementById("pokemonIngresado").value = "";
  botonAdivinar.innerText = "Adivinar Pokemon";
}

//solo va a ser verdaddero si adivina con el nombre al inicio...
function disminuirVida(normal, valorBoton) {
  let okpoke =
    sessionStorage.getItem("pokemonAdivinar") == valorBoton ? true : false;
  if (!okpoke) {
    let stringWithNumbers = vidas.textContent.replace(/[^0-9]+/g, "") - 1;
    let mesnsaje = "Vidas(" + stringWithNumbers + ")";
    if (!stringWithNumbers == 0) {
      vidas.innerText = mesnsaje;
    } else {
      alert("Perdiste todas tus vidas, se reiniciar el juego");
      window.location.reload();
    }
  } else {
    aumentarCorrectas();
  }
}

function aumentarCorrectas() {
  let stringWithNumbers = intentosOK.textContent.replace(/[^0-9]+/g, "");
  ++stringWithNumbers;
  let mesnsaje = "Correctas(" + stringWithNumbers + ")";
  intentosOK.innerText = mesnsaje;
}



function aumentarVida(aumentar=true) {
  if (aumentar) {
    let stringWithNumbers = vidas.textContent.replace(/[^0-9]+/g, "");
    ++stringWithNumbers;
    let mesnsaje = "Vidas(" + stringWithNumbers + ")";
    vidas.innerText = mesnsaje;
    mostrarContadorEnOpcion(botonAdivinar);
    desabilitarBotenes(op1Evento, op2Evento, "null", botonSkipEvento);
    aumentarCorrectas();
  }

}

function mostrarContadorEnOpcion(opcionX) {
  for (var index = 1; index < 4; index++) {
    //f(x)=6-x para invertir el tiempo
    let tiempo = 4 - index;
    setTimeout(function () {
      let mensaje = "Siguiente en " + tiempo + " seg";
      opcionX.innerText = mensaje;
    }, index * 1000);
  }

  setTimeout(function () {
    siguintePOke();
  }, 4000);
}
// ---------------------------------------------------------------------------------------------------------------------------
// eventos para aumentar el numero de vidas
const botonSkipEvento = document.getElementById("refresh");
const intentosSkip = document.getElementById("intentosSkip");

botonSkipEvento.onclick = (e) => {
  e.preventDefault();
  clickPasaPasar(true);
};

function clickPasaPasar(condition) {
  if (condition) {
    const intentosSkip1 = document.getElementById("intentosSkip");
    //console.log(intentosSkip1.textContent);
    // buscar los numeros en la cadeena de string y restarle 1
    let stringWithNumbers = intentosSkip1.textContent.replace(/[^0-9]+/g, "");
    //console.log(intentosSkip1.stringWithNumbers);
    ++stringWithNumbers;
    let mesnsaje = "skipeadas(" + stringWithNumbers + ")";
    intentosSkip1.innerText = mesnsaje;
  }
}
// ---------------------------------------------------------------------------------------------------------------------------
// evento para detemianr azarozamente el numero de pokemones
const aumentarNumeroPokemon = document.getElementById("aumentarPokemon");
const setTextNumero = "N° pokemones(" + sessionStorage.getItem("numPoke") + ")";
aumentarNumeroPokemon.textContent = setTextNumero;

// validar que cuando llega a cero, se acabe el juego
