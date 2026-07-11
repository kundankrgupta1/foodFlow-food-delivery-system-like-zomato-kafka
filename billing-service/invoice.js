export function generateInvoice(order) {
    const items = order?.items || [];
    const invoiceNo = 'INV-001';
    const date = order?.date || '2026-07-08';
    const customer = order?.customerName || 'Walk-in Customer';

    const headers = ['Sr.', 'Item Name', 'Qty.', 'Unit Price', 'Amount'];
    const rows = items.map((item, index) => {
        const amount = item.quantity * item.price;
        return [
            String(index + 1),
            item.name,
            String(item.quantity),
            String(item.price),
            String(amount)
        ];
    });

    const widths = headers.map((header, i) => Math.max(header.length, ...rows.map(row => row[i].length)));

    const formatRow = (row) => row.map((cell, i) => cell.padEnd(widths[i])).join(' | ');

    const line = widths.map(w => '-'.repeat(w)).join('-+-');
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    console.log('INVOICE');
    console.log(`Invoice No : ${invoiceNo}`);
    console.log(`Date       : ${date}`);
    console.log(`Customer   : ${customer}`);
    console.log('');
    console.log(formatRow(headers));
    console.log(line);
    rows.forEach(row => console.log(formatRow(row)));
    console.log(line);
    console.log(`Subtotal   : ${subtotal}`);
    console.log(`Grand Total : ${subtotal}`);
}