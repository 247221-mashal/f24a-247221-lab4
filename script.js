const rows = [];

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
        tdItem.textContent = r.item !== undefined ? r.item : "undefined";

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

function processTill() {
    const billVal = Number(document.getElementById('bill-box').value);
    const paidInput = document.getElementById('paid-box').value;

    let paidVal;

    if (paidInput.trim() === "") {
        paidVal = null;
    } else {
        paidVal = Number(paidInput);
    }

    const resDiv = document.getElementById('result-area');
    if (!resDiv) return;

    if (paidVal === null) {
        resDiv.innerHTML = `
            <p><strong>Paid Value:</strong> null</p>
            <p><strong>Kind of Paid:</strong> ${typeof paidVal}</p>
            <p><strong>Still Owed:</strong> ${billVal}</p>
        `;
        return;
    }

    const changeResult = calculateChange(billVal, paidVal);

    if (paidVal < billVal) {
        resDiv.innerHTML = `<p><strong>Still Owed:</strong> ${billVal - paidVal}</p>`;
    } else {
        resDiv.innerHTML = `
            <p><strong>Change:</strong> ${changeResult}</p>
            <p><strong>Half of Change:</strong> ${changeResult / 2}</p>
        `;
    }
}

function calculateChange(bill, paid) {
    if (paid === null) return 0;
    return paid - bill;
}

const people = [
    { name: "Initial Customer" }
];

function addPerson(status) {
    const nameInput = document.getElementById('person-name').value;
    if (nameInput.trim() !== "") {
        people.push({
            name: nameInput,
            isIn: status
        });
        document.getElementById('person-name').value = '';
        renderPeople();
    }
}

function renderPeople() {
    const tbody = document.getElementById('people-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    let countIn = 0;

    people.forEach(p => {
        const tr = document.createElement('tr');

        const personName = p.name;
        const personStatus = p.isIn;

        const tdName = document.createElement('td');
        tdName.textContent = personName;

        const tdStatus = document.createElement('td');
        tdStatus.textContent = personStatus !== undefined ? personStatus : "undefined";

        tr.appendChild(tdName);
        tr.appendChild(tdStatus);
        tbody.appendChild(tr);

        if (personStatus === true) {
            countIn++;
        }
    });

    const countElem = document.getElementById('in-count');
    if (countElem) countElem.textContent = countIn;
}

document.addEventListener("DOMContentLoaded", () => {
    renderPeople();
    renderTable();
});