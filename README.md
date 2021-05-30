# 安装教程(Linux)
## 1. 安装node.js(内置npm)

- 安装nvm  
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`  
(参考https://github.com/nvm-sh/nvm#installing-and-updating)

- 安装node  
`nvm install node`  

- 查看node和npm版本(验证安装成功)  
`node --version`  
`npm --version`

## 2. 安装yarn  
`npm install --global yarn`  
`yarn --version`  

## 3. 安装相关依赖
`yarn add antd`  
`npm install axios`  

## 4. 安装flask  
`pip install flask`

## 5. 启动  
- shell1  
`cd react_demo/frontend`  
`yarn start`
- shell2  
`cd react_demo/backend`  
`flask run`