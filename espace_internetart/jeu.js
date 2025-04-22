document.addEventListener("DOMContentLoaded", () => {
    const gridSize = 10;
    const virusCount = 15;
    let gameOver = false;

    const gameContainer = document.getElementById("game-container");
    const restartButton = document.getElementById("restart");

    let grid = [];

    function createGrid() {
        gameContainer.innerHTML = "";
        grid = [];

        for (let i = 0; i < gridSize; i++) {
            grid[i] = [];
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", () => revealCell(i, j));
                gameContainer.appendChild(cell);
                grid[i][j] = { element: cell, virus: false, revealed: false };
            }
        }

        placeViruses();
    }

    function placeViruses() {
        let placed = 0;
        while (placed < virusCount) {
            let row = Math.floor(Math.random() * gridSize);
            let col = Math.floor(Math.random() * gridSize);
            if (!grid[row][col].virus) {
                grid[row][col].virus = true;
                placed++;
            }
        }
    }

    function revealCell(row, col) {
        if (gameOver || grid[row][col].revealed) return;

        grid[row][col].revealed = true;
        const cell = grid[row][col].element;
        cell.classList.add("revealed");

        if (grid[row][col].virus) {
            cell.classList.add("virus");
            cell.textContent = "🦠";
            gameOver = true;
            alert("💀 Virus détecté ! Game Over !");
        } else {
            const icons = ["🌐", "📂", "📡", "🔒", "🖥️"];
            cell.textContent = icons[Math.floor(Math.random() * icons.length)];
        }
    }

    restartButton.addEventListener("click", () => {
        gameOver = false;
        createGrid();
    });

    createGrid();
});
