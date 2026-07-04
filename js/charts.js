/* ==========================================================================
   Quantory — Dashboard visual con Chart.js
   ========================================================================== */

(function () {
  if (typeof Chart === "undefined") return;

  Chart.defaults.font.family = "Inter, sans-serif";
  Chart.defaults.color = "#94a3b8";

  const gridColor = "rgba(148, 163, 184, 0.12)";

  function makeGradient(ctx, chartArea, colorStart, colorEnd) {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  }

  /* ---------- Gráfico de línea: datos procesados ---------- */
  const lineCanvas = document.getElementById("chartDatosProcesados");
  if (lineCanvas) {
    new Chart(lineCanvas, {
      type: "line",
      data: {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Registros procesados (miles)",
            data: [12, 19, 15, 27, 32, 41, 48],
            borderColor: "#60a5fa",
            backgroundColor: (context) => {
              const { ctx, chartArea } = context.chart;
              if (!chartArea) return null;
              return makeGradient(ctx, chartArea, "rgba(96,165,250,0.35)", "rgba(139,92,246,0.02)");
            },
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#8b5cf6",
            pointBorderColor: "#0b0f19",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: "transparent" } },
          y: { grid: { color: gridColor }, beginAtZero: true },
        },
      },
    });
  }

  /* ---------- Gráfico dona: distribución de servicios ---------- */
  const doughnutCanvas = document.getElementById("chartServicios");
  if (doughnutCanvas) {
    new Chart(doughnutCanvas, {
      type: "doughnut",
      data: {
        labels: ["Análisis Estadísticos", "Automatizaciones con IA", "Desarrollo Web"],
        datasets: [
          {
            data: [38, 34, 28],
            backgroundColor: ["#3b82f6", "#8b5cf6", "#22d3ee"],
            borderColor: "#0b0f19",
            borderWidth: 3,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#cbd5e1", boxWidth: 12, padding: 16 },
          },
        },
      },
    });
  }

  /* ---------- Gráfico de barras: precisión de modelos ---------- */
  const barCanvas = document.getElementById("chartPrecision");
  if (barCanvas) {
    new Chart(barCanvas, {
      type: "bar",
      data: {
        labels: ["Predicción demanda", "Detección fraude", "Clasificación NLP", "Forecast financiero"],
        datasets: [
          {
            label: "Precisión (%)",
            data: [91, 96, 88, 93],
            backgroundColor: (context) => {
              const { ctx, chartArea } = context.chart;
              if (!chartArea) return null;
              return makeGradient(ctx, chartArea, "#8b5cf6", "#3b82f6");
            },
            borderRadius: 8,
            maxBarThickness: 42,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: "transparent" } },
          y: { grid: { color: gridColor }, suggestedMax: 100 },
        },
      },
    });
  }
})();
