function sendMoveToServer(row, col) {
    // マス目の座標をサーバーに送信
    fetch('/game/move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ row: row, col: col }) // 行と列をサーバーに送信
    })
    .then(response => response.json()) // サーバーからのレスポンスをJSONで受け取る
    .then(data => {
        // サーバーから返ってきたデータを使ってクライアント側のボードを更新
        updateBoard(data.board);
        
        setTimeout(() => {
            // 結果を表示
            if (data.winner == 1) {
                alert("あなたの勝ちです");
                window.location.href = "/game/end";
            } else if (data.winner == 2) {
                alert("あなたの負けです");
                window.location.href = "/game/end";
            }
        },300)
        

        if (data.Invalid) {
            alert('無効な操作');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました');
        window.location.href = '/game/end';
    });
}

function updateBoard(board) {
    // ボード状態をもとに画面上のボードを更新する
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const cell = tableCells[row * 3 + col]; // 対応する<td>要素を取得
            let content;
            switch(board[row][col]) {
                case 0:
                    content = '';
                    break;
                case 1:
                    content = '○';
                    break;
                case 2:
                    content = '×';
                    break;
            }
            cell.textContent = content;
        }
    }
}

// ボードをリセットするためのAPIを呼び出す
function resetGame() {
    fetch('/game/reset', {
        method: 'GET',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
    .then(response => response.json()) // サーバーからのレスポンスをJSONで受け取る
    .then(data => {
        if (data.status === 'reset') {
            // クライアント側のボードも初期化
            updateBoard([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
            alert("リセットしました");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// プレイヤーがマスをクリックしたときの処理
const tableCells = document.querySelectorAll('.board td');
tableCells.forEach(cell => {
    cell.addEventListener('click', (event) => {
        const row = cell.parentElement.rowIndex; // 行
        const col = cell.cellIndex % 3; // 列

        // クリックされた<td>要素を取得
        const targetCell = event.target;

        // クリックされたマスが空白か検証
        if (targetCell.textContent === "") {
            targetCell.textContent = "○";
            sendMoveToServer(row,col);
        } else {
            alert("無効な操作");
        }

        
    });
});

