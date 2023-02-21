X = [5,8]
Y = [8,9]

B = [-0.250, 1.5]
alpha = 0.001

res = [B[1] * X[i] + B[0] for i in range(len(X))]


def mse(x, y):
    temp = 0
    for i in range(len(x)):
        temp += (y[i] - x[i]) ** 2
    return temp / len(x)

print(mse(res, Y))

def dev_part_b1(x, y):
    temp = 0
    for i in range(len(x)):
        temp += -2 * x[i] * (y[i] - (B[0] + B[1] * x[i]))
    return temp / len(x)


def dev_part_b0(x, y):
    temp = 0
    for i in range(len(x)):
        temp += -2 * (y[i] - (B[0] + B[1] * x[i]))
    return temp / len(x)

B = [B[0] - alpha * dev_part_b0(X, Y), B[1] - alpha * dev_part_b1(X, Y)]
print(B)

res = [B[1] * X[i] + B[0] for i in range(len(X))]
print(mse(res, Y))


X = [20]


for i in range(100):
    X.append(X[i] - X[i] * 0.05)
    
from matplotlib import pyplot as plt

plt.plot(X, color="green")
plt.show()

