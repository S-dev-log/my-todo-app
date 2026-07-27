// HTMLの要素を取得する
const todoInput = document.getElementById('todoInput');
const genreSelect = document.getElementById('genreSelect');
const prioritySelect = document.getElementById('prioritySelect');
const startDateInput = document.getElementById('startDateInput');
const targetDateInput = document.getElementById('targetDateInput');
const deadlineDateInput = document.getElementById('deadlineDateInput');
const remind1Input = document.getElementById('remind1Input');
const remind2Input = document.getElementById('remind2Input');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 追加ボタンが押されたときの処理
addBtn.addEventListener('click', function() {
    const taskText = todoInput.value.trim();
    const genre = genreSelect.value;
    const priority = prioritySelect.value;
    const startDate = startDateInput.value;
    const targetDate = targetDateInput.value;
    const deadlineDate = deadlineDateInput.value;
    const remind1 = remind1Input.value;
    const remind2 = remind2Input.value;

    // 入力が空じゃなかったら追加する
    if (taskText !== "") {
        const li = document.createElement('li');

        // タスク情報をまとめるコンテナ（通常表示用）
        const taskInfoDiv = document.createElement('div');
        taskInfoDiv.className = 'task-info';

        // メインのテキスト
        const textSpan = document.createElement('span');
        textSpan.className = 'task-main-text';
        textSpan.textContent = taskText;

        // サブ情報（ジャンル・優先度・日付・リマインド）
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

        // 日付情報の表示生成
        const datesSpan = document.createElement('span');
        datesSpan.className = 'task-dates-display';
        let dateTexts = [];
        if (startDate) dateTexts.push(`開始: ${startDate}`);
        if (targetDate) dateTexts.push(`完了予定: ${targetDate}`);
        if (deadlineDate) dateTexts.push(`締め切り: ${deadlineDate}`);

        if (dateTexts.length > 0) {
            datesSpan.textContent = dateTexts.join(' / ');
            subInfoDiv.appendChild(datesSpan);
        }

        // リマインド情報の表示生成
        const remindSpan = document.createElement('span');
        remindSpan.className = 'task-remind-display';
        let remindTexts = [];
        if (remind1) remindTexts.push(`通知1: ${remind1}日前`);
        if (remind2) remindTexts.push(`通知2: ${remind2}日前`);

        if (remindTexts.length > 0) {
            remindSpan.textContent = `⏰ ${remindTexts.join(' ・ ')}`;
            subInfoDiv.appendChild(remindSpan);
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

        // 「編集」ボタンが押されたときの処理
        editBtn.addEventListener('click', function() {
            const currentText = textSpan.textContent;
            const currentGenre = genreBadge.textContent;
            const currentPriority = priorityBadge.textContent.replace('優先度: ', '');

            // 1. 一括変更できる入力フォームコンテナを作成
            const editContainer = document.createElement('div');
            editContainer.className = 'edit-form-container';

            const editInputText = document.createElement('input');
            editInputText.type = 'text';
            editInputText.className = 'edit-input-main';
            editInputText.value = currentText;

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

            editSubDiv.appendChild(editGenreSelect);
            editSubDiv.appendChild(editPrioritySelect);

            // 編集用の日付入力エリア
            const editDatesDiv = document.createElement('div');
            editDatesDiv.className = 'edit-dates-section';
            editDatesDiv.innerHTML = `
                <label>開始: <input type="date" id="editStartDate" value="${startDate || ''}"></label>
                <label>完了予定: <input type="date" id="editTargetDate" value="${targetDate || ''}"></label>
                <label>締め切り: <input type="date" id="editDeadlineDate" value="${deadlineDate || ''}"></label>
            `;

            // 編集用のリマインド入力エリア
            const editRemindDiv = document.createElement('div');
            editRemindDiv.className = 'edit-remind-section';
            editRemindDiv.innerHTML = `
                <span class="section-label">⏰ リマインド設定</span>
                <div class="remind-inputs">
                    <label>1回目: <input type="number" id="editRemind1" min="0" value="${remind1 || ''}" style="width: 50px;"> 日前</label>
                    <label>2回目: <input type="number" id="editRemind2" min="0" value="${remind2 || ''}" style="width: 50px;"> 日前</label>
                </div>
            `;

            editContainer.appendChild(editInputText);
            editContainer.appendChild(editSubDiv);
            editContainer.appendChild(editDatesDiv);
            editContainer.appendChild(editRemindDiv);

            // 2. 通常表示エリアを編集用フォームに置き換え
            li.replaceChild(editContainer, taskInfoDiv);

            // 3. ボタンを「保存」に切り替える
            editBtn.textContent = '保存';
            editBtn.className = 'edit-btn save-btn';

            const newEditBtn = editBtn.cloneNode(true);
            editBtn.replaceWith(newEditBtn);

            // 「保存」ボタンが押されたときの一括反映処理
            newEditBtn.addEventListener('click', function() {
                const newText = editInputText.value.trim();
                if (newText === "") {
                    alert("タスク名を入力してください！");
                    return;
                }

                // 新しい値を反映
                textSpan.textContent = newText;
                genreBadge.textContent = editGenreSelect.value;
                
                const newPrio = editPrioritySelect.value;
                priorityBadge.className = '';
                if (newPrio === '高') priorityBadge.className = 'badge-priority-high';
                else if (newPrio === '中') priorityBadge.className = 'badge-priority-mid';
                else priorityBadge.className = 'badge-priority-low';
                priorityBadge.textContent = `優先度: ${newPrio}`;

                // 編集後の日付を取得して更新
                const newStart = document.getElementById('editStartDate').value;
                const newTarget = document.getElementById('editTargetDate').value;
                const newDeadline = document.getElementById('editDeadlineDate').value;
                const newRemind1 = document.getElementById('editRemind1').value;
                const newRemind2 = document.getElementById('editRemind2').value;

                let newDateTexts = [];
                if (newStart) newDateTexts.push(`開始: ${newStart}`);
                if (newTarget) newDateTexts.push(`完了予定: ${newTarget}`);
                if (newDeadline) newDateTexts.push(`締め切り: ${newDeadline}`);

                if (newDateTexts.length > 0) {
                    datesSpan.textContent = newDateTexts.join(' / ');
                    if (!subInfoDiv.contains(datesSpan)) subInfoDiv.appendChild(datesSpan);
                } else {
                    datesSpan.textContent = "";
                    if (subInfoDiv.contains(datesSpan)) subInfoDiv.removeChild(datesSpan);
                }

                let newRemindTexts = [];
                if (newRemind1) newRemindTexts.push(`通知1: ${newRemind1}日前`);
                if (newRemind2) newRemindTexts.push(`通知2: ${newRemind2}日前`);

                if (newRemindTexts.length > 0) {
                    remindSpan.textContent = `⏰ ${newRemindTexts.join(' ・ ')}`;
                    if (!subInfoDiv.contains(remindSpan)) subInfoDiv.appendChild(remindSpan);
                } else {
                    remindSpan.textContent = "";
                    if (subInfoDiv.contains(remindSpan)) subInfoDiv.removeChild(remindSpan);
                }

                // 4. 元の通常表示に戻す
                li.replaceChild(taskInfoDiv, editContainer);

                // 5. ボタンを元の「編集」に戻す
                newEditBtn.textContent = '編集';
                newEditBtn.className = 'edit-btn';
            });
        });

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        li.appendChild(btnContainer);

        todoList.appendChild(li);

        // 入力欄をリセット
        todoInput.value = "";
        startDateInput.value = "";
        targetDateInput.value = "";
        deadlineDateInput.value = "";
        remind1Input.value = "";
        remind2Input.value = "";
    }
});