// Save report from citizen
const form = document.getElementById("reportForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const issue = document.getElementById("issue").value;
    const location = document.getElementById("location").value;

    const reports = JSON.parse(localStorage.getItem("reports")) || [];

    reports.push({
      issue,
      location,
      status: "Reported"
    });

    localStorage.setItem("reports", JSON.stringify(reports));

    document.getElementById("successMsg").innerText =
      "Report submitted successfully!";

    form.reset();
  });
}

// Load reports for council
const table = document.getElementById("issuesTable");

if (table) {
  const reports = JSON.parse(localStorage.getItem("reports")) || [];

  reports.forEach((r) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${r.issue}</td>
      <td>${r.location}</td>
      <td>${r.status}</td>
    `;

    table.appendChild(row);
  });
}
