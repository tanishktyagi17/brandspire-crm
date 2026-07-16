import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ===========================================================
   BRANDSPIRE PDF GENERATOR
   Production Ready Version
=========================================================== */

/* ===========================================================
   COMPANY INFORMATION
=========================================================== */

const COMPANY = {
  name: "Brandspire",
  tagline: "Transforming Ideas into Digital Reality",

  address: "81/c, Rajbagh colony,Sahibabad",
  city: "Ghaziabad, Uttar Pradesh - 201005",

  phone: "+91 9319447795",
  email: "brandspire27@gmail.com",
  website: "www.brandspire.in",
  

  gstin: "GSTIN HERE",
  pan: "PAN HERE",

  bankName: "Your Bank",
  accountName: "Brandspire Technologies",
  accountNumber: "XXXXXXXXXXXX",
  ifsc: "XXXXXXXX",
  upi: "upi@bank",
};

/* ===========================================================
   BRAND COLORS
=========================================================== */

const COLORS = {
  blue: [37, 99, 235],
  purple: [124, 58, 237],

  primary: [37, 99, 235],

  dark: [15, 23, 42],
  text: [71, 85, 105],

  border: [226, 232, 240],

  light: [248, 250, 252],

  white: [255, 255, 255],

  success: [22, 163, 74],
  warning: [234, 179, 8],
  danger: [220, 38, 38],
};

/* ===========================================================
   PAGE CONSTANTS
=========================================================== */

const PAGE = {
  margin: 15,

  headerHeight: 34,

  footerHeight: 18,
};

/* ===========================================================
   MONEY FORMAT
=========================================================== */

const money = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/* ===========================================================
   VALUE FORMAT
=========================================================== */

const value = (v) =>
  v === undefined || v === null || v === ""
    ? "-"
    : String(v);

/* ===========================================================
   DATE FORMAT
=========================================================== */

function formatDate(date) {
  if (!date) return "-";

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

/* ===========================================================
   STATUS COLORS
=========================================================== */

function statusColor(status) {
  switch ((status || "").toLowerCase()) {
    case "paid":
      return COLORS.success;

    case "overdue":
      return COLORS.danger;

    default:
      return COLORS.warning;
  }
}

/* ===========================================================
   FONT HELPERS
=========================================================== */

function heading(doc, size = 12) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(size);
  doc.setTextColor(...COLORS.dark);
}

function normal(doc, size = 10) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(size);
  doc.setTextColor(...COLORS.text);
}

function divider(doc, y) {
  doc.setDrawColor(...COLORS.border);
  doc.line(
    PAGE.margin,
    y,
    doc.internal.pageSize.getWidth() - PAGE.margin,
    y
  );
}

/* ===========================================================
   ROUNDED CARD
=========================================================== */

function card(doc, x, y, w, h) {
  doc.setFillColor(...COLORS.light);

  doc.roundedRect(
    x,
    y,
    w,
    h,
    3,
    3,
    "F"
  );
}

/* ===========================================================
   LOGO LOADER
=========================================================== */

async function loadLogo() {
  try {
    const response = await fetch("/logo.png");

    const blob = await response.blob();

    return await new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () =>
        resolve(reader.result);

      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/* ===========================================================
   NUMBER TO WORDS
=========================================================== */

function amountInWords(amount) {
  return `Rupees ${money(amount)} Only`;
}

/* ===========================================================
   PAGE FOOTER
=========================================================== */

function drawFooter(doc) {
  const pages = doc.getNumberOfPages();

  const width = doc.internal.pageSize.getWidth();

  const height = doc.internal.pageSize.getHeight();

  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);

    doc.setDrawColor(...COLORS.border);

    doc.line(
      PAGE.margin,
      height - 15,
      width - PAGE.margin,
      height - 15
    );

    normal(doc, 8);

    doc.text(
      COMPANY.website,
      PAGE.margin,
      height - 8
    );

    doc.text(
      COMPANY.email,
      width / 2,
      height - 8,
      {
        align: "center",
      }
    );

    doc.text(
      `Page ${page} of ${pages}`,
      width - PAGE.margin,
      height - 8,
      {
        align: "right",
      }
    );
  }
}
/* ===========================================================
   PDF GENERATOR
=========================================================== */

