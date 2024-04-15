document.addEventListener("DOMContentLoaded", function() {
    const produitSelect = document.getElementById("produit");
    const nouveauProduitInput = document.getElementById("nouveauProduit");
    const ajouterProduitBtn = document.getElementById("ajouterProduit");
    const prixInput = document.getElementById("prix");
    const quantiteInput = document.getElementById("quantite");
    const ajouterTransactionBtn = document.getElementById("ajouterTransaction");
    const tableauTransactions = document.getElementById("tableauTransactions");
    const totalPrixSpan = document.getElementById("totalPrix");
    const nombreTransactionsSpan = document.getElementById("nombreTransactions");
    let transactions = [];

    ajouterProduitBtn.addEventListener("click", function() {
        const nouveauProduit = nouveauProduitInput.value.trim();
        if (nouveauProduit !== "") {
            const option = document.createElement("option");
            option.textContent = nouveauProduit;
            produitSelect.appendChild(option);
            nouveauProduitInput.value = ""; 
        }
    });

    ajouterTransactionBtn.addEventListener("click", function() {
        const produit = produitSelect.value;
        const prix = parseFloat(prixInput.value);
        const quantite = parseInt(quantiteInput.value);
        
        if (produit && !isNaN(prix) && !isNaN(quantite) && prix > 0 && quantite > 0) {
            const total = prix * quantite;
            const transaction = { produit, prix, quantite, total };
            transactions.push(transaction);
            afficherTransactions();
            calculerTotalPrix();
            nombreTransactionsSpan.textContent = transactions.length;
            prixInput.value = "";
            quantiteInput.value = "";
        } else {
            alert("Veuillez remplir tous les champs avec des valeurs valides.");
        }
    });

    function afficherTransactions() {
        tableauTransactions.innerHTML = "";
        transactions.forEach(transaction => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.produit}</td>
                <td>${transaction.prix}</td>
                <td>${transaction.quantite}</td>
                <td>${transaction.total}</td>
            `;
            tableauTransactions.appendChild(row);
        });
    }

    function calculerTotalPrix() {
        const total = transactions.reduce((acc, transaction) => acc + transaction.total, 0);
        totalPrixSpan.textContent = total.toFixed(2); 
    }
});
