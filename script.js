const rows = [];
function addRow() {
    const itemVal = document.getElementById('item-box').value;
    const qtyInput = document.getElementById('quantity-box').value;
    const priceInput = document.getElementById('price-box').value;

    const qtyNum = Number(qtyInput);
    const priceNum = Number(priceInput);

    const rowObj = {
        item: itemVal,
        quantity: qtyNum,
        price: priceNum,
        line: qtyNum * priceNum,            
        note: priceInput + qtyInput         
    };

    rows.push(rowObj);

    
    document.getElementById('item-box').value = '';
    document.getElementById('quantity-box').value = '';
    document.getElementById('price-box').value = '';

    
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    rows.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.item}</td>
            <td>${r.quantity}</td>
            <td>${r.price}</td>
            <td>${r.line}</td>
            <td>${r.note}</td>
        `;
        tbody.appendChild(tr);
    });
}