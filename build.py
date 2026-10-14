from pathlib import Path
import json
p=Path(__file__).resolve().parent
s=(p/'shell.html').read_text()
for name,file in [('STYLES','styles.css'),('DATA','questions.json'),('CORE','core.js'),('APP','app.js')]:
 text=(p/file).read_text()
 if name=='DATA': text=json.dumps(json.loads(text),ensure_ascii=False).replace('<','\\u003c')
 s=s.replace('/*'+name+'*/',text)
(p/'index.html').write_text(s)
print('Built self-contained index.html; no dependencies or internet required.')
