import sqlite3

# 1. データベースに接続する
conn = sqlite3.connect("todo.db")
cursor = conn.cursor()

# 2. データを削除するSQL
# IDが1のデータを削除する
cursor.execute("""
    DELETE FROM tasks
    WHERE id = 1
""")

# 3. 変更を保存して接続を閉じる
conn.commit()
conn.close()

print("データを削除しました！")