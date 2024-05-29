document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    fetch('/api/items/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price, quantity })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadItems();
    })
    .catch(error => console.error('Error:', error));
});

function loadItems() {
    fetch('/api/items')
        .then(response => response.json())
        .then(items => {
            const itemsList = document.getElementById('itemsList');
            itemsList.innerHTML = '';
            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.innerHTML = `
                    <strong>${item.name}</strong> - ${item.description} - $${item.price} - Quantity: ${item.quantity}
                    <button onclick="buyItem(${item.id}, 1)">Buy 1</button>
                    <button onclick="buyItem(${item.id}, 2)">Buy 2</button>
                    <button onclick="buyItem(${item.id}, 3)">Buy 3</button>
                `;
                itemsList.appendChild(itemDiv);
            });
        });
}

function buyItem(id, quantity) {
    fetch(`/api/items/buy/${id}/${quantity}`, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadItems();
    })
    .catch(error => console.error('Error:', error));
}
loadItems();