function showResult() {
  let alertString = `Размер монитора: ${window.screen.width} X ${window.screen.height} px.\n`
  alertString += `Размер окна с учетом ПП: ${window.innerWidth} X ${window.innerHeight} px.\n`
  alertString += `Размер окна без учета ПП: ${document.documentElement.clientWidth} X ${document.documentElement.clientHeight} px.`
  alert(alertString)
}


const btn = document.querySelector(".j-btn-test");
btn.addEventListener("click", () => showResult())