export async function generateInvoicePDF(invoice) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = PAGE.margin;

  /* ===========================================================
     CALCULATIONS
  =========================================================== */

  const subtotal =
    invoice.subtotal ??
    (invoice.items || []).reduce(
      (sum, item) =>
        sum +
        Number(item.quantity || 0) *
          Number(item.price || 0),
      0
    );

  const gst = Number(invoice.gstAmount || 0);
  const discount = Number(invoice.discountAmount || 0);

  const total =
    invoice.total ??
    subtotal + gst - discount;

  /* ===========================================================
     LOAD LOGO
  =========================================================== */

  const logo = await loadLogo();

  /* ===========================================================
     HEADER BACKGROUND
  =========================================================== */

  doc.setFillColor(...COLORS.blue);
  doc.rect(0, 0, pageWidth, 36, "F");

  doc.setFillColor(...COLORS.purple);
  doc.rect(pageWidth - 70, 0, 70, 36, "F");

  /* ===========================================================
     LOGO
  =========================================================== */

  if (logo) {
    doc.addImage(
      logo,
      "PNG",
      margin,
      8,
      20,
      20
    );
  }

  /* ===========================================================
     COMPANY NAME
  =========================================================== */

  doc.setTextColor(255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);

  doc.text(
    COMPANY.name,
    42,
    16
  );

  doc.setFontSize(9);

  doc.setFont("helvetica", "normal");

  doc.text(
    COMPANY.tagline,
    42,
    23
  );

  /* ===========================================================
     INVOICE TITLE
  =========================================================== */

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);

  doc.text(
    "INVOICE",
    pageWidth - margin,
    16,
    {
      align: "right",
    }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    `Invoice # ${value(invoice.invoiceNumber)}`,
    pageWidth - margin,
    24,
    {
      align: "right",
    }
  );

  doc.text(
    formatDate(invoice.invoiceDate),
    pageWidth - margin,
    30,
    {
      align: "right",
    }
  );

  doc.setTextColor(0);

  /* ===========================================================
   COMPANY INFORMATION
=========================================================== */

let y = 48;

heading(doc, 12);
doc.text("Company Details", margin, y);

card(
  doc,
  margin,
  y + 4,
  82,
  52
);

normal(doc);

let cy = y + 12;

// Company Name
doc.text(String(COMPANY.name || "-"), margin + 5, cy);

cy += 6;

// Address
doc.text(String(COMPANY.address || "-"), margin + 5, cy);

cy += 6;

// City
doc.text(String(COMPANY.city || "-"), margin + 5, cy);

cy += 6;

// Phone
doc.text(`Phone: ${String(COMPANY.phone || "-")}`, margin + 5, cy);

cy += 6;

// Email
doc.text(`Email: ${String(COMPANY.email || "-")}`, margin + 5, cy);

cy += 6;

// Website
doc.text(`Website: ${String(COMPANY.website || "-")}`, margin + 5, cy);

  /* ===========================================================
     CUSTOMER CARD
  =========================================================== */

  const customerX = pageWidth - 90;

  heading(doc, 12);

  doc.text(
    "Bill To",
    customerX,
    y
  );

  card(
    doc,
    customerX,
    y + 4,
    75,
    60
  );

  normal(doc);

  let by = y + 12;

  doc.text(
    `Customer : ${value(invoice.customer?.name)}`,
    customerX + 5,
    by
  );

  by += 7;

  doc.text(
    `Project : ${value(invoice.customer?.project)}`,
    customerX + 5,
    by
  );

  by += 7;

  doc.text(
    `Email : ${value(invoice.customer?.email)}`,
    customerX + 5,
    by
  );

  by += 7;

  doc.text(
    `Phone : ${value(invoice.customer?.phone)}`,
    customerX + 5,
    by
  );

  by += 7;

  doc.text(
    `Status : ${value(invoice.status)}`,
    customerX + 5,
    by
  );

  /* ===========================================================
     STATUS BADGE
  =========================================================== */

  const badge = statusColor(invoice.status);

  doc.setFillColor(...badge);

  doc.roundedRect(
    pageWidth - 48,
    40,
    33,
    10,
    3,
    3,
    "F"
  );

  doc.setTextColor(255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);

  doc.text(
    value(invoice.status),
    pageWidth - 31,
    46.5,
    {
      align: "center",
    }
  );

  doc.setTextColor(0);

  /* ===========================================================
     INVOICE INFORMATION
  =========================================================== */

  const infoY = 120;

  divider(doc, infoY);

  heading(doc, 11);

  doc.text(
    "Invoice Date",
    margin,
    infoY + 8
  );

  doc.text(
    "Due Date",
    75,
    infoY + 8
  );

  doc.text(
    "Payment Terms",
    130,
    infoY + 8
  );

  normal(doc);

  doc.text(
    formatDate(invoice.invoiceDate),
    margin,
    infoY + 16
  );

  doc.text(
    formatDate(invoice.dueDate),
    75,
    infoY + 16
  );

  doc.text(
    value(invoice.paymentTerms),
    130,
    infoY + 16
  );

  /* ===========================================================
   ITEMS TABLE
=========================================================== */

