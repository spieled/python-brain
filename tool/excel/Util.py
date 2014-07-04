def repeat_rows(filename="test.xls", columnText="姓名"):
    """
    # 请先安装xlrd模块
    # 读取一个excel文件，找到其中某列的值重复的行
    # 比如excel文件中有一列叫做“ID”，那么这一列的值要求不重复，如果有重复的，把他们找出来
    """
    import xlrd
    data = xlrd.open_workbook(filename)
    table = data.sheet_by_index(0)
    header = table.row_values(0) # 获取表头
    if columnText in header: index = header.index(columnText)
    else: return []
    map = {}
    for rowIndex in range(1, table.nrows):
        value = table.row_values(rowIndex)
        key = value[index]
        if not key in map: map[key] = []
        map[key].append(value)
    return [value for key, value in map.items() if len(value) > 1]

if __name__ == "__main__":
    print(u"重复的记录: ")
    for line in repeat_rows():
        print(line)