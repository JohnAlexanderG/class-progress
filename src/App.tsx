import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './App.css'

ChartJS.register(ArcElement, Tooltip, Legend);

interface ClassDate {
  date: string;
  selected: boolean;
}

let count = 0;

[
  '2024/06/04', '2024/06/06', '2024/06/11', '2024/06/13', '2024/06/18', '2024/06/20',
  '2024/06/25', '2024/06/27', '2024/07/02', '2024/07/04', '2024/07/09', '2024/07/11',
  '2024/07/16', '2024/07/18', '2024/07/23', '2024/07/25', '2024/07/30', '2024/08/01',
  '2024/08/06', '2024/08/08', '2024/08/13', '2024/08/15', '2024/08/20', '2024/08/22',
].forEach((date) => {
  if (new Date(date) < new Date()) {
    count++
  }
})

const classDates: ClassDate[] = [
  '04 Junio', '06 Junio', '11 Junio', '13 Junio', '18 Junio', '20 Junio', '25 Junio', '27 Junio',
  '02 Julio', '04 Julio', '09 Julio', '11 Julio', '16 Julio', '18 Julio', '23 Julio', '25 Julio',
  '30 Julio', '01 Agosto', '06 Agosto', '08 Agosto', '13 Agosto', '15 Agosto', '20 Agosto',
  '22 Agosto'
].map((date, index) => ({ date, selected: index < count }));

const App: React.FC = () => {
  const [dates, setDates] = useState<ClassDate[]>(classDates);
  const [chartData, setChartData] = useState<{
    datasets: { data: number[]; backgroundColor: string[] }[];
    labels: string[];
  }>({ datasets: [{ data: [], backgroundColor: [] }], labels: [] });
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    updateChartData();
  }, [dates]);

  const toggleDate = (index: number) => {
    const newDates = [...dates];
    newDates[index].selected = !newDates[index].selected;
    setDates(newDates);
  };

  const updateChartData = () => {
    const completedClasses = dates.filter(date => date.selected).length;
    const remainingClasses = dates.length - completedClasses;
    const newPercentage = Math.round((completedClasses / dates.length) * 100);
    setPercentage(newPercentage);
    setChartData({
      labels: ['Clases Completadas', 'Clases Restantes'],
      datasets: [
        {
          data: [completedClasses, remainingClasses],
          backgroundColor: ['#4CAF50', '#C9CBCF'],
        },
      ],
    });
  };

  return (
    <div className="container">
      <h1>Progreso</h1>
      <span className='subtitle'>Curso: Desarrollo de software</span>
      <div className="chart-container">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: {
                position: 'bottom' as const,
              },
            },
          }}
        />
        <div className="percentage-display">
          <span>{percentage}%</span>
        </div>
      </div>
      <div className="date-grid">
        {dates.map((date, index) => (
          <button
            key={date.date}
            onClick={() => toggleDate(index)}
            className={date.selected ? 'selected' : ''}
          >
            {date.date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;