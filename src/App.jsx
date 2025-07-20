import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie, getElementAtEvent } from 'react-chartjs-2';
import { universityData } from './universityData';
import './App.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const chartRef = useRef();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  const provinces = ['All', ...new Set(universityData.map(uni => uni.province))];

  const filteredData = selectedProvince === 'All'
    ? universityData
    : universityData.filter(uni => uni.province === selectedProvince);
  
  const handleChartClick = (event) => {
      const element = getElementAtEvent(chartRef.current, event);
      if (element.length > 0) {
        const dataIndex = element[0].index;
        const university = filteredData[dataIndex];
        setSelectedUniversity(university);
      }
  };

  // Bar Chart Data
  const barChartData = {
    labels: filteredData.map(uni => uni.name),
    datasets: [
      {
        label: t('full_time_undergrad'),
        data: filteredData.map(uni => uni.ft_undergrad + uni.ft_grad),
        backgroundColor: 'rgba(74, 144, 226, 0.7)',
        borderColor: 'rgba(74, 144, 226, 1)',
        borderWidth: 1,
        hoverBackgroundColor: '#50e3c2',
        hoverBorderColor: '#50e3c2',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onHover: (event, chartElement) => {
        const target = event.native.target;
        if (target) {
            target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: t('bar_chart_title', { province: selectedProvince === 'All' ? t('all_provinces') : t(selectedProvince) }),
        font: { size: 18, family: 'Inter', weight: '600' },
        color: '#f0f0f0'
      },
    },
    scales: {
        x: { ticks: { color: '#f0f0f0', font: { family: 'Inter' } } },
        y: { ticks: { color: '#f0f0f0', font: { family: 'Inter' } } }
    }
  };

  // Pie Chart Data
  const pieChartData = {
    labels: [t('full_time_undergrad'), t('full_time_grad'), t('part_time_undergrad')],
    datasets: [
      {
        data: selectedUniversity
          ? [selectedUniversity.ft_undergrad, selectedUniversity.ft_grad, selectedUniversity.pt_undergrad]
          : [],
        backgroundColor: ['#4a90e2', '#50e3c2', '#f5a623'],
        borderColor: '#242424',
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
        legend: { position: 'top', labels: {color: '#f0f0f0', font: { family: 'Inter' } } },
        title: {
            display: true,
            text: t('pie_chart_title', { university: selectedUniversity?.name || '' }),
            font: { size: 18, family: 'Inter', weight: '600' },
            color: '#f0f0f0'
        }
     }
  }


  return (
    <>
      <header className="header">
        <div>
          <h1>{t('dashboard_title')}</h1>
          <p>{t('dashboard_subtitle')}</p>
        </div>
        <div className="language-switcher">
          <button onClick={() => changeLanguage('en')} className={currentLanguage === 'en' ? 'active' : ''}>
            English
          </button>
          <button onClick={() => changeLanguage('fr')} className={currentLanguage === 'fr' ? 'active' : ''}>
            Français
          </button>
        </div>
      </header>
      
      <main className="dashboard">
        <div className="controls">
          <h2>{t('controls_title')}</h2>
          <label htmlFor="province-select">{t('province_select_label')}</label>
          <select
            id="province-select"
            value={selectedProvince}
            onChange={(e) => {
                setSelectedProvince(e.target.value)
                setSelectedUniversity(null); // Reset pie chart when province changes
            }}
          >
            {provinces.map(prov => (
              <option key={prov} value={prov}>{prov === 'All' ? t('all_provinces') : t(prov)}</option>
            ))}
          </select>
        </div>

        <div className="chart-container">
          <div className="bar-chart-wrapper">
            <Bar ref={chartRef} options={barChartOptions} data={barChartData} onClick={handleChartClick} />
          </div>
          <p className="chart-instruction">{t('click_for_details')}</p>
        </div>
      </main>

      {selectedUniversity && (
        <section className="pie-chart-container">
             <div style={{height: '450px'}}>
                <Pie data={pieChartData} options={pieChartOptions} />
             </div>
        </section>
      )}

      <footer className="footer">
        <p>{t('footer_note')}</p>
      </footer>
    </>
  );
}

export default App;