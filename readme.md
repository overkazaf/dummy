#Dummy
###a tiny dummy data generator
- 提供BaseRules.js， 暴露出公用的生成API，如HTTPCode, HTTPCodeResponse, RandArrayItem, RandNumber, FormatDate等
- 允许用户扩展自定义API
- 采用面向配置项的编程思想

##模型依赖问题
如:
    -modela中的某个k-v依赖了modelb
    -models中的某个k-v依赖了modela

```需要解环```