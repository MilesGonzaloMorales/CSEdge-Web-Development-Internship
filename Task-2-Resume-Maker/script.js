async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const resumeElement = document.getElementById("resume");

  // Convert the resume element to canvas using html2canvas
  try {
    const canvas = await html2canvas(resumeElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Add the image to the PDF
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

function generateResume() {
  const form = document.getElementById("resume-form");

  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const phone = form.elements["phone"].value;
  const address = form.elements["address"].value;
  const summary = form.elements["summary"].value;
  const education = form.elements["education"].value;
  const experience = form.elements["experience"].value;
  const skills = form.elements["skills"].value;

  const resume = document.getElementById("resume");
  resume.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <h3>Professional Summary</h3>
        <p>${summary}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Work Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
    `;

  // Add a button to download as PDF
  const pdfButton = document.createElement("button");
  pdfButton.textContent = "Download as PDF";
  pdfButton.onclick = generatePDF;

  form.appendChild(pdfButton);
}
