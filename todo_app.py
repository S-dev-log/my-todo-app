import sqlite3
import unicodedata

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
        print("1. タスク一覧を見る・変更する")
        print("2. タスクを追加する")
        print("3. アプリを終了する")
        
        raw_choice = input("番号を選んでください (1-3): ")
        choice = unicodedata.normalize("NFKC", raw_choice)

        if choice == "1":
            # 一覧表示 ＆ そのまま変更・削除へ
            cursor.execute("SELECT * FROM tasks")
            tasks = cursor.fetchall()
            if not tasks:
                print("\n現在、登録されているタスクはありません。")
                continue
            
            print("\n--- 【タスク一覧】 ---")
            for task in tasks:
                print(f"ID: {task[0]} | 内容: {task[1]} | 状態: {task[2]}")
            
            raw_target_id = input("\n変更・削除したいタスクのIDを入力してください（そのまま戻る場合はEnter）: ")
            if raw_target_id.strip() == "":
                continue
            
            target_id = unicodedata.normalize("NFKC", raw_target_id)
            
            print("\n--- どのような操作をしますか？ ---")
            print("1: タスクの内容（タイトル）を変更する")
            print("2: ステータスを「未完了」にする")
            print("3: ステータスを「作業中」にする")
            print("4: ステータスを「完了」にする")
            print("5: このタスクを削除する")
            
            raw_sub_choice = input("番号を選んでください (1-5): ")
            sub_choice = unicodedata.normalize("NFKC", raw_sub_choice)
            
            if sub_choice == "1":
                # 内容の変更
                new_title = input("新しいタスクの内容を入力してください: ")
                if new_title.strip() == "":
                    print("\n内容が空のため、変更をキャンセルしました。")
                    continue
                cursor.execute("""
                    UPDATE tasks
                    SET title = ?
                    WHERE id = ?
                """, (new_title, target_id))
                conn.commit()
                print(f"\nID: {target_id} の内容を「{new_title}」に変更しました！")

            elif sub_choice in ["2", "3", "4"]:
                # ステータスの変更
                if sub_choice == "2":
                    new_status = "未完了"
                elif sub_choice == "3":
                    new_status = "作業中"
                elif sub_choice == "4":
                    new_status = "完了"
                
                cursor.execute("""
                    UPDATE tasks
                    SET status = ?
                    WHERE id = ?
                """, (new_status, target_id))
                conn.commit()
                print(f"\nID: {target_id} のステータスを「{new_status}」に更新しました！")
                
            elif sub_choice == "5":
                # 削除
                cursor.execute("""
                    DELETE FROM tasks
                    WHERE id = ?
                """, (target_id,))
                conn.commit()
                print(f"\nID: {target_id} のタスクを削除しました！")
            else:
                print("\n無効な番号です。処理を中止します。")
                continue

            # 変更・削除した直後に最新の一覧を表示して、自動で最初（メインメニュー）に戻る
            cursor.execute("SELECT * FROM tasks")
            tasks = cursor.fetchall()
            print("\n--- 【更新後のタスク一覧】 ---")
            if not tasks:
                print("現在、登録されているタスクはありません。")
            else:
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
            print("\nアプリを終了します。お疲れ様でした！")
            conn.close()
            break
        else:
            print("\n1から3の番号で選んでください。")

if __name__ == "__main__":
    main()