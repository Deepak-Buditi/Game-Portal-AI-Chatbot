document.addEventListener('DOMContentLoaded', () => {
  const games = [
    { name: "Candy Crush", folder: "01-Candy-Crush-Game", icon: "🍬", theme: "puzzle" },
    { name: "Archery Game", folder: "02-Archery-Game", icon: "🏹", theme: "action" },
    { name: "Speed Typing", folder: "03-Speed-Typing-Game", icon: "⌨️", theme: "classic" },
    { name: "Breakout", folder: "04-Breakout-Game", icon: "🎮", theme: "action" },
    { name: "Minesweeper", folder: "05-Minesweeper-Game", icon: "💣", theme: "logic" },
    { name: "Tower Blocks", folder: "06-Tower-Blocks", icon: "🏗️", theme: "action" },
    { name: "Ping Pong", folder: "07-Ping-Pong-Game", icon: "🏓", theme: "action" },
    { name: "Tetris", folder: "08-Tetris-Game", icon: "🧱", theme: "puzzle" },
    { name: "Tilting Maze", folder: "09-Tilting-Maze-Game", icon: "🌀", theme: "puzzle" },
    { name: "Memory Cards", folder: "10-Memory-Card-Game", icon: "🃏", theme: "puzzle" },
    { name: "Rock Paper Scissors", folder: "11-Rock-Paper-Scissors", icon: "✂️", theme: "classic" },
    { name: "Number Guessing", folder: "12-Type-Number-Guessing-Game", icon: "🔢", theme: "classic" },
    { name: "Tic Tac Toe", folder: "13-Tic-Tac-Toe", icon: "⭕", theme: "classic" },
    { name: "Snake", folder: "14-Snake-Game", icon: "🐍", theme: "action" },
    { name: "Connect Four", folder: "15-Connect-Four-Game", icon: "🔴", theme: "logic" },
    { name: "Insect Catch", folder: "16-Insect-Catch-Game", icon: "🐞", theme: "action" },
    { name: "Typing Game", folder: "17-Typing-Game", icon: "⌨️", theme: "classic" },
    { name: "Hangman", folder: "18-Hangman-Game", icon: "🎩", theme: "puzzle" },
    { name: "Flappy Bird", folder: "19-Flappy-Bird-Game", icon: "🐦", theme: "action" },
    { name: "Crossy Road", folder: "20-Crossy-Road-Game", icon: "🚦", theme: "action" },
    { name: "2048", folder: "21-2048-Game", icon: "🧩", theme: "puzzle" },
    { name: "Dice Roll", folder: "22-Dice-Roll-Simulator", icon: "🎲", theme: "classic" },
    { name: "Shape Clicker", folder: "23-Shape-Clicker-Game", icon: "🔷", theme: "action" },
    { name: "Advanced Typing", folder: "24-Typing-Game", icon: "⌨️", theme: "classic" },
    { name: "Speech Guessing", folder: "25-Speak-Number-Guessing-Game", icon: "🗣️", theme: "classic" },
    { name: "Fruit Slicer", folder: "26-Fruit-Slicer-Game", icon: "🍉", theme: "action" },
    { name: "Quiz Game", folder: "27-Quiz-Game", icon: "🧠", theme: "puzzle" },
    { name: "Emoji Catcher", folder: "28-Emoji-Catcher-Game", icon: "😄", theme: "action" },
    { name: "Whack A Mole", folder: "29-Whack-A-Mole-Game", icon: "🔨", theme: "action" },
    { name: "Simon Says", folder: "30-Simon-Says-Game", icon: "🎨", theme: "logic" }
  ];

  const grid = document.getElementById('games-grid');
  const player = document.getElementById('player');
  const backBtn = document.getElementById('back-btn');
  const gameName = document.getElementById('game-name');
  const gameFrame = document.getElementById('game-frame');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const themeSelect = document.getElementById('theme-select');

  function renderGames(gameList) {
    grid.innerHTML = '';
    if (gameList.length === 0) {
      grid.innerHTML = '<p style="color:#fff; text-align:center; grid-column: 1/-1;">No games found.</p>';
      return;
    }
    gameList.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.innerHTML = `
        <div class="game-icon">${game.icon}</div>
        <div class="game-title">${game.name}</div>
      `;
      card.addEventListener('click', () => loadGame(game));
      grid.appendChild(card);
    });
  }

  function loadGame(game) {
    document.querySelector('.container').style.display = 'none';
    player.classList.remove('hidden');
    gameName.textContent = game.name;
    gameFrame.src = `games/${game.folder}/index.html`;
  }

  function goBack() {
    document.querySelector('.container').style.display = 'block';
    player.classList.add('hidden');
    gameFrame.src = '';
  }

  function filterGames() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedTheme = themeSelect.value;
    const filteredGames = games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm);
      const matchesTheme = selectedTheme === 'all' || game.theme === selectedTheme;
      return matchesSearch && matchesTheme;
    });
    renderGames(filteredGames);
  }

  backBtn.addEventListener('click', goBack);
  searchBtn.addEventListener('click', filterGames);
  searchInput.addEventListener('input', filterGames);
  themeSelect.addEventListener('change', filterGames);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !player.classList.contains('hidden')) goBack();
  });

  renderGames(games);

  // Chatbot functionality
  const chatBtn = document.getElementById('chatbot-btn');
  const chatBox = document.getElementById('chatbot-widget');
  const chatInput = document.getElementById('chat-input');
  const chatLog = document.getElementById('chat-log');
  const chatSend = document.getElementById('chat-send');
  const chatVoice = document.getElementById('chat-voice');
  const closeChat = document.getElementById('close-chat');
  const greeting = document.getElementById('chat-greeting');

  chatBtn.addEventListener('click', () => {
    chatBox.classList.remove('hidden');
    chatBtn.classList.add('hidden');
    greeting.classList.add('hide');
  });

  closeChat.addEventListener('click', () => {
    chatBox.classList.add('hidden');
    chatBtn.classList.remove('hidden');

    greeting.classList.remove('hide');
    void greeting.offsetWidth; // trigger reflow
    greeting.classList.add('hide');

    setTimeout(() => {
      greeting.classList.remove('hide');
    }, 100);
  });

  function appendMessage(from, text) {
    const msg = document.createElement('div');
    msg.innerHTML = `<strong>${from}:</strong> ${text}`;
    msg.style.color = from === "Bot" ? "#000" : "#333";
    msg.style.marginBottom = "8px";
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  chatSend.addEventListener('click', async () => {
    const input = chatInput.value.trim();
    if (!input) return;
    appendMessage("You", input);
    chatInput.value = "";

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input })
      });
      const data = await res.json();
      appendMessage("Bot", data.answer);
    } catch (err) {
      appendMessage("Bot", "⚠️ Could not connect to chatbot server.");
    }
  });

  chatVoice.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      chatInput.value = transcript;
      chatSend.click();
    };
    recognition.start();
  });
});

