const app = document.getElementById('app');

const loginDom = `
    <div id="container">
        <div id="card-login">
            <h1>Login</h1>
                <p id="message"></p>
                <input type="number" min=0 minlength="10" name="carte" placeholder="carte">
                <input type="password" minlength="4" maxlength="4" name="pin" placeholder="pin"><br>
                <button id="submit" type="submit">Login</button>
            
        </div>
    </div>
`;

const menuDom =  `
    <div id="container">
        <div id="menu">
            <h1>Menu</h1>
            <div id="grid-menu">
                <div id="solde">Solde</div>
                <div id="historique">Historique</div>
                <div id="depot">Depôt</div>
                <div id="retrait">Retrait</div>
            </div>
            <button id="logout-btn">Logout</button>
        </div>
    </div>
`;

const retraitDom = `
    <div id="container">
        <div id="card-solde">
            <h1>Retrait</h1>
            <p id="message"></p>
            <input type="text" name="montant"><br>
            <button id="submit">Valider</button>
            <button id="logout-btn">Logout</button>
            <button id="menu-btn">Menu</button>
        </div>
    </div>
`;

const soldeDom = `
    <div id="container">
        <div id="card-solde">
            <h1>Solde</h1>
            <p><span id="solde-span">${sessionStorage.getItem("solde") || 0}</span><span>CFA</span></p>
            <button id="logout-btn">Logout</button>
            <button id="menu-btn">Menu</button>
        </div>
    </div>
`;

const depotDom = `
    <div id="container">
        <div id="card-solde">
            <h1>Depôt</h1>
            <p id="message"></p>
            <input type="text" name="montant"><br>
            <button id="submit">Valider</button>
            <button id="logout-btn">Logout</button>
            <button id="menu-btn">Menu</button>
        </div>
    </div>
`;

const historiqueDom = `
    <div id="container">
        <div id="card-solde">
            <h1>Historique</h1>
            <div id="result"></div>
            <div id="historiqueLst"></div>
            <label>Date de début:<input type="date" name="dateDebut"></label><br/>
            <label>Date de fin:<input type="date" name="dateFin"></label><br>
            <button id="submit" type="submit">Valider</button>
            <button id="logout-btn">Logout</button>
            <button id="menu-btn">Menu</button>
        </div>
    </div>
`;

async function logout(){
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("connected")
    app.innerHTML = loginDom;
    await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({action: "Logout"})
    });
    location.reload()
}

function navigate(dom, page){
    app.innerHTML = dom;
    sessionStorage.setItem("page", page);
    location.reload()
}

document.addEventListener("DOMContentLoaded", (event)=>{
    if(!sessionStorage.getItem("connected")){
        app.innerHTML = loginDom;
    }else{
        switch (sessionStorage.getItem("page")) {
            case "Menu":
                app.innerHTML = menuDom;
                break;
            case "Solde":
                app.innerHTML = soldeDom;
                break;
            case "Depot":
                app.innerHTML = depotDom;
                break;
            case "Retrait":
                app.innerHTML = retraitDom;
                break;
            case "Historique":
                app.innerHTML = historiqueDom;
                break;
            default:
                app.innerHTML = loginDom;
                break;
        }
    }

    const result = document.getElementById("result");
    const historiqueLst = document.getElementById("historiqueLst");
    const soldeSpan = document.getElementById("solde-span");
    const menuBtn = document.getElementById("menu-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const historique = document.getElementById("historique")
    const retrait = document.getElementById("retrait")
    const solde = document.getElementById("solde")
    const depot = document.getElementById("depot")
    const submit = document.getElementById("submit")

    if(logoutBtn){
        logoutBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            await logout();
        });
    }

    if(historique){
        historique.addEventListener('click', (event) => {
            event.preventDefault();
            navigate(historiqueDom, "Historique");
        });
    }

    if(menuBtn){
        menuBtn.addEventListener('click', (event) => {
            event.preventDefault();
            navigate(menuDom, "Menu");
        });
    }

    if(depot){
        depot.addEventListener('click', (event) => {
            event.preventDefault();
            navigate(depotDom, "Depot");
        });
    }

    if(retrait){
        retrait.addEventListener('click', (event) => {
            event.preventDefault();
            navigate(retraitDom, "Retrait");
        });
    }

    if(solde) {
        solde.addEventListener('click', async (event) => {
            event.preventDefault();
            app.innerHTML = soldeDom;
            sessionStorage.setItem("page", "Solde");
            try {
                const response = await fetch('http://localhost:3000', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({action: sessionStorage.getItem("page")})
                });
                const responseJson = await response.json();
                
                sessionStorage.setItem("solde", responseJson.data);
                
                location.reload()
            }catch(error) {
                await logout();
            }
        })
    }

    if(submit){
        submit.addEventListener('click', async (event) => {
            event.preventDefault()
            const inputs = document.getElementsByTagName('input');
            let obj;
            let data = []
            for (const input of inputs) {
                data.push(input.value)
            }
    
            switch (sessionStorage.getItem("page")) {
                case "Depot":
                case "Retrait":
                    obj = {montant: data[0]}
                    break;
                case "Historique":
                    obj = {dateDebut: data[0], dateFin: data[1]}
                    break;
                case "Login":
                default:
                    obj = {carte: data[0], pin: data[1]};
                    break;
            }
            
            obj.action = sessionStorage.getItem("page") ?? "Login";

            try {
                const response = await fetch('http://localhost:3000', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(obj),
                })
    
                const responseJson = await response.json();
                if (response.status != 200) {
                    message.innerText = responseJson.message;
                }else{
                    switch (sessionStorage.getItem("page")) {
                        case "Historique":
                            console.log(responseJson)
                            result.innerText = responseJson.data.length == 0 ? "Aucune transaction" : responseJson.message;
                            let html = "";
                            for(let transaction of responseJson.data){
                                console.log(transaction)
                                html += `
                                    <p>Transaction: ${transaction.type}<br> 
                                    Date: ${transaction.date}<br> 
                                    ${transaction.type == "Depot" || transaction.type == "Retrait" ? "Montant: "+transaction.montant : ""}</p>`
                            }
                            historiqueLst.innerHTML = html;
                            break;
                        case "Depot":
                        case "Retrait":
                            message.innerText = responseJson.message;
                            break;
                        case "Login":
                        default:
                            sessionStorage.setItem("connected", true);
                            navigate(menuDom, "Menu");
                            setTimeout(
                                async () => {
                                    await logout();
                                },
                                600000*5
                            )
                            break;
                    }
                }
            } catch (error) {
                console.log(error.message)
                await logout();
            }
        })
    }
})