import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Capacitor } from "@capacitor/core";

import {
  Directory,
  Filesystem,
} from "@capacitor/filesystem";

import { Share } from "@capacitor/share";

import { getCompany } from "../services/companyService";

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
   PAGE
=========================================================== */

const PAGE = {
  margin: 15,
};

/* ===========================================================
   FALLBACK COMPANY DATA
=========================================================== */

const DEFAULT_COMPANY = {
  companyName: "Brandspire",

  tagline:
    "Transforming Ideas into Digital Reality",

  address:
    "81/c, Rajbagh colony, Sahibabad",

  city:
    "Ghaziabad, Uttar Pradesh - 201005",

  phone: "+91 9319447795",

  email:
    "brandspire27@gmail.com",

  website:
    "www.brandspire.in",

  gstin: "",

  pan: "",

  currency: "INR",

  bankName: "",

  accountName: "",

  accountNumber: "",

  ifsc: "",

  branch: "",

  upi: "",

  logo: "",

  signature: "",
};

/* ===========================================================
   VALUE
=========================================================== */

const value = (data) => {
  if (
    data === undefined ||
    data === null ||
    data === ""
  ) {
    return "-";
  }

  return String(data);
};

/* ===========================================================
   MONEY
=========================================================== */

const money = (amount) => {
  return `Rs. ${Number(
    amount || 0
  ).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/* ===========================================================
   DATE
=========================================================== */

function formatDate(date) {
  if (!date) return "-";

  try {
    const parsed =
      new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return String(date);
    }

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  } catch {
    return String(date);
  }
}

/* ===========================================================
   STATUS COLOR
=========================================================== */

function statusColor(status) {
  switch (
    String(status || "")
      .toLowerCase()
  ) {
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

function heading(
  doc,
  size = 12
) {
  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(size);

  doc.setTextColor(
    ...COLORS.dark
  );
}

function normal(
  doc,
  size = 10
) {
  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(size);

  doc.setTextColor(
    ...COLORS.text
  );
}

function divider(
  doc,
  y
) {
  doc.setDrawColor(
    ...COLORS.border
  );

  doc.line(
    PAGE.margin,
    y,
    doc.internal.pageSize.getWidth() -
      PAGE.margin,
    y
  );
}

/* ===========================================================
   CARD
=========================================================== */

function card(
  doc,
  x,
  y,
  width,
  height
) {
  doc.setFillColor(
    ...COLORS.light
  );

  doc.roundedRect(
    x,
    y,
    width,
    height,
    3,
    3,
    "F"
  );
}

/* ===========================================================
   COMPANY SETTINGS
=========================================================== */

async function loadCompanySettings() {
  try {
    const response =
      await getCompany();

    if (
      response?.success &&
      response?.company
    ) {
      return {
        ...DEFAULT_COMPANY,
        ...response.company,
      };
    }

    return DEFAULT_COMPANY;
  } catch (error) {
    console.warn(
      "Unable to load company settings:",
      error
    );

    return DEFAULT_COMPANY;
  }
}

/* ===========================================================
   FALLBACK PUBLIC LOGO
=========================================================== */

async function loadFallbackLogo() {
  try {
    const response =
      await fetch("/logo.png");

    if (!response.ok) {
      return null;
    }

    const blob =
      await response.blob();

    return await new Promise(
      (resolve, reject) => {
        const reader =
          new FileReader();

        reader.onloadend = () =>
          resolve(
            reader.result
          );

        reader.onerror =
          reject;

        reader.readAsDataURL(
          blob
        );
      }
    );
  } catch {
    return null;
  }
}

/* ===========================================================
   PDF IMAGE TYPE
=========================================================== */

function getImageType(
  image
) {
  if (!image) {
    return "PNG";
  }

  if (
    image.startsWith(
      "data:image/jpeg"
    ) ||
    image.startsWith(
      "data:image/jpg"
    )
  ) {
    return "JPEG";
  }

  return "PNG";
}

/* ===========================================================
   AMOUNT IN WORDS
=========================================================== */

function amountInWords(
  amount
) {
  return `Rupees ${money(
    amount
  )} Only`;
}

/* ===========================================================
   FOOTER
=========================================================== */

function drawFooter(
  doc,
  company
) {
  const pages =
    doc.getNumberOfPages();

  const width =
    doc.internal.pageSize.getWidth();

  const height =
    doc.internal.pageSize.getHeight();

  for (
    let page = 1;
    page <= pages;
    page++
  ) {
    doc.setPage(page);

    doc.setDrawColor(
      ...COLORS.border
    );

    doc.line(
      PAGE.margin,
      height - 15,
      width - PAGE.margin,
      height - 15
    );

    normal(doc, 8);

    doc.text(
      value(
        company.website
      ),
      PAGE.margin,
      height - 8
    );

    doc.text(
      value(
        company.email
      ),
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
   BUFFER -> BASE64
=========================================================== */

function arrayBufferToBase64(
  buffer
) {
  const bytes =
    new Uint8Array(
      buffer
    );

  const chunkSize =
    0x8000;

  let binary = "";

  for (
    let i = 0;
    i < bytes.length;
    i += chunkSize
  ) {
    const chunk =
      bytes.subarray(
        i,
        Math.min(
          i + chunkSize,
          bytes.length
        )
      );

    binary +=
      String.fromCharCode(
        ...chunk
      );
  }

  return btoa(binary);
}

/* ===========================================================
   SAFE FILE NAME
=========================================================== */

function createFileName(
  invoice
) {
  const number =
    invoice?.invoiceNumber ||
    Date.now();

  const safeNumber =
    String(number)
      .replace(
        /[<>:"/\\|?*]/g,
        "-"
      )
      .replace(
        /\s+/g,
        "-"
      );

  return `Invoice-${safeNumber}.pdf`;
}

/* ===========================================================
   SAVE PDF
=========================================================== */

async function savePDF(
  doc,
  filename
) {
  const isNative =
    Capacitor.isNativePlatform();

  /* =========================================================
     WEBSITE
  ========================================================= */

  if (!isNative) {
    doc.save(filename);

    return;
  }

  /* =========================================================
     ANDROID
  ========================================================= */

  const arrayBuffer =
    doc.output(
      "arraybuffer"
    );

  const base64 =
    arrayBufferToBase64(
      arrayBuffer
    );

  const result =
    await Filesystem.writeFile({
      path: filename,

      data: base64,

      directory:
        Directory.Cache,

      recursive: true,
    });

  if (!result.uri) {
    throw new Error(
      "Unable to create PDF file."
    );
  }

  const shareAvailable =
    await Share.canShare();

  if (
    shareAvailable.value
  ) {
    await Share.share({
      title:
        "Brandspire Invoice",

      text:
        "Invoice generated from Brandspire CRM",

      url:
        result.uri,

      dialogTitle:
        "Save or Share Invoice",
    });
  }
}

/* ===========================================================
   GENERATE PDF
=========================================================== */

export async function generateInvoicePDF(
  invoice
) {
  /* =========================================================
     COMPANY
  ========================================================= */

  const company =
    await loadCompanySettings();

  /* =========================================================
     CUSTOMER / BILL TO
  ========================================================= */

  let customer = {};

  if (
    invoice.customer &&
    typeof invoice.customer ===
      "object"
  ) {
    customer =
      invoice.customer;
  }

  /*
   * Supports alternative customer data if needed.
   */

  if (
    !customer.name &&
    invoice.customerDetails
  ) {
    customer =
      invoice.customerDetails;
  }

  /* =========================================================
     DOCUMENT
  ========================================================= */

  const doc =
    new jsPDF({
      orientation:
        "portrait",

      unit: "mm",

      format: "a4",
    });

  const pageWidth =
    doc.internal.pageSize.getWidth();

  const pageHeight =
    doc.internal.pageSize.getHeight();

  const margin =
    PAGE.margin;

  /* =========================================================
     TOTALS
  ========================================================= */

  const subtotal =
    invoice.subtotal ??
    (
      invoice.items || []
    ).reduce(
      (
        sum,
        item
      ) =>
        sum +
        Number(
          item.quantity ||
            0
        ) *
          Number(
            item.price ||
              0
          ),
      0
    );

  const gstAmount =
    Number(
      invoice.gstAmount ||
        0
    );

  const discountAmount =
    Number(
      invoice.discountAmount ||
        0
    );

  const total =
    invoice.total ??
    subtotal +
      gstAmount -
      discountAmount;

  /* =========================================================
     LOGO
  ========================================================= */

  let logo =
    company.logo;

  if (!logo) {
    logo =
      await loadFallbackLogo();
  }

  /* =========================================================
     HEADER
  ========================================================= */

  doc.setFillColor(
    ...COLORS.blue
  );

  doc.rect(
    0,
    0,
    pageWidth,
    36,
    "F"
  );

  doc.setFillColor(
    ...COLORS.purple
  );

  doc.rect(
    pageWidth - 70,
    0,
    70,
    36,
    "F"
  );

  /* =========================================================
     LOGO
  ========================================================= */

  if (logo) {
    try {
      doc.addImage(
        logo,

        getImageType(
          logo
        ),

        margin,
        8,
        20,
        20
      );
    } catch (
      error
    ) {
      console.warn(
        "PDF Logo Error:",
        error
      );
    }
  }

  /* =========================================================
     COMPANY TITLE
  ========================================================= */

  doc.setTextColor(
    255
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(
    18
  );

  doc.text(
    value(
      company.companyName ||
        "Brandspire"
    ),

    42,
    16
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(
    9
  );

  doc.text(
    company.tagline ||
      DEFAULT_COMPANY.tagline,

    42,
    23
  );

  /* =========================================================
     INVOICE TITLE
  ========================================================= */

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(
    26
  );

  doc.text(
    "INVOICE",

    pageWidth -
      margin,

    16,

    {
      align:
        "right",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(
    10
  );

  doc.text(
    `Invoice # ${value(
      invoice.invoiceNumber
    )}`,

    pageWidth -
      margin,

    24,

    {
      align:
        "right",
    }
  );

  doc.text(
    formatDate(
      invoice.invoiceDate ||
        invoice.issueDate
    ),

    pageWidth -
      margin,

    30,

    {
      align:
        "right",
    }
  );

  doc.setTextColor(
    0
  );

  /* =========================================================
     COMPANY DETAILS
  ========================================================= */

  let y = 48;

  heading(
    doc,
    12
  );

  doc.text(
    "Company Details",
    margin,
    y
  );

  card(
    doc,
    margin,
    y + 4,
    82,
    60
  );

  normal(doc);

  let cy =
    y + 12;

  doc.text(
    value(
      company.companyName
    ),
    margin + 5,
    cy
  );

  cy += 6;

  const addressLines =
    doc.splitTextToSize(
      value(
        company.address
      ),
      70
    );

  doc.text(
    addressLines,
    margin + 5,
    cy
  );

  cy +=
    Math.max(
      6,
      addressLines.length *
        5
    );

  doc.text(
    `Phone: ${value(
      company.phone
    )}`,
    margin + 5,
    cy
  );

  cy += 6;

  doc.text(
    `Email: ${value(
      company.email
    )}`,
    margin + 5,
    cy
  );

  cy += 6;

  doc.text(
    `Website: ${value(
      company.website
    )}`,
    margin + 5,
    cy
  );

  cy += 6;

  if (
    company.gstin
  ) {
    doc.text(
      `GSTIN: ${value(
        company.gstin
      )}`,
      margin + 5,
      cy
    );
  }

  /* =========================================================
     BILL TO
  ========================================================= */

  const customerX =
    pageWidth - 90;

  heading(
    doc,
    12
  );

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

  let by =
    y + 12;

  /* Customer Name */

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    value(
      customer.name
    ),
    customerX + 5,
    by
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  by += 7;

  /* Project */

  doc.text(
    `Project: ${value(
      customer.project ||
        customer.company
    )}`,
    customerX + 5,
    by
  );

  by += 7;

  /* Email */

  const emailText =
    doc.splitTextToSize(
      `Email: ${value(
        customer.email
      )}`,
      64
    );

  doc.text(
    emailText,
    customerX + 5,
    by
  );

  by +=
    Math.max(
      7,
      emailText.length *
        5
    );

  /* Phone */

  doc.text(
    `Phone: ${value(
      customer.phone
    )}`,
    customerX + 5,
    by
  );

  by += 7;

  /* Address */

  if (
    customer.address ||
    customer.city ||
    customer.state
  ) {
    const fullAddress =
      [
        customer.address,
        customer.city,
        customer.state,
        customer.pincode,
      ]
        .filter(
          Boolean
        )
        .join(", ");

    const addressText =
      doc.splitTextToSize(
        `Address: ${fullAddress}`,
        64
      );

    doc.text(
      addressText,
      customerX + 5,
      by
    );
  }

  /* =========================================================
     STATUS BADGE
  ========================================================= */

  const badge =
    statusColor(
      invoice.status
    );

  doc.setFillColor(
    ...badge
  );

  doc.roundedRect(
    pageWidth - 48,
    40,
    33,
    10,
    3,
    3,
    "F"
  );

  doc.setTextColor(
    255
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(
    9
  );

  doc.text(
    value(
      invoice.status
    ),

    pageWidth - 31,

    46.5,

    {
      align:
        "center",
    }
  );

  doc.setTextColor(
    0
  );

  /* =========================================================
     INVOICE INFORMATION
  ========================================================= */

  const infoY =
    122;

  divider(
    doc,
    infoY
  );

  heading(
    doc,
    11
  );

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
    formatDate(
      invoice.invoiceDate ||
        invoice.issueDate
    ),
    margin,
    infoY + 16
  );

  doc.text(
    formatDate(
      invoice.dueDate
    ),
    75,
    infoY + 16
  );

  doc.text(
    value(
      invoice.paymentTerms
    ),
    130,
    infoY + 16
  );

  /* =========================================================
     ITEMS
  ========================================================= */

  const tableRows =
    (
      invoice.items ||
      []
    ).map(
      (
        item,
        index
      ) => {
        const quantity =
          Number(
            item.quantity ||
              0
          );

        const price =
          Number(
            item.price ||
              0
          );

        const amount =
          quantity *
          price;

        return [
          index + 1,

          value(
            item.description
          ),

          quantity,

          money(
            price
          ),

          money(
            amount
          ),
        ];
      }
    );

  autoTable(
    doc,
    {
      startY: 142,

      head: [
        [
          "#",
          "Description",
          "Qty",
          "Unit Price",
          "Amount",
        ],
      ],

      body:
        tableRows,

      theme:
        "grid",

      margin: {
        left:
          margin,

        right:
          margin,
      },

      styles: {
        font:
          "helvetica",

        fontSize:
          9,

        cellPadding:
          4,

        lineColor:
          COLORS.border,

        lineWidth:
          0.2,

        valign:
          "middle",

        textColor:
          COLORS.dark,
      },

      headStyles: {
        fillColor:
          COLORS.primary,

        textColor:
          255,

        fontStyle:
          "bold",

        halign:
          "center",
      },

      alternateRowStyles:
        {
          fillColor: [
            249,
            250,
            251,
          ],
        },

      columnStyles: {
        0: {
          cellWidth:
            12,

          halign:
            "center",
        },

        1: {
          cellWidth:
            78,
        },

        2: {
          cellWidth:
            20,

          halign:
            "center",
        },

        3: {
          cellWidth:
            35,

          halign:
            "right",
        },

        4: {
          cellWidth:
            35,

          halign:
            "right",

          fontStyle:
            "bold",
        },
      },
    }
  );

  /* =========================================================
     SUMMARY POSITION
  ========================================================= */

  let currentY =
    doc.lastAutoTable
      .finalY +
    12;

  if (
    currentY >
    pageHeight - 100
  ) {
    doc.addPage();

    currentY =
      25;
  }

  /* =========================================================
     PAYMENT DETAILS
  ========================================================= */

  const paymentWidth =
    98;

  doc.setFillColor(
    ...COLORS.light
  );

  doc.roundedRect(
    margin,
    currentY,
    paymentWidth,
    72,
    4,
    4,
    "F"
  );

  doc.setDrawColor(
    ...COLORS.border
  );

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

  const paymentInfo =
    [
      [
        "Bank",
        company.bankName,
      ],

      [
        "Account",
        company.accountName,
      ],

      [
        "Account No",
        company.accountNumber,
      ],

      [
        "IFSC",
        company.ifsc,
      ],

      [
        "Branch",
        company.branch,
      ],

      [
        "UPI",
        company.upi,
      ],
    ];

  let py =
    currentY + 18;

  paymentInfo.forEach(
    ([
      label,
      data,
    ]) => {
      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        `${label}:`,
        margin + 5,
        py
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        value(data),
        margin + 32,
        py
      );

      py += 8;
    }
  );

  /* =========================================================
     SUMMARY
  ========================================================= */

  const summaryWidth =
    72;

  const summaryX =
    pageWidth -
    summaryWidth -
    margin;

  doc.setFillColor(
    250,
    250,
    252
  );

  doc.roundedRect(
    summaryX,
    currentY,
    summaryWidth,
    62,
    4,
    4,
    "F"
  );

  doc.setDrawColor(
    ...COLORS.border
  );

  doc.roundedRect(
    summaryX,
    currentY,
    summaryWidth,
    62,
    4,
    4
  );

  heading(
    doc,
    12
  );

  doc.text(
    "Invoice Summary",
    summaryX + 5,
    currentY + 8
  );

  normal(doc);

  let sy =
    currentY + 18;

  const summaryRows =
    [
      [
        "Subtotal",
        money(
          subtotal
        ),
      ],

      [
        "GST",
        money(
          gstAmount
        ),
      ],

      [
        "Discount",
        money(
          discountAmount
        ),
      ],
    ];

  summaryRows.forEach(
    ([
      label,
      amount,
    ]) => {
      doc.text(
        label,
        summaryX + 5,
        sy
      );

      doc.text(
        amount,
        summaryX +
          summaryWidth -
          5,
        sy,
        {
          align:
            "right",
        }
      );

      sy += 8;
    }
  );

  doc.setDrawColor(
    ...COLORS.border
  );

  doc.line(
    summaryX + 5,
    sy - 3,
    summaryX +
      summaryWidth -
      5,
    sy - 3
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "Grand Total",
    summaryX + 5,
    sy + 5
  );

  doc.text(
    money(
      total
    ),
    summaryX +
      summaryWidth -
      5,
    sy + 5,
    {
      align:
        "right",
    }
  );

  normal(
    doc,
    8
  );

  const words =
    doc.splitTextToSize(
      amountInWords(
        total
      ),
      summaryWidth -
        10
    );

  doc.text(
    words,
    summaryX + 5,
    sy + 14
  );

  currentY += 84;

  /* =========================================================
     NOTES
  ========================================================= */

  if (
    currentY >
    pageHeight - 105
  ) {
    doc.addPage();

    currentY =
      25;
  }

  heading(
    doc,
    12
  );

  doc.text(
    "Notes",
    margin,
    currentY
  );

  const notes =
    doc.splitTextToSize(
      value(
        invoice.notes
      ),
      pageWidth -
        margin * 2 -
        10
    );

  const notesHeight =
    Math.max(
      32,
      notes.length *
        5 +
        12
    );

  doc.setFillColor(
    252,
    252,
    252
  );

  doc.roundedRect(
    margin,
    currentY + 5,
    pageWidth -
      margin * 2,
    notesHeight,
    4,
    4,
    "F"
  );

  normal(doc);

  doc.text(
    notes,
    margin + 5,
    currentY + 14
  );

  currentY +=
    notesHeight + 18;

  /* =========================================================
     TERMS
  ========================================================= */

  if (
    currentY >
    pageHeight - 90
  ) {
    doc.addPage();

    currentY =
      25;
  }

  heading(
    doc,
    12
  );

  doc.text(
    "Terms & Conditions",
    margin,
    currentY
  );

  normal(doc);

  const terms =
    [
      "Payment must be completed according to the agreed payment terms.",

      "Please mention the invoice number while making payment.",

      "Goods and services once delivered are considered accepted.",

      "Late payments may attract additional charges.",

      "Thank you for choosing Brandspire.",
    ];

  let ty =
    currentY + 8;

  terms.forEach(
    (
      term,
      index
    ) => {
      doc.text(
        `${index + 1}. ${term}`,
        margin + 2,
        ty
      );

      ty += 6;
    }
  );

  currentY =
    ty + 10;

  /* =========================================================
     SIGNATURE
  ========================================================= */

  if (
    currentY >
    pageHeight - 60
  ) {
    doc.addPage();

    currentY =
      25;
  }

  if (
    company.signature
  ) {
    try {
      doc.addImage(
        company.signature,

        getImageType(
          company.signature
        ),

        pageWidth - 70,

        currentY,

        45,

        18
      );
    } catch (
      error
    ) {
      console.warn(
        "Signature PDF Error:",
        error
      );
    }
  }

  doc.setDrawColor(
    ...COLORS.border
  );

  doc.line(
    pageWidth - 75,
    currentY + 22,
    pageWidth - 20,
    currentY + 22
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(
    10
  );

  doc.text(
    "Authorized Signature",

    pageWidth - 47,

    currentY + 29,

    {
      align:
        "center",
    }
  );

  /* =========================================================
     THANK YOU
  ========================================================= */

  doc.setTextColor(
    ...COLORS.primary
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(
    18
  );

  doc.text(
    "Thank You!",

    pageWidth / 2,

    currentY + 45,

    {
      align:
        "center",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(
    10
  );

  doc.text(
    "We appreciate your business and look forward to serving you again.",

    pageWidth / 2,

    currentY + 53,

    {
      align:
        "center",
    }
  );

  doc.setTextColor(
    0
  );

  /* =========================================================
     FOOTER
  ========================================================= */

  drawFooter(
    doc,
    company
  );

  /* =========================================================
     METADATA
  ========================================================= */

  doc.setProperties({
    title:
      `Invoice ${value(
        invoice.invoiceNumber
      )}`,

    subject:
      "Brandspire Invoice",

    author:
      company.companyName ||
      "Brandspire",

    creator:
      "Brandspire CRM",

    keywords:
      "invoice, crm, brandspire, pdf",
  });

  /* =========================================================
     SAVE
  ========================================================= */

  const filename =
    createFileName(
      invoice
    );

  await savePDF(
    doc,
    filename
  );
}