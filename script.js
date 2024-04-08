var selectRow = null;

//Mostrar alertas
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main =    document.querySelector(".main");
    container.insertBefore(div, main);  //Insertamos antes

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

//Limpar todos os campos
function clearFields(){
    document.querySelector("firstName").value = "";
    document.querySelector("rollNo").value = "";
    document.querySelector("idade").value = "";
}

//Add dados
// Add dados
document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    const cpf = document.querySelector("#rollNo").value;
    const idade = document.querySelector("#idade").value;

    // Validação
    if(firstName == "" ||  cpf == "" || idade == "") {
        showAlert("Por favor preencha todos os campos.", "danger");
    }
    else {
        if(selectRow == null) {
            const list = document.querySelector("#students-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${cpf}</td>
            <td>${idade}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
                <a href="#" class="btn btn-danger btn-sm delete">Deletar</a>                  
            `;

            list.appendChild(row);
            selectRow = null;
            showAlert("Pessoa adicionada", "success");
        }
        else {
            selectRow.children[0].textContent = firstName;
            selectRow.children[1].textContent = cpf;
            selectRow.children[2].textContent = idade;
            selectRow = null;
            showAlert("Pessoa Editada", "info");
        }
        clearFields();
    }
});


//Editar dados

document.querySelector("#students-list").addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("edit")) {

        let selectRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectRow.children[0].textContent;
        document.querySelector("#rollNo").value = selectRow.children[1].textContent;
        document.querySelector("#idade").value = selectRow.children[2].textContent;

    }
});



//Deletar Dados
document.querySelector("#students-list").addEventListener("click",(e) =>{
    target = e.target
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
        showAlert("Dados deletados", "danger");
    }
})