// -----------------------------
// BASE DE 15 PERGUNTAS (MÚLTIPLA ESCOLHA)
// -----------------------------
const questionsBase = [
    { q: "O que é uma imagem vetorial?", options: ["Imagem formada por fórmulas matemáticas", "Imagem composta por pixels", "Foto capturada por câmera"], a: 0 },
    { q: "O que caracteriza uma imagem bitmap (matricial)?", options: ["É escalável sem perder qualidade", "É formada por pixels", "É utilizada apenas em vídeos"], a: 1 },
    { q: "Qual das opções representa um formato vetorial?", options: ["SVG", "JPG", "BMP"], a: 0 },
    { q: "Qual é a principal vantagem de uma imagem vetorial?", options: ["Permite redimensionamento sem perda de qualidade", "Possui melhor qualidade fotográfica", "É melhor para vídeos"], a: 0 },
    { q: "O que significa resolução de uma imagem?", options: ["Quantidade de cores da imagem", "Quantidade de pixels na largura e altura", "Tamanho do arquivo"], a: 1 },
    { q: "Qual é o formato de imagem normalmente usado para fotografia?", options: ["PNG", "JPG", "SVG"], a: 1 },
    { q: "O que significa FPS em um vídeo?", options: ["Frames captados por segundo", "Frequência de pixels por segundo", "Fator de profundidade sonora"], a: 0 },
    { q: "Qual dos itens representa um formato de vídeo?", options: ["MP4", "PNG", "RAW"], a: 0 },
    { q: "Qual componente controla a entrada de luz em uma câmera?", options: ["ISO", "Abertura do diafragma", "Resolução"], a: 1 },
    { q: "O que é compressão em multimídia?", options: ["Aumentar o tamanho de um arquivo", "Reduzir dados mantendo a qualidade aceitável", "Excluir partes essenciais do conteúdo"], a: 1 },
    { q: "O que o ISO controla em uma câmera?", options: ["Sensibilidade à luz", "Taxa de quadros", "Profundidade de cor"], a: 0 },
    { q: "Qual é um formato de áudio comum?", options: ["MP3", "JPG", "MP4"], a: 0 },
    { q: "O que representa a profundidade de cor de uma imagem?", options: ["Quantidade de frames exibidos", "Quantidade de bits utilizados por pixel", "Tamanho físico da imagem"], a: 1 },
    { q: "O que significa resolução 1080p?", options: ["Vídeo com 1080 pixels de altura", "Vídeo com 1080 pixels de largura", "Vídeo com 1080 MB de tamanho"], a: 0 },
    { q: "Qual é a principal vantagem do formato PNG?", options: ["Suporte a transparência", "Qualidade inferior e menor tamanho", "É indicado apenas para vídeos"], a: 0 }
];


// -----------------------------
// VARIÁVEIS DO JOGO
// -----------------------------
let selectedQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;

// ELEMENTOS DA PÁGINA
const startBtn = document.getElementById("startQuiz");
const quizArea = document.getElementById("quizArea");
const resultBox = document.getElementById("result");

// -----------------------------
// INICIAR O QUIZ
// -----------------------------
startBtn.addEventListener("click", initQuiz);

function initQuiz() {
    // Resetar valores
    resultBox.innerHTML = "";
    currentQuestionIndex = 0;
    correctAnswers = 0;

    // Sorteia 5 perguntas
    selectedQuestions = questionsBase
        .slice() // copia
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    startBtn.style.display = "none";
    quizArea.style.display = "block";

    showQuestion();
}

// -----------------------------
// MOSTRAR UMA PERGUNTA (USANDO DOM APIs para evitar problemas com < >)
// -----------------------------
function showQuestion() {
    const q = selectedQuestions[currentQuestionIndex];

    // limpar área
    quizArea.innerHTML = "";

    // header (Pergunta X de 5)
    const h3 = document.createElement("h3");
    h3.textContent = `Pergunta ${currentQuestionIndex + 1} de 5`;
    quizArea.appendChild(h3);

    // enunciado
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = q.q;
    p.appendChild(strong);
    quizArea.appendChild(p);

    // opções
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
    q.options.forEach((op, i) => {
        const label = document.createElement("label");
        label.style.display = "block";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value = String(i);

        // Texto da opção tratado como texto (seguro mesmo se tiver "<" ou ">")
        const text = document.createTextNode(" " + op);

        label.appendChild(input);
        label.appendChild(text);
        optionsDiv.appendChild(label);
    });
    quizArea.appendChild(optionsDiv);

    // botão próxima (type=button para evitar submit)
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.textContent = (currentQuestionIndex < 4) ? "Próxima" : "Finalizar";
    nextBtn.addEventListener("click", nextQuestion);
    nextBtn.style.marginTop = "12px";
    quizArea.appendChild(nextBtn);
}

// -----------------------------
// AVANÇAR PARA A PRÓXIMA
// -----------------------------
function nextQuestion() {
    const selected = document.querySelector("input[name='option']:checked");

    if (!selected) {
        alert("Selecione uma resposta!");
        return;
    }

    const userAnswer = parseInt(selected.value, 10);
    const correct = selectedQuestions[currentQuestionIndex].a;

    if (userAnswer === correct) correctAnswers++;

    currentQuestionIndex++;

    if (currentQuestionIndex < 5) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

// -----------------------------
// FINALIZAR QUIZ
// -----------------------------
function finishQuiz() {
    const percent = Math.round((correctAnswers / 5) * 100);

    quizArea.style.display = "none";

    resultBox.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = `Você acertou ${correctAnswers} de 5 perguntas (${percent}%).`;
    resultBox.appendChild(p);

    const restartBtn = document.createElement("button");
    restartBtn.type = "button";
    restartBtn.textContent = "Iniciar Quiz Novamente";
    restartBtn.addEventListener("click", restartQuiz);
    restartBtn.style.marginTop = "8px";

    resultBox.appendChild(restartBtn);
}

// -----------------------------
// REINICIAR
// -----------------------------
function restartQuiz() {
    resultBox.innerHTML = "";
    startBtn.style.display = "block";
}

