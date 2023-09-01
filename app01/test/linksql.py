#导入sqllite3模块
import sqlite3
import numpy as np
def loadtrain():
    # 1.硬盘上创建连接
    con = sqlite3.connect('/Users/christy277/Downloads/Dealer-main/Back End/db.sqlite3')
    # 获取cursor对象
    cur = con.cursor()
    # 执行sql创建表
    sql = 'select * from dealer_trainiris'
    # sql = 'select * from dealer_trainiris where id=0'
    try:
        cur.execute(sql)
        # 获取所有数据
        person_all = cur.fetchall()
        person_all = np.array(person_all)
    except Exception as e:
        print(e)
        print('查询失败')
    # 关闭游标
    cur.close()
    # 关闭连接
    con.close()
    return person_all