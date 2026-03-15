# Hi there, I'm Anna

##### If you have any problems with the project, please contact me [telegram](https://t.me/dzichonka/)

[Assignment: Data Processing CLI](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments-v2/02-data-processing-cli/assignment.md)

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGlheDhwdWZwOTRhdmw4eWZudXA4NHpzbnE3N2kxNGF3bzRwcTJveCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/iAIwyKeZlKBgIpH4TZ/giphy.gif" width=50> way to assets

`data-processing-cli/src/assets`

`cd IT/Node/data-processing-cli/src/assets`

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHhqY29zNmkycGJzOWFzZWY4cXlrczZ2aGF6cHRubHRtcnhocmhjciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/NEmydmd0cXFdj4ZH9m/giphy.gif" width=50> csv-to-json example

`csv-to-json --input data.csv --output data.json`

### <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjh3YXJ4Zm5uYzdmczBqNTUyMGVlc3ljeGc0MG0waHpxczhjNjlvOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/tR1ZZeJXR9RUDvaFVP/giphy.gif" width=50> json-to-csv example

`json-to-csv --input data.json --output data.csv`

### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2FsY2o0OG1xYTBzNGp5d29mb3Vjc28xazlqZzRqejU0eXlyOTlqaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/K9f1v11FGW76i4xwdn/giphy.gif" width=50> count example

`count --input file.txt`

### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTB2bGpwY2R6dWZwM3Fhcno2a2duZmloMWpidGh0b3o2NXVsY2o5YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/OFKgUAiirX0CPUJ3Jn/giphy.gif" width=50> hash examples

`hash --input file.txt`

`hash --input file.txt --algorithm md5`

`hash --input file.txt --save`

`hash --input file.txt --algorithm md5 --save`

`hash --input file.txt --algorithm sha512 --save`

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExajZwZ2Q0Y2Y5djI4YWVnb2ppM2w3am9yZjRmcWo5NXFud285a3k1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rrasLFSTyi4Th1e8Xo/giphy.gif" width=50> hash-compare examples

`hash-compare --input file.txt --hash file.sha256`

`hash-compare --input file.txt --hash file.md5 --algorithm md5`

`hash-compare --input file.txt --hash file.sha512 --algorithm sha512`

### <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWg4ZXBseGNsaW9saG9zNnoyMHc0OHJoYWtnNWhuczJna3BmNWNlbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/kGNldrILTzYKV5DvXX/giphy.gif" width=50> encrypt example

`encrypt --input file.txt --output file.txt.enc --password mySecret`

### <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3cwMG13NTJ6czdnZzAzN3JzdTQ4ZWlwNDU0ZnBiODczZDAwMjlyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/aWnEiVFcvTgIz7MuxG/giphy.gif" width=50> decrypt example

`decrypt --input file.txt.enc --output file.txt --password mySecret`

### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXhneDJyejBvb21oZDkzMzVzY2x5Z3k2ZnkzdHlzcHBuc2V2Y3Q4ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/XUA7ZZcBl0McuVqwd8/giphy.gif" width=50> log-stats example

`log-stats --input logs.txt --output stats.json`
