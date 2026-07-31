from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

def get_tasks_from_db():
    conn = sqlite3.connect('todo.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, title, status FROM tasks')
    rows = cursor.fetchall()
    conn.close()
    
    tasks = []
    for row in rows:
        tasks.append({
            "id": row[0],
            "title": row[1],
            "status": row[2]
        })
    return tasks

@app.route('/api/tasks', methods=['GET'])
def api_get_tasks():
    tasks = get_tasks_from_db()
    return jsonify(tasks)

if __name__ == '__main__':
    app.run(debug=True, port=5000)