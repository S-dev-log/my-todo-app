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

        // タスク情報をまとめるコンテナ（通常表示用）
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

        // 編集ボタン
        const editBtn = document.createElement('button');
        editBtn.textContent = '編集';
        editBtn.className = 'edit-btn';
        
        // 削除ボタン
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.className = 'delete-btn';
        
        deleteBtn.addEventListener('click', function() {
            if (confirm("このタスクを削除してもよろしいですか？")) {
                li.remove();
            }
        });

        // 「編集」ボタンが押されたときの処理（カード丸ごと一括編集）
        editBtn.addEventListener('click', function() {
            // 現在の表示内容から値を取得しておく
            const currentText = textSpan.textContent;
            const currentGenre = genreBadge.textContent;
            const currentPriority = priorityBadge.textContent.replace('優先度: ', '');
            const currentDate = dateSpan.textContent ? dateSpan.textContent.replace('予定: ', '') : '';

            // 1. カード内すべてを一括変更できる入力フォームコンテナを作成
            const editContainer = document.createElement('div');
            editContainer.className = 'edit-form-container';

            // タスク名用のテキストボックス
            const editInputText = document.createElement('input');
            editInputText.type = 'text';
            editInputText.className = 'edit-input-main';
            editInputText.value = currentText;

            // ジャンル・優先度・予定日をまとめるサブエリア
            const editSubDiv = document.createElement('div');
            editSubDiv.className = 'edit-input-sub';

            // ジャンル選択
            const editGenreSelect = document.createElement('select');
            ['仕事', 'プライベート', '学習', 'その他'].forEach(g => {
                const opt = document.createElement('option');
                opt.value = g;
                opt.textContent = g;
                if (g === currentGenre) opt.selected = true;
                editGenreSelect.appendChild(opt);
            });

            // 優先度選択
            const editPrioritySelect = document.createElement('select');
            ['高', '中', '低'].forEach(p => {
                const opt = document.createElement('option');
                opt.value = p;
                opt.textContent = `優先度: ${p}`;
                if (p === currentPriority) opt.selected = true;
                editPrioritySelect.appendChild(opt);
            });

            // 予定日選択
            const editDateInput = document.createElement('input');
            editDateInput.type = 'date';
            editDateInput.value = currentDate;

            editSubDiv.appendChild(editGenreSelect);
            editSubDiv.appendChild(editPrioritySelect);
            editSubDiv.appendChild(editDateInput);

            editContainer.appendChild(editInputText);
            editContainer.appendChild(editSubDiv);

            // 2. 通常表示エリアを編集用フォームに丸ごと置き換える
            li.replaceChild(editContainer, taskInfoDiv);

            // 3. ボタンを「保存」に切り替える
            editBtn.textContent = '保存';
            editBtn.className = 'edit-btn save-btn';

            // イベント重複を防ぐためにクローンに置き換え
            const newEditBtn = editBtn.cloneNode(true);
            editBtn.replaceWith(newEditBtn);

            // 「保存」ボタンが押されたときの一括反映処理
            newEditBtn.addEventListener('click', function() {
                const newText = editInputText.value.trim();
                if (newText === "") {
                    alert("タスク名を入力してください！");
                    return;
                }

                // 各要素に新しい値を一括反映
                textSpan.textContent = newText;
                genreBadge.textContent = editGenreSelect.value;
                
                const newPrio = editPrioritySelect.value;
                priorityBadge.className = '';
                if (newPrio === '高') priorityBadge.className = 'badge-priority-high';
                else if (newPrio === '中') priorityBadge.className = 'badge-priority-mid';
                else priorityBadge.className = 'badge-priority-low';
                priorityBadge.textContent = `優先度: ${newPrio}`;

                const newDate = editDateInput.value;
                if (newDate) {
                    dateSpan.textContent = `予定: ${newDate}`;
                    if (!subInfoDiv.contains(dateSpan)) {
                        subInfoDiv.appendChild(dateSpan);
                    }
                } else {
                    dateSpan.textContent = "";
                    if (subInfoDiv.contains(dateSpan)) {
                        subInfoDiv.removeChild(dateSpan);
                    }
                }

                // 4. フォームから元の通常表示に戻す
                li.replaceChild(taskInfoDiv, editContainer);

                // 5. ボタンを元の「編集」に戻す
                newEditBtn.textContent = '編集';
                newEditBtn.className = 'edit-btn';
            });
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