import sqlite3

def main():
    # 1. データベースに接続し、テーブルがなければ作成する
    conn = sqlite3.connect("todo.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            status TEXT NOT NULL
        )
    """)
    conn.commit()

    while True:
        print("\n=== TODOアプリ ===")
        print("1. タスク一覧を見る")
        print("2. タスクを追加する")
        print("3. タスクを完了にする")
        print("4. アプリを終了する")
        
        choice = input("番号を選んでください (1-4): ")

        if choice == "1":
            # 一覧表示
            cursor.execute("SELECT * FROM tasks")
            tasks = cursor.fetchall()
            if not tasks:
                print("\n現在、登録されているタスクはありません。")
            else:
                print("\n--- 【タスク一覧】 ---")
                for task in tasks:
                    print(f"ID: {task[0]} | 内容: {task[1]} | 状態: {task[2]}")

        elif choice == "2":
            # タスク追加
            new_task = input("\n追加するタスクの内容を入力してください: ")
            if new_task.strip() == "":
                print("タスクの内容が空です。")
                continue
            cursor.execute("""
                INSERT INTO tasks (title, status)
                VALUES (?, '未完了')
            """, (new_task,))
            conn.commit()
            print(f"「{new_task}」を追加しました！")

        elif choice == "3":
            # タスク完了更新
            cursor.execute("SELECT * FROM tasks")
            tasks = cursor.fetchall()
            if not tasks:
                print("\n完了にできるタスクがありません。")
                continue
            
            print("\n--- 【タスク一覧】 ---")
            for task in tasks:
                print(f"ID: {task[0]} | 内容: {task[1]} | 状態: {task[2]}")
            
            target_id = input("\n完了にするタスクのIDを入力してください: ")
            cursor.execute("""
                UPDATE tasks
                SET status = '完了'
                WHERE id = ?
            """, (target_id,))
            conn.commit()
            print(f"ID: {target_id} のタスクを「完了」に更新しました！")

        elif choice == "4":
            print("\nアプリを終了します。お疲れ様でした！")
            conn.close()
            break
        else:
            print("\n1から4の番号で選んでください。")

if __name__ == "__main__":
    main()