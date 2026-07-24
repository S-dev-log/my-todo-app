import sqlite3

# 1. データベースに接続する（すでに「todo.db」があれば、それに繋がります）
conn = sqlite3.connect("todo.db")

# 2. データベースを操作するための「カーソル」という作業員を作る
cursor = conn.cursor()

# 3. SQLを使って「表（テーブル）」を作る命令を準備する
# tasksという名前の表を作ります
cursor.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT NOT NULL
    )
""")

print("tasks テーブルを作成しました！")

# 4. 変更を保存（コミット）して、接続を閉じる
conn.commit()
conn.close()