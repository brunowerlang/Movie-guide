let nomeFilmeRef = document.getElementById("nome-filme");
let procurarBtn = document.getElementById("procurar-btn");
let resultado = document.getElementById("result");
let sugestoesBox = document.getElementById("suggestions-box");
const key = "c63e2f82"


let pegarFilme = () => {
    let nomeFilme = nomeFilmeRef.value;
    let url = `https://www.omdbapi.com/?t=${nomeFilme}&apikey=${key}`;

    //Se o input estiver vazio

    if (nomeFilme.length <= 0) {
        resultado.innerHTML = `<h3 class="msg">Por favor digite o nome do filme...</h3>`;
    }

    //Se o input for não estiver vazio
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //Se o filme existe no database
            if (data.Response == "True") {
                resultado.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="classificação">
                                <span class="material-symbols-outlined">
                                star
                                </span>
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="detalhes">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genero">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Sinopse:</h3>
                    <p>${data.Plot}</p>
                    <h3>Elenco:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            //Se o filme não estiver no database
            else {
                resultado.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            //Se um erro ocorrer
            .catch(() => {
                resultado.innerHTML = `<h3 class="msg">Ocorreu um Erro</h3>`;
            });
    }
};

let obterSugestoes = () => {
    let nomeFilme = nomeFilmeRef.value;
  
    //Se o input estiver vazio, limpar sugestões
    if (nomeFilme.length <= 0) {
      sugestoesBox.innerHTML = "";
      return;
    }
  
    let url = `https://www.omdbapi.com/?s=${nomeFilme}&apikey=${key}`;
  
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Search) {
          sugestoesBox.innerHTML = "";
          data.Search.forEach((filme) => {
            sugestoesBox.innerHTML += `
              <div class="sugestao" onclick="selecionarFilme('${filme.Title}')">
                <img src="${filme.Poster}">
                <span>${filme.Title}</span>
              </div>
            `;
          });
        } else {
          sugestoesBox.innerHTML = "";
        }
      })
      .catch(() => {
        sugestoesBox.innerHTML = "";
      });
  };
  
let selecionarFilme = (nomeFilme) => {
    nomeFilmeRef.value = nomeFilme;
    sugestoesBox.innerHTML = "";
};
  
nomeFilmeRef.addEventListener("keyup", obterSugestoes);

procurarBtn.addEventListener("click", pegarFilme);
nomeFilmeRef.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      pegarFilme(); 
    }
  });
window.addEventListener("load", pegarFilme);

