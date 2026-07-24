import sqlite3

# 1. データベースに接続する
conn = sqlite3.connect("todo.db")
cursor = conn.cursor()

# 2. tasks表に新しいデータを挿入（インサート）するSQL
# タイトルは「牛乳を買う」、ステータスは「未完了」にします
cursor.execute("""
    INSERT INTO tasks (title, status)
    VALUES ('牛乳を買う', '未完了')
""")

# 3. 変更を保存して接続を閉じる
conn.commit()
conn.close()

print("データを追加しました！")