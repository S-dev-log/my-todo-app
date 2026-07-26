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

        // 2. 削除ボタンを作る
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.style.marginLeft = '10px';
        
        // 削除ボタンが押されたらリストから消す
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        // 3. li要素の中に削除ボタンを組み込む
        li.appendChild(deleteBtn);

        // 4. todoList（ul要素）の中にli要素を追加する
        todoList.appendChild(li);

        // 5. 入力欄を空っぽに戻す
        todoInput.value = "";
    }
});