// Variáveis globais de controle
let seconds = 0;
let timerInterval;
let isPaused = false;

/**
 * Inicia a experiência de foco
 */
function startFocus() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();

    // Validação simples
    if (taskValue === "") {
        alert("Por favor, digite o que você vai focar agora.");
        return;
    }

    // 1. Troca de telas (Esconde setup, mostra foco)
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('focus').classList.remove('hidden');
    
    // 2. Define o texto da tarefa
    document.getElementById('displayTask').innerText = taskValue;

    // 3. Atualiza o visual para o modo de "Trabalho Profundo"
    // Usando um degradê azul profundo e calmo
    document.body.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
    document.body.style.color = "#ffffff";

    // 4. Inicia a contagem
    startTimer();
}

/**
 * Gerencia o cronômetro progressivo
 */
function startTimer() {
    // Evita múltiplos intervalos se a função for chamada por erro
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!isPaused) {
            seconds++;
            updateTimerDisplay();
        }
    }, 1000);
}

/**
 * Atualiza o cronômetro na tela e no título da aba do navegador
 */
function updateTimerDisplay() {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    
    // Formata para 00:00
    const timeString = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    
    document.getElementById('timer').innerText = timeString;
    
    // Atualiza o título da aba para o usuário ver o tempo mesmo em outra aba
    document.title = `(${timeString}) SóUma - Focando`;
}

/**
 * Alterna entre Pausa e Retomada
 */
function togglePause() {
    isPaused = !isPaused;
    const btn = document.getElementById('pauseBtn');
    
    if (isPaused) {
        btn.innerText = "Retomar";
        btn.style.backgroundColor = "#f39c12"; // Laranja para alerta de pausa
        document.title = "[PAUSADO] SóUma";
    } else {
        btn.innerText = "Pausar";
        btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; // Volta ao estilo original
        document.title = "Focando...";
    }
}

/**
 * Finaliza a tarefa e exibe os resultados
 */
function showReport() {
    // Para o tempo
    clearInterval(timerInterval);
    
    const now = new Date();
    const taskName = document.getElementById('taskInput').value;
    const finalTime = document.getElementById('timer').innerText;

    // 1. Troca de telas
    document.getElementById('focus').classList.add('hidden');
    document.getElementById('report').classList.remove('hidden');
    
    // 2. Preenche os dados no card de relatório
    document.getElementById('repTask').innerText = taskName;
    document.getElementById('repTime').innerText = finalTime;
    document.getElementById('repEnd').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // 3. Estilo Visual de Sucesso/Conclusão
    // Degradê verde vibrante
    document.body.style.background = "linear-gradient(135deg, #11998e, #38ef7d)";
    document.body.style.color = "#ffffff";
    document.title = "🎉 Tarefa Concluída!";
}

/**
 * Reinicia o aplicativo para uma nova tarefa
 */
function resetApp() {
    // Reset de variáveis
    seconds = 0;
    isPaused = false;
    
    // Recarrega a página para limpar todos os estados (forma mais limpa)
    location.reload();
}