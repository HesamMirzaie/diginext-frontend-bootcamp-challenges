// Try the challenge with the Object.groupBy method

const workingHours = [
  {
    day_of_week: 'Saturday',
    start_time: '9:00',
    end_time: '14:00',
  },
  {
    day_of_week: 'Friday',
    start_time: '9:00',
    end_time: '16:00',
  },
  {
    day_of_week: 'Saturday',
    start_time: '16:00',
    end_time: '22:00',
  },
  {
    day_of_week: 'Sunday',
    start_time: '9:00',
    end_time: '22:00',
  },
];

function workingHoursProxy(workingHours) {
  const newWorkingHours = Object.groupBy(
    workingHours,
    ({ day_of_week }) => day_of_week
  );
  for (let day in newWorkingHours) {
    newWorkingHours[day] = newWorkingHours[day].map(
      ({ start_time, end_time }) => `${start_time}-${end_time}`
    );
  }
  return newWorkingHours;
}
