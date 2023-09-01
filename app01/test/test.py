import torch
#测试
def test(x, thetas):
    max_value = -100000
    index_of_max_value = -1
    for j in range(len(thetas)):
        classification = thetas[j] @ x
        if classification > max_value:
            max_value = classification
            index_of_max_value = j
    return index_of_max_value