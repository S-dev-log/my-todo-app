// HTMLの要素を取得する
const todoInput = document.getElementById('todoInput');
const genreSelect = document.getElementById('genreSelect');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 追加ボタンが押されたときの処理
addBtn.addEventListener('click', function() {
    const taskText = todoInput.value.trim();
    const genre = genreSelect.value;
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    // 入力が空じゃなかったら追加する
    if (taskText !== "") {
        // 1. li要素を作る
        const li = document.createElement('li');

        // タスク情報をまとめるコンテナ
        const taskInfoDiv = document.createElement('div');
        taskInfoDiv.className = 'task-info';

        // メインのテキスト
        const textSpan = document.createElement('span');
        textSpan.className = 'task-main-text';
        textSpan.textContent = taskText;

        // サブ情報（ジャンル・優先度・予定日）
        const subInfoDiv = document.createElement('div');
        subInfoDiv.className = 'task-sub-info';

        const genreBadge = document.createElement('span');
        genreBadge.className = 'badge-genre';
        genreBadge.textContent = genre;

        const priorityBadge = document.createElement('span');
        if (priority === '高') priorityBadge.className = 'badge-priority-high';
        else if (priority === '中') priorityBadge.className = 'badge-priority-mid';
        else priorityBadge.className = 'badge-priority-low';
        priorityBadge.textContent = `優先度: ${priority}`;

        subInfoDiv.appendChild(genreBadge);
        subInfoDiv.appendChild(priorityBadge);

        const dateSpan = document.createElement('span');
        if (dueDate) {
            dateSpan.textContent = `予定: ${dueDate}`;
            subInfoDiv.appendChild(dateSpan);
        }

        taskInfoDiv.appendChild(textSpan);
        taskInfoDiv.appendChild(subInfoDiv);
        li.appendChild(taskInfoDiv);

        // ボタンをまとめるコンテナ
        const btnContainer = document.createElement('div');
        btnContainer.className = 'task-buttons';

        // 編集ボタン（タスク名だけでなく、付随する情報もまとめて編集できるように拡張）
        const editBtn = document.createElement('button');
        editBtn.textContent = '編集';
        editBtn.className = 'edit-btn';
        
        editBtn.addEventListener('click', function() {
            // 1. タスク名の編集
            const newTaskText = prompt("タスク名を編集してください:", textSpan.textContent);
            if (newTaskText === null) return; // キャンセルされたら終了

            // 2. ジャンルの編集（仕事 / プライベート / 学習 / その他）
            const newGenre = prompt("ジャンルを編集してください (仕事 / プライベート / 学習 / その他):", genreBadge.textContent);
            if (newGenre === null) return;

            // 3. 優先度の編集（高 / 中 / 低）
            const currentPriorityText = priorityBadge.textContent.replace('優先度: ', '');
            const newPriority = prompt("優先度を編集してください (高 / 中 / 低):", currentPriorityText);
            if (newPriority === null) return;

            // 4. 予定日の編集
            const currentDateText = dateSpan.textContent ? dateSpan.textContent.replace('予定: ', '') : '';
            const newDueDate = prompt("予定日を編集してください (YYYY-MM-DD):", currentDateText);
            if (newDueDate === null) return;

            // 反映処理
            if (newTaskText.trim() !== "") {
                textSpan.textContent = newTaskText.trim();
            }
            if (newGenre.trim() !== "") {
                genreBadge.textContent = newGenre.trim();
            }
            if (['高', '中', '低'].includes(newPriority.trim())) {
                const pVal = newPriority.trim();
                priorityBadge.className = ''; // クラスリセット
                if (pVal === '高') priorityBadge.className = 'badge-priority-high';
                else if (pVal === '中') priorityBadge.className = 'badge-priority-mid';
                else priorityBadge.className = 'badge-priority-low';
                priorityBadge.textContent = `優先度: ${pVal}`;
            }
            if (newDueDate.trim() !== "") {
                dateSpan.textContent = `予定: ${newDueDate.trim()}`;
                if (!subInfoDiv.contains(dateSpan)) {
                    subInfoDiv.appendChild(dateSpan);
                }
            } else {
                dateSpan.textContent = "";
            }
        });

        // 削除ボタン
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.className = 'delete-btn';
        
        deleteBtn.addEventListener('click', function() {
            if (confirm("このタスクを削除してもよろしいですか？")) {
                li.remove();
            }
        });

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        li.appendChild(btnContainer);

        // todoListの中にli要素を追加する
        todoList.appendChild(li);

        // 入力欄をリセット
        todoInput.value = "";
        dueDateInput.value = "";
    }
});