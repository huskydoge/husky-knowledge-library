---
title: "Latex Reference"
tags: [latex, writing]
---

## How to refer url in latex with ref.bib

在导言去加入url包，及\usepackage{url}

利用misc文献类型来书写网址参考文献，在bib文件中加入

```
@misc{trial,
author = {husky},
title = {husky Woof},
howpublished = {\url{http://huskydoge.github.io}}
}
```

其中author是作者，title是题目，howpublished就是要引用的网址。

