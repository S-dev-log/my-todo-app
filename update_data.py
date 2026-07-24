import sqlite3
import unicodedata  # 全角・半角を変換するための道具をインポート

# 1. データベースに接続する
conn = sqlite3.connect("todo.db")
cursor = conn.cursor()

# 2. 変更したいタスクのIDを入力してもらう（全角を半角に変換）
raw_target_id = input("更新したいタスクのID番号を入力してください: ")
# ユーザが打った全角数字を半角に直す
target_id = unicodedata.normalize("NFKC", raw_target_id)

# 3. メニューからステータスを選んでもらう
print("--- ステータスを選んでください ---")
print("1: 未完了")
print("2: 作業中")
print("3: 完了")

raw_choice = input("番号を入力 (1-3): ")
# ここでも全角で「１」とか打たれても大丈夫なように半角に変換する
choice = unicodedata.normalize("NFKC", raw_choice)

# 選んだ番号に合わせて、データベースに入れる文字を決める
if choice == "1":
    new_status = "未完了"
elif choice == "2":
    new_status = "作業中"
elif choice == "3":
    new_status = "完了"
else:
    print("無効な番号です。処理を中止します。")
    conn.close()
    exit()

# 4. データを更新するSQLを実行
cursor.execute("""
    UPDATE tasks 
    SET status = ? 
    WHERE id = ?
""", (new_status, target_id))

# 5. 変更を保存して接続を閉じる
conn.commit()
conn.close()

print(f"ID: {target_id} のステータスを「{new_status}」に更新しました！")