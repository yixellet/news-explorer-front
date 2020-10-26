function dateToString(date) {
  const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  return dateString;
}

function earlierDate(date, days) {
  const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate() - days}`;
  return dateString;
}

function dateForDisplay(date) {
  const dateArray = date.substr(0, 10).split('-');
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return `${dateArray[2]} ${months[Number(dateArray[1])]}, ${dateArray[0]}`;
}

export { dateToString, earlierDate, dateForDisplay };
