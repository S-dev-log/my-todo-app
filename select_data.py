import sqlite3

# 1. データベースに接続する
conn = sqlite3.connect("todo.db")
cursor = conn.cursor()

# 2. tasks表からすべてのデータを「取得（セレクト）」するSQL
cursor.execute("SELECT * FROM tasks")

# 3. 取得したデータをすべてPython側で受け取る
rows = cursor.fetchall()

# 4. 受け取ったデータを1行ずつ画面に表示する
for row in rows:
    print(row)

# 5. 接続を閉じる
conn.close()