function addRow() {
    const itemVal = document.getElementById('item-box').value;
    const qtyInput = document.getElementById('quantity-box').value;
    const priceInput = document.getElementById('price-box').value;

    const qtyNum = Number(qtyInput);
    const priceNum = Number(priceInput);

    const rowObj = {};

    if (itemVal.trim() !== "") {
        rowObj.item = itemVal;
    }

    rowObj.quantity = qtyNum;
    rowObj.price = priceNum;
    
    
    rowObj.line = qtyNum * priceNum;
    rowObj.note = priceInput + qtyInput;

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

    let totalSum = 0;
    const lastRow = rows[rows.length - 1];

    rows.forEach(r => {
        const tr = document.createElement('tr');

        const tdItem = document.createElement('td');
        tdItem.textContent = r.item !== undefined ? r.item : undefined;

        const tdQty = document.createElement('td');
        tdQty.textContent = r.quantity;

        const tdPrice = document.createElement('td');
        tdPrice.textContent = r.price;

        const tdLine = document.createElement('td');
        tdLine.textContent = r.line;

        const tdNote = document.createElement('td');
        tdNote.textContent = r.note;

        tr.appendChild(tdItem);
        tr.appendChild(tdQty);
        tr.appendChild(tdPrice);
        tr.appendChild(tdLine);
        tr.appendChild(tdNote);

        tbody.appendChild(tr);

        // A NaN line is left out of total
        if (!isNaN(r.line)) {
            totalSum += r.line;
        }
    });

    document.getElementById('total-val').textContent = totalSum;
    document.getElementById('total-kind').textContent = typeof totalSum;

    if (lastRow) {
        document.getElementById('note-kind').textContent = typeof lastRow.note;

        const rawPriceText = lastRow.note.replace(String(lastRow.quantity), '');
        const priceAsNumber = lastRow.price;

        document.getElementById('match-val').textContent = (rawPriceText == priceAsNumber);
        document.getElementById('strict-match-val').textContent = (rawPriceText === priceAsNumber);

        if (isNaN(lastRow.line)) {
            document.getElementById('nan-kind').textContent = typeof lastRow.line;
        } else {
            document.getElementById('nan-kind').textContent = "Not NaN";
        }
    }
}