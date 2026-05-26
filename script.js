const cmds = {
  help: "commands: whoami · skills · projects · contact · clear",
  whoami: "Rasuljon Muminov — frontend developer from Tajikistan.",
  skills: "html · css · javascript · github · figma · vercel · ubuntu",
  contact: "Phone number: +992 200190190 · email: xzrasul13@gmail.com",
  projects: `<a href="https://bimgroup.tj/" target="_blank">BIMGROUP</a> · <a href="https://therahmon.netlify.app" target="_blank">THERAHMON</a> · <a href="https://workersadmin.vercel.app" target="_blank">BRIGADES</a> · <a href="https://t.me/xzinstagrambot" target="_blank">BOOSTER</a> · <a href="https://xzlibrary.netlify.app/" target="_blank">XZLIBRARY</a> · <a href="https://tajmebel.vercel.app/" target="_blank">TAJMEBEL</a> · <a href="https://cafehb.vercel.app/" target="_blank">CAFE-HB</a>`,
  clear: "__clear__",
};

function runCmd(e) {
  if (e.key !== "Enter") return;
  const welcomeMsg = `<div><span class="prompt">~</span> <span class="out">type <span class="k">help</span> to start</span></div>`;
  const input = document.getElementById("termInput");
  const val = input.value.trim().toLowerCase();
  input.value = "";
  if (!val) return;

  const body = document.getElementById("termBody");
  const inputRow = body.querySelector(".input-row");

  // 1. Отображаем введенную команду
  const cmdLine = document.createElement("div");
  cmdLine.innerHTML = `<span class="prompt">~</span> ${val}`;
  body.insertBefore(cmdLine, inputRow);

  // 2. Обработка команды clear
  if (val === "clear") {
    // Полностью очищаем тело терминала
    body.innerHTML = "";
    
    // 1. Возвращаем приветственное сообщение
    const welcomeDiv = document.createElement("div");
    welcomeDiv.innerHTML = welcomeMsg;
    body.appendChild(welcomeDiv);

    // 2. Возвращаем строку ввода (input row)
    const row = document.createElement("div");
    row.className = "input-row";
    row.innerHTML = `<span class="prompt">~</span><input class="term-input" id="termInput" onkeydown="runCmd(event)" oninput="this.value = this.value.toLowerCase()" autocomplete="off" spellcheck="false">`;
    body.appendChild(row);
    
    // 3. Ставим фокус обратно в инпут
    document.getElementById("termInput").focus();
    return;
  }

  // 3. Вывод ответа
  const out = document.createElement("div");
  out.className = "out";
  const response = cmds[val] || `not found: ${val}`;

  body.insertBefore(out, inputRow);
  typeText(out, response);

  // Авто-скролл вниз
  body.scrollTop = body.scrollHeight;
}

// Универсальная функция для запуска команд из ссылок (Projects/Skills)
function runAutoCmd(cmdName) {
  const input = document.getElementById("termInput");
  input.value = cmdName;
  // Эмулируем нажатие Enter
  runCmd({ key: "Enter" });
  // Скроллим к терминалу
  document.getElementById("terminal").scrollIntoView({ behavior: "smooth" });
}

// Заменяем твои старые функции на вызов универсальной
function runProjects() {
  runAutoCmd("projects");
}
function runSkills() {
  runAutoCmd("skills");
}

function typeText(element, html, speed = 15) {
  let i = 0;
  // Создаем временный элемент для получения чистого текста без тегов
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.innerText;

  element.innerText = "";

  function typing() {
    if (i < text.length) {
      element.innerText += text[i];
      i++;
      setTimeout(typing, speed);
      // Скроллим во время печати
      const body = document.getElementById("termBody");
      body.scrollTop = body.scrollHeight;
    } else {
      element.innerHTML = html; // В конце заменяем текст на HTML со ссылками
    }
  }
  typing();
}
