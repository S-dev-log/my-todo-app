import sqlite3

# データベースに接続してタスクを追加する関数（モデルの役割）
def add_task(title):
    conn = sqlite3.connect("todo.db")
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO tasks (title, status)
        VALUES (?, '未完了')
    """, (title,))
    
    conn.commit()
    conn.close()