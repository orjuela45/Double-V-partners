export const chartBar = (element, data = [], lableChart = "Chart") => {
  const currentChart = Chart.getChart(element.id)
  if (currentChart != undefined) {
    currentChart.destroy();
  }
  let labels = Object.keys(data);
  let values = Object.values(data);
  new Chart(element, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: lableChart,
          data: values,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
