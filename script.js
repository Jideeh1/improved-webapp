


    // why is this hardcoded? -- jd
    const attendanceData = {
      'May 3 2025': [
        { name: 'Abayan', status: 'Late' },
        { name: 'Adiarte', status: 'Present' },
        { name: 'Fabros', status: 'Absent' },
        { name: 'Caridad', status: 'Late' },
        { name: 'Eja', status: 'Present' },
        { name: 'Escaraman', status: 'Present' },
        { name: 'Amis', status: 'Absent' },
        { name: 'Joreen', status: 'Absent' },
        { name: 'Ruben', status: 'Absent' },
        { name: 'Afliccion', status: 'Present' }
      ],
      'May 4 2025': [
        { name: 'Abayan', status: 'Late' },
        { name: 'Adiarte', status: 'Present' },
        { name: 'Fabros', status: 'Absent' },
        { name: 'Caridad', status: 'Late' },
        { name: 'Eja', status: 'Present' },
        { name: 'Escaraman', status: 'Present' },
        { name: 'Amis', status: 'Absent' },
        { name: 'Joreen', status: 'Absent' },
        { name: 'Ruben', status: 'Absent' },
        { name: 'Afliccion', status: 'Present' }
      ],
      'May 5 2025': [
        { name: 'Abayan', status: 'Late' },
        { name: 'Adiarte', status: 'Present' },
        { name: 'Fabros', status: 'Absent' },
        { name: 'Caridad', status: 'Late' },
        { name: 'Eja', status: 'Present' },
        { name: 'Escaraman', status: 'Present' },
        { name: 'Amis', status: 'Absent' },
        { name: 'Joreen', status: 'Absent' },
        { name: 'Ruben', status: 'Absent' },
        { name: 'Afliccion', status: 'Present' }
      ],
      'May 6 2025': [
        { name: 'Abayan', status: 'Late' },
        { name: 'Adiarte', status: 'Present' },
        { name: 'Fabros', status: 'Absent' },
        { name: 'Caridad', status: 'Late' },
        { name: 'Eja', status: 'Present' },
        { name: 'Escaraman', status: 'Present' },
        { name: 'Amis', status: 'Absent' },
        { name: 'Joreen', status: 'Absent' },
        { name: 'Ruben', status: 'Absent' },
        { name: 'Afliccion', status: 'Present' }
      ],
      'May 7 2025': [
        { name: 'Abayan', status: 'Late' },
        { name: 'Adiarte', status: 'Late' },
        { name: 'Fabros', status: 'Present' },
        { name: 'Caridad', status: 'Late' },
        { name: 'Eja', status: 'Present' },
        { name: 'Escaraman', status: 'Present' },
        { name: 'Amis', status: 'Present' },
        { name: 'Joreen', status: 'Present' },
        { name: 'Ruben', status: 'Present' },
        { name: 'Afliccion', status: 'Present' }
      ],
      'May 8 2025': [
        { name: 'Abayan', status: 'Present' },
        { name: 'Adiarte', status: 'Late' },
        { name: 'Fabros', status: 'Present' },
        { name: 'Caridad', status: 'Present' },
        { name: 'Eja', status: 'Present' },
        { name: 'Escaraman', status: 'Late' },
        { name: 'Amis', status: 'Present' },
        { name: 'Joreen', status: 'Absent' },
        { name: 'Ruben', status: 'Present' },
        { name: 'Afliccion', status: 'Present' }
      ],
      'May 9 2025': [
        { name: 'Abayan', status: 'Present' },
        { name: 'Adiarte', status: 'Present' },
        { name: 'Fabros', status: 'Absent' },
        { name: 'Caridad', status: 'Present' },
        { name: 'Eja', status: 'Present' },
        { name: 'Escaraman', status: 'Present' },
        { name: 'Amis', status: 'Present' },
        { name: 'Joreen', status: 'Present' },
        { name: 'Ruben', status: 'Present' },
        { name: 'Afliccion', status: 'Present' }
      ],
      'May 10 2025': [
        { name: 'Abayan', status: 'Late' },
        { name: 'Adiarte', status: 'Present' },
        { name: 'Fabros', status: 'Present' },
        { name: 'Caridad', status: 'Late' },
        { name: 'Eja', status: 'Present' },
        { name: 'Escaraman', status: 'Present' },
        { name: 'Amis', status: 'Absent' },
        { name: 'Joreen', status: 'Present' },
        { name: 'Ruben', status: 'Present' },
        { name: 'Afliccion', status: 'Absent' }
      ]
    };

      const presentCounts = [];
    const absentCounts = [];
    const lateCounts = [];
    const dates = Object.keys(attendanceData);

    dates.forEach(date => {
      const entries = attendanceData[date];

      let present = 0, absent = 0, late = 0;
      entries.forEach(({ status }) => {
        if (status === 'Present') present++;
        else if (status === 'Absent') absent++;
        else if (status === 'Late') late++;
      });

      presentCounts.push(present);
      absentCounts.push(absent);
      lateCounts.push(late);
    });

    const ctx = document.getElementById('dailyAttendanceChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          { label: 'Present', data: presentCounts, backgroundColor: '#4caf50' },
          { label: 'Absent', data: absentCounts, backgroundColor: '#f44336' },
          { label: 'Late', data: lateCounts, backgroundColor: '#ff9800' }
        ]
      },
      options: {
        onClick: (e, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const date = chart.data.labels[index];

            currentDay = date;
            document.getElementById('selectedDate').textContent = date;

            const list = document.getElementById('studentNames');
            list.innerHTML = '';
            const students = attendanceData[date];
            students.forEach(({ name, status }) => {
              const li = document.createElement('li');
              li.textContent = `${name} - ${status}`;
              li.classList.add(status.toLowerCase());
              list.appendChild(li);
            });

            document.querySelector('aside').style.display = 'flex';

            console.log("Setting date to:", date);
            console.log(document.getElementById('selectedDate'));
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 20,
          },
          x: {
            ticks: {
              color: '#31383d'
            }
          }
        }
      }
    });

