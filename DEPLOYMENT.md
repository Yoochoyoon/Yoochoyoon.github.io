# GitHub Pages 배포 가이드

## 배포 방법

### 방법 1: Yoochoyoon.github.io 저장소 생성 (권장)

1. GitHub에서 새 저장소 생성
   - 저장소명: `Yoochoyoon.github.io`
   - Public으로 설정

2. 현재 코드를 새 저장소로 푸시
```bash
# 새 원격 저장소 추가
git remote add pages https://github.com/Yoochoyoon/Yoochoyoon.github.io.git

# 코드 푸시
git push -u pages feature/github-pages-portfolio:main
```

3. GitHub에서 확인
   - 몇 분 후 https://yoochoyoon.github.io 에서 접속 가능

### 방법 2: 기존 저장소의 docs/ 폴더 사용

1. docs/ 폴더에 모든 파일 복사
2. 저장소 Settings > Pages에서 "Source" → "Deploy from a branch" 선택
3. Branch: main, Folder: /docs 선택

## 배포 후 확인 사항

- [ ] 페이지가 정상적으로 로드되는지 확인
- [ ] 모든 섹션이 렌더링되는지 확인
- [ ] JSON 데이터가 제대로 로드되는지 확인
- [ ] 반응형 디자인이 모바일에서 정상 작동하는지 확인
- [ ] 각 링크가 정상 작동하는지 확인

## 문제 해결

### JSON 파일을 찾을 수 없음
- CORS 문제: 로컬에서는 `file://` 프로토콜로 CORS 제한이 있을 수 있음
- 해결: 로컬 웹 서버를 사용하거나 GitHub Pages에 배포

### 이미지가 보이지 않음
- assets/ 폴더에 실제 이미지 파일 추가 필요
- 현재는 gradient 배경으로 placeholder 사용 중
