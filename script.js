const inputEl = document.getElementById("input");
const messageEl = document.getElementById("massage");
const titleEl = document.getElementById("title");
const meningEl = document.getElementById("meaning");
const audiEl = document.getElementById("audio");
const meaningcountinerEl = document.getElementById("meaning-countiner");

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    CreatMeaniing(e.target.value);
  }
});

async function CreatMeaniing(word) {
  try {
    meaningcountinerEl.style.display = "none";
    messageEl.style.display = "block";
    messageEl.innerHTML = `Searching the meaning of ${word}`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    if (result.title) {
      meaningcountinerEl.style.display = "block";
      messageEl.style.display = "none";
      titleEl.innerHTML = word;
      meningEl.innerHTML = "not find";
      audiEl.style.display = "none";
    } else {
      messageEl.style.display = "none";
      meaningcountinerEl.style.display = "block";
      audiEl.style.display="inline-flex"
      titleEl.innerHTML = result[0].word;
      meningEl.innerHTML = result[0].meanings[0].definitions[0].definition;
      audiEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
  meaningcountinerEl.style.display = "none";
  titleEl.innerHTML="an error happen";
}
}
