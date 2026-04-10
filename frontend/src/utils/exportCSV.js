import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportData = (data, filename, type) => {

    if (!data.length) return;

    const formattedData = data.map(row => {
        const newRow = {};

        for (const key in row) {

            let value = row[key];

            if (value) {

                const date = new Date(value);

                if (!isNaN(date)) {
                    value = date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    });
                }
            }
            newRow[key] = value;
        }
        return newRow;
    });
    
    if (type === "csv") {

        const headers = Object.keys(formattedData[0]);
        const rows = formattedData.map(row => headers.map(h => row[h]));

        const csv = [headers, ...rows].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.csv`;
        a.click();

    }

    if (type === "excel") {

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        XLSX.writeFile(workbook, `${filename}.xlsx`);

    }

    if (type === "pdf") {

        const doc = new jsPDF();

        const headers = [Object.keys(formattedData[0])];
        const rows = formattedData.map(obj => Object.values(obj));

        autoTable(doc, {
            head: headers,
            body: rows
        });

        doc.save(`${filename}.pdf`);

    }

};