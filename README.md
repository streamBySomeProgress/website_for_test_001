# 과제물
## 최초 구성

pnpm i 혹은 npm i를 통하여 package json 이하 의존성 설치(개발 시점에는 pnpm 사용함):

```bash
npm i
# or
pnpm i
```

이후 로컬(여기서는 작동 여부를 보는 것만을 목표로 하니)에서 개발 모드 구동
```bash
npm run dev
# or
pnpm run dev
```

3000번 포트가 점유되지 않은 경우라면 [http://localhost:3000](http://localhost:3000) 해당 주소로 접속, 
만일 점유된 경우 터미널에 나오는 로컬호스트 경로로 접속