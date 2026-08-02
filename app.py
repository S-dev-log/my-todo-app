from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

def get_tasks_from_db():
    try:
        # with文を使うことで、処理が終わったら（エラーが起きても）自動的にコネクションが閉じられます
        with sqlite3.connect('todo.db') as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT id, title, status FROM tasks')
            rows = cursor.fetchall()
            
        tasks = []
        for row in rows:
            tasks.append({
                "id": row[0],
                "title": row[1],
                "status": row[2]
            })
        return tasks
        
    except sqlite3.Error as e:
        # データベースで何かエラーが起きたとき、アプリを落とさずにエラー内容を表示して空のリストを返す
        print(f"データベースエラーが発生しました: {e}")
        return []

@app.route('/api/tasks', methods=['GET'])
def api_get_tasks():
    tasks = get_tasks_from_db()
    return jsonify(tasks)

if __name__ == '__main__':
    app.run(debug=True, port=5000)