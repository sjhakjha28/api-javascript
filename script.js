let apikey = {
    key: '88213927-a63e-4ffe-8137-f78a56972ace'
}

fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' + apikey.key)
    .then((response) => {
        if (!response.ok) throw new Error('Erro ao executar a requesição, status ' + response.status);
        return response.json();
    }).then((api) => {
        let texto = "";
        let dataBitcoin;
        for (let i = 0; i < 10; i++) {
            dataBitcoin = (api.data[i].first_historical_data).split('T');
            dataBitcoin[1] = dataBitcoin[1].split('.')
            let data = formataData(dataBitcoin[0])
            texto = texto + `
            <div class="card border-success">
                <h5 class="card-header">${api.data[i].name}</h5>
                <div class="card-body">
                    <h5 class="card-title">Sigla: ${api.data[i].symbol}
                    </h5>
                    <img src="img/frente.png">
                    <p class="card-text">Data: ${data}</p>
                    <p class="card-text">Hora: ${dataBitcoin[1][0]}</p>
                </div>
            </div>`

            document.getElementById("coins").innerHTML = texto;
        }
    })
    .catch((error) => {
        console.error(error.message);
    });

function formataData(data) {
    data = data.split('-')
    let novaData = `${data[2]}/${data[1]}/${data[0]}`
    return novaData
}