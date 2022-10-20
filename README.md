# Netflix 오징어게임 - 징검다리 건너기

![image](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![image](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black)
![image](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=Three.js&logoColor=white)

## Table of contents

- ✨ [Motivation](#✨-motivation)
- 🎨 [Presentation](#🎨-presentation)
- 🚩 [Technologies](#🚩-technologies)
- 🕸️ [Project Structure](#🕸️-project-structure)
- ✍ [Blog Posting](#✍-blog-posting)

</br>

## ✨ Motivation

넷플릭스 인기드라마 '오징어게임'을 재밌게 보고 등장하는 게임 컨텐츠 일부를 Three.js, React를 이용하여 1인칭 시점으로 구현하였습니다.
웹에서 3D 게임을 만들어보고자 하는 욕심과 React에서도 WebGL을 써보고싶은 호기심으로 개인 프로젝트를 시작하게 되었습니다.

##### _(아이디어와 기초 학습은 인프런 강좌 [1분코딩](https://www.inflearn.com/course/3d-%EC%9D%B8%ED%84%B0%EB%9E%99%ED%8B%B0%EB%B8%8C-%EC%9B%B9)에서 많은 도움을 얻었습니다.)_

## 🎨 Presentation

![image](/public/assets/img/present2.jpg)
![image](/public/assets/img/present1.jpg)

### 👉 [play game now !](https://glass-stepping-stone.netlify.app/)

- 드라마 속 게임 룰과 동일하게 양 옆의 한 쌍의 유리 중 하나는 일반, 하나는 강화 유리로 각 스텝마다 랜덤하게 설정이 되어있습니다.
- 조작은 FPS 키보드 방식(w,a,s,d,space)로 구현했습니다.
- 맵 가운데 떠있는 달고나는 라이프 수를 나타내며 일반 유리를 밟아 추락시 재도전의 기회가 주어집니다.
- 플레이어의 움직임에 따라 오른쪽 인형의 시선과 몸 방향이 돌아갑니다.
- 유리를 건널 때마다 전광판에 현재 스텝이 표시됩니다.
- 다리를 다 건널시 상금이 주어집니다.

##### _(hint: 일반유리와 강화유리는 표면이 약간 다릅니다! 👀)_

</br>

## 🚩 Technologies

전체적인 코드는 **React + Typescript** 문법을 준수하여 작성했습니다.  
사용한 주요 라이브러리는 아래와 같습니다.

| Library            | Documentation                                                                               | Purpose                        |
| ------------------ | ------------------------------------------------------------------------------------------- | ------------------------------ |
| three              | [See the docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) | Javascript WebGL               |
| react three fiber  | [See the docs](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)         | The core library with Three.js |
| react three drei   | [See the docs](https://github.com/pmndrs/drei)                                              | Some useful helpers            |
| react three cannon | [See the docs](https://www.npmjs.com/package/@react-three/cannon)                           | Physics library                |
| styled-components  | [See the docs](https://styled-components.com/docs)                                          | Component styling              |
| recoil             | [See the docs](https://recoiljs.org/ko/)                                                    | State management               |

</br>

## 🕸️ Project Structure

📦public  
┣ 📂assets  
┣ 📜index.html  
📦src  
┣ 📂[components](./src/components/)  
┣ 📂[ui](./src/ui/)  
┣ 📂[utils](./src/utils/)  
┣ 📜[App.tsx](./src/App.tsx)  
┣ 📜[atoms.ts](./src/atoms.ts)  
┣ 📜[index.tsx](./src/index.tsx)

- **components** folder: scene에서 뼈대가 되는 주요 3D Object들이 있습니다. (light, mesh, gltf-model, ...)
- **UI** folder: scene에 Object로 안들어가고 화면에 평면상으로 나타나는 UI 컴포넌트로 구성되어 있습니다. (로딩 화면, 재시작 버튼, 음소거 아이콘)
- **utils** folder: 컴포넌트에서 자주 호출되는 함수를 모듈로 분리했습니다. (키보드 컨트롤, 효과음 재생)

</br>

## ✍ Blog Posting

### 📌[프로젝트 회고](https://choogro.tistory.com/56)

### 📌[3D Object 중복 생성 피하기](https://choogro.tistory.com/58)
