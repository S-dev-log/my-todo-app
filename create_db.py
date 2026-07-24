import sqlite3

# データベースファイルを作成して接続する（同名ファイルがなければ新しく作られます）
conn = sqlite3.connect("todo.db")

print("todo.db データベースを作成しました！")

# 接続を閉じる
conn.close()