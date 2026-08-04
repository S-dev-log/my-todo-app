import sqlite3
import unicodedata
from model.model import add_task

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
        print("1. タスク一覧を見る・変更する・削除する")
        print("2. タスクを追加する")
        print("3. アプリを終了する")
        
        # Enterで終了することがひと目で分かる親切設計
        raw_choice = input("番号を選んでください (1-3、Enterで終了): ")
        choice = unicodedata.normalize("NFKC", raw_choice)

        # メインメニューで空エンターが押されたら安全にアプリを終了する
        if choice.strip() == "":
            print("\nアプリを終了します。お疲れ様でした！")
            conn.close()
            break

        if choice == "1":
            while True:
                # 一覧表示 ＆ 操作ループ
                cursor.execute("SELECT * FROM tasks")
                tasks = cursor.fetchall()
                if not tasks:
                    print("\n現在、登録されているタスクはありません。")
                    break
                
                print("\n--- 【タスク一覧】 ---")
                task_map = {}
                for index, task in enumerate(tasks, start=1):
                    task_map[index] = task[0]
                    print(f"{index}. 内容: {task[1]} | 状態: {task[2]}")
                
                raw_target_num = input("\n操作したいタスクの番号を入力してください（0またはEnterでメニューに戻る）: ")
                
                # 空エンター、または "0" が入力されたら安全にメインメニューに戻る
                if raw_target_num.strip() == "" or raw_target_num.strip() == "0":
                    print("\nメインメニューに戻ります。")
                    break
                
                # 入力された番号を数値に変換
                try:
                    target_num = int(unicodedata.normalize("NFKC", raw_target_num))
                except ValueError:
                    print("\n[!] 有効な数字を入力してください。")
                    continue

                # 存在チェック
                if target_num not in task_map:
                    print(f"\n[!] 番号 '{target_num}' のタスクは存在しません。正しい番号を選んでください。")
                    continue
                
                # データベースの本当のIDを取り出す
                target_id = task_map[target_num]
                
                # サブメニュー（変更・削除）
                while True:
                    print(f"\n--- 選択されたタスク (画面番号: {target_num}) ---")
                    print("1: タスクの内容（タイトル）を変更する")
                    print("2: ステータスを「未完了」にする")
                    print("3: ステータスを「作業中」にする")
                    print("4: ステータスを「完了」にする")
                    print("5: このタスクを削除する")
                    print("0: 一覧に戻る（キャンセル）")
                    
                    raw_sub_choice = input("番号を選んでください (1-5, 0で戻る): ")
                    sub_choice = unicodedata.normalize("NFKC", raw_sub_choice)
                    
                    if sub_choice == "0":
                        print("\n一覧に戻ります。")
                        break
                    
                    if sub_choice == "1":
                        # 内容の変更
                        new_title = input("新しいタスクの内容を入力してください（空エンターでキャンセル）: ")
                        if new_title.strip() == "":
                            print("\n内容が空のため、変更をキャンセルしました。")
                            continue
                        cursor.execute("""
                            UPDATE tasks
                            SET title = ?
                            WHERE id = ?
                        """, (new_title, target_id))
                        conn.commit()
                        print(f"\n[OK] 番号 {target_num} の内容を「{new_title}」に変更しました！")
                        break

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
                        print(f"\n[OK] 番号 {target_num} のステータスを「{new_status}」に更新しました！")
                        break
                        
                    elif sub_choice == "5":
                        # 削除
                        cursor.execute("""
                            DELETE FROM tasks
                            WHERE id = ?
                        """, (target_id,))
                        conn.commit()
                        print(f"\n[DEL] 番号 {target_num} のタスクを削除しました！")
                        break
                    else:
                        print("\n[!] 無効な番号です。1〜5または0を選んでください。")
                        continue

        elif choice == "2":
            # タスク追加
            new_task = input("\n追加するタスクの内容を入力してください: ")
            if new_task.strip() == "":
                print("[!] タスクの内容が空です。")
                continue
            
            add_task(new_task)
            print(f"[OK] 「{new_task}」を追加しました！")
            
        elif choice == "3":
            print("\nアプリを終了します。お疲れ様でした！")
            conn.close()
            break
        else:
            print("\n[!] 1から3の番号で選んでください。")

if __name__ == "__main__":
    main()