let currentDay;

document.addEventListener('DOMContentLoaded', function () {
  const attendanceData = {
    // your attendance data
  };

  const presentCounts = [];
  const absentCounts = [];
  const lateCounts = [];
  const dates = Object.keys(attendanceData);

  dates.forEach(date => {
    const entries = attendanceData[date];
    let present = 0, absent = 0, late = 0;
    entries.forEach(({ status }) => {
      if (status === 'Present') present++;
      else if (status === 'Absent') absent++;
      else if (status === 'Late') late++;
    });
    presentCounts.push(present);
    absentCounts.push(absent);
    lateCounts.push(late);
  });

  const ctx = document.getElementById('dailyAttendanceChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        { label: 'Present', data: presentCounts, backgroundColor: '#4caf50' },
        { label: 'Absent', data: absentCounts, backgroundColor: '#f44336' },
        { label: 'Late', data: lateCounts, backgroundColor: '#ff9800' }
      ]
    },
    options: {
      onClick: (e, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const date = chart.data.labels[index];

          currentDay = date;
          document.getElementById('selectedDate').textContent = date;

          const list = document.getElementById('studentNames');
          list.innerHTML = '';
          const students = attendanceData[date];
          students.forEach(({ name, status }) => {
            const li = document.createElement('li');
            li.textContent = `${name} - ${status}`;
            li.classList.add(status.toLowerCase());
            list.appendChild(li);
          });

          document.querySelector('aside').style.display = 'flex';

          console.log("Setting date to:", date);
          console.log(document.getElementById('selectedDate'));
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 20,
        },
        x: {
          ticks: {
            color: '#31383d'
          }
        }
      }
    }
  });
});

function downloadCSV() {
  console.log("Yeah, you're clicking the button!!!");

  const dates = Object.keys(attendanceData);
  if (dates.length === 0) {
    alert('No attendance data available.');
    return;
  }

  const studentSet = new Set();
  dates.forEach(date => {
    attendanceData[date].forEach(({ name }) => {
      studentSet.add(name);
    });
  });
  const studentNames = Array.from(studentSet);

  const rows = [['Student Name', ...dates]];

  studentNames.forEach(name => {
    const row = [name];
    dates.forEach(date => {
      const record = attendanceData[date].find(s => s.name === name);
      row.push(record ? record.status : '');
    });
    rows.push(row);
  });

  const csvContent = rows.map(e => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `attendance-summary-${currentDay}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

console.table(attendanceData);

