import sqlite3

# 1. データベースに接続する
conn = sqlite3.connect("todo.db")
cursor = conn.cursor()

# 2. データを更新（アップデート）するSQL
# IDが1のデータの「status」を「未完了」から「完了」に変更する
cursor.execute("""
    UPDATE tasks
    SET status = '完了'
    WHERE id = 1
""")

# 3. 変更を保存して接続を閉じる
conn.commit()
conn.close()

print("データを更新しました！")