export default function formatTimeToPost(isoDate: string) {
  const now = new Date();
  const postDate = new Date(isoDate);
  const differenceInSeconds = Math.floor(
    (now.getTime() - postDate.getTime()) / 1000,
  );

  const oneMinute = 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneDay * 30;

  if (differenceInSeconds < oneMinute) {
    return "Postado agora mesmo";
  } else if (differenceInSeconds < oneHour) {
    const minutes = Math.floor(differenceInSeconds / oneMinute);
    return `Postado há ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  } else if (differenceInSeconds < oneDay) {
    const hours = Math.floor(differenceInSeconds / oneHour);
    return `Postado há ${hours} ${hours === 1 ? "hora" : "horas"}`;
  } else if (differenceInSeconds < oneWeek) {
    const days = Math.floor(differenceInSeconds / oneDay);
    return `Postado há ${days} ${days === 1 ? "dia" : "dias"}`;
  } else if (differenceInSeconds < oneMonth) {
    const weeks = Math.floor(differenceInSeconds / oneWeek);
    return `Postado há ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  } else {
    return `Postado em ${postDate.toLocaleDateString("pt-BR")}`;
  }
}
