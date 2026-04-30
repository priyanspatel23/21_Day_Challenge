
// ── Questions ──────────────────────────────────────────────
const questions = [
    {
        q: "Which planet is closest to the Sun?",
        opts: ["Venus", "Mercury", "Mars", "Earth"], ans: 1,
        exp: "Mercury is the closest planet to the Sun."
    },
    {
        q: "What is the chemical symbol for water?",
        opts: ["WA", "H2O", "HO2", "OHH"], ans: 1,
        exp: "Water is H₂O — two hydrogen atoms and one oxygen."
    },
    {
        q: "Who invented the telephone?",
        opts: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Marconi"], ans: 2,
        exp: "Alexander Graham Bell patented the telephone in 1876."
    },
    {
        q: "How many continents are on Earth?",
        opts: ["5", "6", "7", "8"], ans: 2,
        exp: "There are 7 continents on Earth."
    },
    {
        q: "What is the capital of Japan?",
        opts: ["Seoul", "Beijing", "Bangkok", "Tokyo"], ans: 3,
        exp: "Tokyo is the capital and largest city of Japan."
    },
    {
        q: "What gas do plants absorb from the air?",
        opts: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], ans: 2,
        exp: "Plants absorb CO₂ during photosynthesis."
    },
    {
        q: "Which is the longest river in the world?",
        opts: ["Amazon", "Nile", "Yangtze", "Mississippi"], ans: 1,
        exp: "The Nile is generally considered the longest river."
    },
    {
        q: "What is 12 × 12?",
        opts: ["124", "144", "132", "148"], ans: 1,
        exp: "12 × 12 = 144."
    },
    {
        q: "Which country has the largest population?",
        opts: ["USA", "India", "China", "Brazil"], ans: 1,
        exp: "India recently surpassed China as the most populous country."
    },
    {
        q: "What is the hardest natural substance?",
        opts: ["Gold", "Iron", "Quartz", "Diamond"], ans: 3,
        exp: "Diamond is the hardest natural substance on Earth."
    }
];

// ── State ──────────────────────────────────────────────────
const TIME = 15;
let cur, score, answered, timeLeft, timerID, timeTaken;

// ── Helpers ────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }
function show(id) {
    ["start", "quiz", "result"].forEach(s => $(s).style.display = "none");
    $(id).style.display = "block";
}

// ── Start ──────────────────────────────────────────────────
function startQuiz() {
    cur = 0; score = 0; answered = false; timeTaken = [];
    show("quiz");
    loadQ();
}

// ── Load question ──────────────────────────────────────────
function loadQ() {
    answered = false;
    const q = questions[cur];

    $("q-label").textContent = `Question ${cur + 1} of ${questions.length}`;
    $("question").textContent = q.q;
    $("progress-fill").style.width = `${(cur / questions.length) * 100}%`;

    // clear feedback & next btn
    const fb = $("feedback");
    fb.className = "feedback";
    fb.textContent = "";
    $("next-btn").className = "";

    // build options
    const cont = $("options");
    cont.innerHTML = "";
    q.opts.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = opt;
        btn.onclick = () => pick(i);
        cont.appendChild(btn);
    });

    startTimer();
}

// ── Timer ──────────────────────────────────────────────────
function startTimer() {
    clearInterval(timerID);
    timeLeft = TIME;
    updateTimer();
    timerID = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) { clearInterval(timerID); if (!answered) timeUp(); }
    }, 1000);
}

function updateTimer() {
    $("timer").textContent = timeLeft;
    $("timer").className = timeLeft <= 5 ? "timer warn" : "timer";
}

// ── Pick answer ────────────────────────────────────────────
function pick(idx) {
    if (answered) return;
    answered = true;
    clearInterval(timerID);
    timeTaken.push(TIME - timeLeft);

    const q = questions[cur];
    const btns = document.querySelectorAll(".option");
    btns.forEach(b => b.disabled = true);

    if (idx === q.ans) {
        score++;
        btns[idx].classList.add("correct");
        showFeedback(true, q.exp);
    } else {
        btns[idx].classList.add("wrong");
        btns[q.ans].classList.add("correct");
        showFeedback(false, q.exp);
    }
    $("next-btn").className = "show";
}

function timeUp() {
    answered = true;
    timeTaken.push(TIME);
    const q = questions[cur];
    const btns = document.querySelectorAll(".option");
    btns.forEach(b => b.disabled = true);
    btns[q.ans].classList.add("correct");
    showFeedback(false, "Time's up! " + q.exp);
    $("next-btn").className = "show";
}

function showFeedback(ok, msg) {
    const fb = $("feedback");
    fb.className = "feedback show " + (ok ? "ok" : "bad");
    fb.textContent = (ok ? "✓ Correct! " : "✗ Wrong. ") + msg;
}

// ── Next ───────────────────────────────────────────────────
function nextQ() {
    cur++;
    if (cur >= questions.length) showResult();
    else loadQ();
}

// ── Result ─────────────────────────────────────────────────
function showResult() {
    clearInterval(timerID);
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const avg = timeTaken.length
        ? Math.round(timeTaken.reduce((a, b) => a + b, 0) / timeTaken.length)
        : 0;

    $("score-pct").textContent = pct + "%";
    $("s-correct").textContent = score;
    $("s-wrong").textContent = total - score;
    $("s-avg").textContent = avg + "s";

    const msgs = [
        ["Keep going!", "Practice makes perfect — don't give up!"],
        ["Good try!", "You're getting there, keep at it!"],
        ["Well done!", "Solid result! A little more study will get you to the top."],
        ["Great job!", "Really impressive — almost perfect!"],
        ["Perfect!", "You got every single question right!"]
    ];
    const tier = pct === 100 ? 4 : pct >= 80 ? 3 : pct >= 60 ? 2 : pct >= 40 ? 1 : 0;
    $("result-title").textContent = msgs[tier][0];
    $("result-msg").textContent = msgs[tier][1];

    show("result");
}