const tableRows = (invoice.items || []).map((item, index) => {
  const qty = Number(item.quantity || 0);
  const price = Number(item.price || 0);
  const amount = qty * price;

  return [
    index + 1,
    value(item.description),
    qty,
    money(price),
    money(amount),
  ];
});

autoTable(doc, {
  startY: 140,

  head: [
    [
      "#",
      "Description",
      "Qty",
      "Unit Price",
      "Amount",
    ],
  ],

  body: tableRows,

  theme: "grid",

  margin: {
    left: margin,
    right: margin,
  },

  styles: {
    font: "helvetica",
    fontSize: 9,
    cellPadding: 4,
    lineColor: COLORS.border,
    lineWidth: 0.2,
    overflow: "linebreak",
    valign: "middle",
    textColor: COLORS.dark,
  },

  headStyles: {
    fillColor: COLORS.primary,
    textColor: 255,
    fontStyle: "bold",
    halign: "center",
    valign: "middle",
    fontSize: 10,
  },

  alternateRowStyles: {
    fillColor: [249, 250, 251],
  },

  columnStyles: {
    0: {
      cellWidth: 12,
      halign: "center",
    },

    1: {
      cellWidth: 78,
      halign: "left",
    },

    2: {
      cellWidth: 20,
      halign: "center",
    },

    3: {
      cellWidth: 35,
      halign: "right",
    },

    4: {
      cellWidth: 35,
      halign: "right",
      fontStyle: "bold",
    },
  },

  didDrawPage(data) {
    // Draw footer on every page
    

    // Draw header again on every page except first
    if (data.pageNumber > 1) {
      doc.setFillColor(...COLORS.blue);
      doc.rect(0, 0, pageWidth, 20, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(255);

      doc.text(
        COMPANY.name,
        margin,
        13
      );

      doc.setFontSize(18);

      doc.text(
        "INVOICE",
        pageWidth - margin,
        13,
        {
          align: "right",
        }
      );
    }
  },

  didParseCell(data) {
    if (
      data.section === "body" &&
      data.column.index === 1
    ) {
      data.cell.styles.minCellHeight = 12;
    }
  },
});

/* ===========================================================
   TABLE END POSITION
=========================================================== */

let currentY = doc.lastAutoTable.finalY + 12;
/* ===========================================================
   SUMMARY + PAYMENT SECTION
=========================================================== */

if (currentY > pageHeight - 95) {
  doc.addPage();
  currentY = 25;
}

const summaryWidth = 72;
const summaryX = pageWidth - summaryWidth - margin;

/* ---------- SUMMARY CARD ---------- */

doc.setFillColor(250, 250, 252);
doc.roundedRect(
  summaryX,
  currentY,
  summaryWidth,
  58,
  4,
  4,
  "F"
);

doc.setDrawColor(...COLORS.border);
doc.roundedRect(
  summaryX,
  currentY,
  summaryWidth,
  58,
  4,
  4
);

heading(doc, 12);

doc.text(
  "Invoice Summary",
  summaryX + 5,
  currentY + 8
);

normal(doc);

const summaryRows = [
  ["Subtotal", money(subtotal)],
  ["GST", money(gst)],
  ["Discount", money(discount)],
];

let sy = currentY + 18;

summaryRows.forEach(([label, amount]) => {
  doc.text(label, summaryX + 5, sy);

  doc.text(
    amount,
    summaryX + summaryWidth - 5,
    sy,
    {
      align: "right",
    }
  );

  sy += 8;
});

divider(doc, sy - 3);

doc.setFont("helvetica", "bold");
doc.setFontSize(11);

doc.text(
  "Grand Total",
  summaryX + 5,
  sy + 5
);

doc.text(
  money(total),
  summaryX + summaryWidth - 5,
  sy + 5,
  {
    align: "right",
  }
);

/* ===========================================================
   AMOUNT IN WORDS
=========================================================== */

normal(doc);

const words = amountInWords(total);

const wrappedWords = doc.splitTextToSize(
  words,
  summaryWidth - 10
);

doc.text(
  wrappedWords,
  summaryX + 5,
  sy + 14
);

/* ===========================================================
   PAYMENT CARD
=========================================================== */

const paymentWidth = 98;

doc.setFillColor(...COLORS.light);

doc.roundedRect(
  margin,
  currentY,
  paymentWidth,
  72,
  4,
  4,
  "F"
);

doc.setDrawColor(...COLORS.border);

doc.roundedRect(
  margin,
  currentY,
  paymentWidth,
  72,
  4,
  4
);

heading(doc);

doc.text(
  "Payment Details",
  margin + 5,
  currentY + 8
);

normal(doc);

const paymentInfo = [
  ["Bank", COMPANY.bankName],
  ["Account", COMPANY.accountName],
  ["Account No", COMPANY.accountNumber],
  ["IFSC", COMPANY.ifsc],
  ["UPI", COMPANY.upi],
];

let py = currentY + 18;

paymentInfo.forEach(([label, value]) => {
  doc.setFont("helvetica", "bold");

  doc.text(
    `${label}:`,
    margin + 5,
    py
  );

  doc.setFont("helvetica", "normal");

  doc.text(
    String(value),
    margin + 30,
    py
  );

  py += 9;
});

/* ===========================================================
   PAYMENT TERMS
=========================================================== */

doc.setFont("helvetica", "bold");

doc.text(
  "Payment Terms:",
  margin + 5,
  py + 2
);

doc.setFont("helvetica", "normal");

const paymentTerms = doc.splitTextToSize(
  value(invoice.paymentTerms),
  paymentWidth - 10
);

doc.text(
  paymentTerms,
  margin + 5,
  py + 10
);

currentY += 82;
/* ===========================================================
   NOTES SECTION
=========================================================== */

if (currentY > pageHeight - 110) {
  doc.addPage();
  currentY = 25;
}

heading(doc, 12);
doc.text("Notes", margin, currentY);

const notesText = value(invoice.notes);

const wrappedNotes = doc.splitTextToSize(
  notesText,
  pageWidth - (margin * 2) - 10
);

const notesHeight = Math.max(
  32,
  wrappedNotes.length * 5 + 12
);

doc.setFillColor(252,252,252);

doc.roundedRect(
  margin,
  currentY + 5,
  pageWidth - (margin * 2),
  notesHeight,
  4,
  4,
  "F"
);

doc.setDrawColor(...COLORS.border);

doc.roundedRect(
  margin,
  currentY + 5,
  pageWidth - (margin * 2),
  notesHeight,
  4,
  4
);

normal(doc);

doc.text(
  wrappedNotes,
  margin + 5,
  currentY + 14
);

currentY += notesHeight + 18;

/* ===========================================================
   TERMS & CONDITIONS
=========================================================== */

if (currentY > pageHeight - 90) {
  doc.addPage();
  currentY = 25;
}

heading(doc,12);

doc.text(
  "Terms & Conditions",
  margin,
  currentY
);

normal(doc);

const terms = [
  "• Payment must be completed according to the agreed payment terms.",
  "• Please mention the invoice number while making payment.",
  "• Goods and services once delivered are considered accepted.",
  "• Late payments may attract additional charges.",
  "• Thank you for choosing Brandspire Technologies."
];

let ty = currentY + 8;

terms.forEach((term)=>{
  doc.text(term, margin + 2, ty);
  ty += 6;
});

currentY = ty + 10;

/* ===========================================================
   SIGNATURE
=========================================================== */

if (currentY > pageHeight - 60) {
  doc.addPage();
  currentY = 25;
}

doc.setDrawColor(...COLORS.border);

doc.line(
  pageWidth - 75,
  currentY + 20,
  pageWidth - 20,
  currentY + 20
);

doc.setFont("helvetica","bold");
doc.setFontSize(10);

doc.text(
  "Authorized Signature",
  pageWidth - 47,
  currentY + 27,
  {
    align:"center"
  }
);

/* ===========================================================
   THANK YOU MESSAGE
=========================================================== */

doc.setTextColor(...COLORS.primary);

doc.setFont("helvetica","bold");
doc.setFontSize(18);

doc.text(
  "Thank You!",
  pageWidth / 2,
  currentY + 45,
  {
    align:"center"
  }
);

doc.setFont("helvetica","normal");
doc.setFontSize(10);

doc.text(
  "We appreciate your business and look forward to serving you again.",
  pageWidth / 2,
  currentY + 53,
  {
    align:"center"
  }
);

doc.setTextColor(0);

/* ===========================================================
   FOOTER
=========================================================== */

drawFooter(doc);

/* ===========================================================
   PDF METADATA
=========================================================== */

doc.setProperties({
  title: `Invoice ${value(invoice.invoiceNumber)}`,
  subject: "Brandspire Invoice",
  author: COMPANY.name,
  creator: "Brandspire CRM",
  keywords: "invoice, crm, brandspire, pdf",
});

/* ===========================================================
   SAVE PDF
=========================================================== */

const filename = `Invoice-${
  invoice.invoiceNumber || Date.now()
}.pdf`;

doc.save(filename);
}