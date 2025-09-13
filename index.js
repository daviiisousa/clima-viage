const form = document.getElementById("formulario");

async function buscarCClima(event) {
  const cidade = document.getElementById("cidade").value;

  const apiKey = "3da709d7b1481d16e6aece8ac4e010ee"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
  event.preventDefault();

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (resposta.ok) {
      console.log(dados);
      const temp = dados.main.temp;
      const descricao = dados.weather[0].description;
      const umidade = dados.main.humidity;
      const F = (temp * 9) / 5 + 32;

      document.getElementById("resultado").innerHTML = `
           <div class="resultado-clima">
                <h2 class="nomeCidade">Clima em ${cidade}</h2>
                <div class="pais">
                  <p class="temperatura"> ${temp}°C</p>
                  <p class="temperatura"> ${F.toFixed(2)}°F</p>
                </div>
                <div class="minmax">
                    <p>${dados.main.temp_max}°C</p>
                    <p>${dados.main.temp_min}°C</p>
                </div>
                
                
                <div class="infoAdicional">
                    <div class="card">
                        <p><strong>Sensaçao:</strong> ${
                          dados.main.feels_like
                        }°C</p>
                    </div>
                    <div class="card">
                        <p><strong>Umidade:</strong> ${umidade}%</p>
                    </div>
                    <div class="card">
                    <p><strong>Descricao do clima:</strong> ${descricao}</p>
                    </div>
                </div>
           </div>
          `;

      document.getElementById("ticket").style.display = "block";

      document.getElementById("ticket").innerHTML = `
      <div class="nomeCidadeTicket">
            <span class="material-symbols-outlined">
        plane_contrails
        </span>
      <h2 >Ticket de ${cidade}</h2>
      </div>
      <p class="paisTicket">${dados.sys.country}</p>
          <p class="numeroTicket">Nº do Ticket: ${Math.floor(
            Math.random() * 1000000
          )}</p>
          <div class="infoClimaTicket">
            <div>
                <p><strong>A temperatura vai estar:</strong> ${temp}°C</p>
          <p><strong>A temperatura mínima vai estar:</strong> ${
            dados.main.temp_min
          }°C</p>
            <p><strong>A temperatura máxima vai estar:</strong> ${
              dados.main.temp_max
            }°C</p>
            </div>
            <div>
                <p><strong>Sua classe:</strong> 1º Classe</p>
          <p><strong>Descrição:</strong> ${descricao}</p>
          <p><strong>Umidade:</strong> ${umidade}%</p>
            </div>
          </div>

          <div class="bordaDesh"></div>
          <a class="link-ticket" href="https://www.voegol.com.br/nh/?gclid=040f01d76adc13d090206912dca3b50f&gclsrc=3p.ds&msclkid=040f01d76adc13d090206912dca3b50f&utm_source=bing&utm_medium=cpc&utm_campaign=vnacp0006_alp_gol_varejo-nac_bing-search_conv_vend_cpc_pass_brand_termos-gol&utm_term=companhia%20aerea%20gol&utm_content=gosh02159al_cpc_rede-de-pesquisa_texto_companhia" target="_blank">Seu ticket foi gerado com sucesso!</a>
        `;
    } else {
      document.getElementById(
        "resultado"
      ).innerHTML = `<p class="error">Erro: ${dados.message}</p>`;
    }
  } catch (erro) {
    console.error("Erro ao buscar clima:", erro);
  }
}

form.addEventListener("submit", buscarCClima);
