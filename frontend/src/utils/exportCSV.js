import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportData = (data, filename, type) => {

    if (!data.length) return;

    if (type === "csv") {

        const headers = Object.keys(data[0]);
        const rows = data.map(row => headers.map(h => row[h]));

        const csv = [headers, ...rows].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.csv`;
        a.click();

    }

    if (type === "excel") {

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        XLSX.writeFile(workbook, `${filename}.xlsx`);

    }

    if (type === "pdf") {

        const doc = new jsPDF();

        const headers = [Object.keys(data[0])];
        const rows = data.map(obj => Object.values(obj));

        autoTable(doc, {
            head: headers,
            body: rows
        });

        doc.save(`${filename}.pdf`);

    }

};