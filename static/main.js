// HTMLの要素を取得する
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 追加ボタンが押されたときの処理
addBtn.addEventListener('click', function() {
    const taskText = todoInput.value.trim();

    // 入力が空じゃなかったら追加する
    if (taskText !== "") {
        // 1. li要素（リストの項目）を作る
        const li = document.createElement('li');
        li.textContent = taskText;

        // --- 【新規追加】 編集ボタンを作る ---
        const editBtn = document.createElement('button');
        editBtn.textContent = '編集';
        editBtn.style.marginLeft = '10px';

        // 編集ボタンが押されたときの処理
        editBtn.addEventListener('click', function() {
            // プロンプト（入力ダイアログ）を出して新しいテキストを入力してもらう
            const newTaskText = prompt("タスクを編集してください:", li.firstChild.textContent);
            
            // 入力されていて、空じゃなければ書き換える
            if (newTaskText !== null && newTaskText.trim() !== "") {
                li.firstChild.textContent = newTaskText.trim();
            }
        });

        // 2. 削除ボタンを作る
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.style.marginLeft = '5px'; // ボタン同士の間隔を少し調整
        
        // 削除ボタンが押されたらリストから消す
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        // 3. li要素の中に編集ボタンと削除ボタンを組み込む
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        // 4. todoList（ul要素）の中にli要素を追加する
        todoList.appendChild(li);

        // 5. 入力欄を空っぽに戻す
        todoInput.value = "";
    }
});