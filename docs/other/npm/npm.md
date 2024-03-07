## 项目npm install时报依赖项版本不兼容的解析错误
::: tip 问题说明：
当运行npm install时报以下错误：

npm ERR! code ERESOLVE

npm ERR! ERESOLVE unable to resolve dependency tree

npm ERR!

npm ERR! Could not resolve dependency:

npm ERR! peer html-webpack-plugin@"^3.0.0 || ^4.0.0" from script-ext-html-webpack-plugin@2.1.5

npm ERR! node_modules/script-ext-html-webpack-plugin

npm ERR! dev script-ext-html-webpack-plugin@"2.1.5" from the root project

npm ERR!

npm ERR! Fix the upstream dependency conflict, or retry

npm ERR! this command with --force, or --legacy-peer-deps

npm ERR! to accept an incorrect (and potentially broken) dependency resolution.

npm ERR!

npm ERR! See C:\Users\USER\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:

npm ERR! C:\Users\USER\AppData\Local\npm-cache\_logs\2024-02-26T07_50_59_769Z-debug-0.log
:::
1.强制解析依赖项：你可以使用 npm install 命令时添加 --force 参数，尝试强制解析依赖项。例如：npm install --force

2.使用旧版本依赖项：尝试降低 html-webpack-plugin 的版本到 3.0.0 或 4.0.0，以匹配 script-ext-html-webpack-plugin 的要求。你可以手动编辑 package.json 文件，然后再次运行 npm install。

3.使用 --legacy-peer-deps 参数：在运行 npm install 命令时，可以尝试添加 --legacy-peer-deps 参数，以接受不兼容的依赖解析。例如：npm install --legacy-peer-deps