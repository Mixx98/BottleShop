# Bottleshop 이용 가이드

세계적인 와인들을 즐길 수 있는 와인 쇼핑몰 Bottleshop

한국에서 보기 힘든 여러 와인들을 치즈와 함께 즐겨보세요. 

와인과 함께 곁들일 수 있는 여러 종류의 치즈도 판매 하고 있습니다.

프로젝트 기간: 2023.02.13 - 2023.02.03 <br>

배포 주소 : http://34.64.96.43/categories

## 화면 흐름도 (Flow chart)
![Bottle_Shop drawio](https://user-images.githubusercontent.com/102946365/231141709-b94f86f9-47eb-4509-943c-360eabbb0076.png)


## Development Environment
Node.js Express Mongoose React Bootstrap

## ERD (Model Diagram)
<img width="815" alt="주문ERD" src="https://user-images.githubusercontent.com/102946365/231141945-310ce8c3-1a18-4e59-91ee-5f262292ae3c.png">
<img width="709" alt="비회원ERD" src="https://user-images.githubusercontent.com/102946365/231142158-c6b0e93b-ce7a-4154-a070-bc1328d381c2.png">
<img width="601" alt="회원정보ERD" src="https://user-images.githubusercontent.com/102946365/231142170-bedb8e9f-e4be-455e-aafb-1c5b54c56846.png">
<img width="652" alt="제품ERD" src="https://user-images.githubusercontent.com/102946365/231142183-840e3a6f-a70d-494f-975d-7c0d1fc58b8f.png">
<img width="869" alt="배송ERD" src="https://user-images.githubusercontent.com/102946365/231142198-4cd075c6-9771-4eea-a868-66e2256d6f4b.png">



## API 명세서
https://www.notion.so/elice/API-3fdc5a51663349d39e3f01b689bd41e6?pvs=4

## Branch Strategy
| Branch Name   | 설명                       |
|---------------|--------------------------|
| dev           | 개발 브랜치                   |
| feature_front | 프론트 기능 구현 후 1차 merge 브랜치 |
| feature_back  | 백앤드 기능 구현 후 1차 merge 브랜치 |

## Commit Convention      
| 태그 이름 | 설명 |
| --- | --- |
| [FEAT] | 새로운 기능 구현 |
| [CHORE] | 코드 수정 및 추가, 기능 구현중 |
| [ADD] | 라이브러리 추가, 새로운 파일 생성 |
| [DEL] | 쓰지 않는 코드 삭제 |
| [FIX] | 버그 수정, 오류 해결 |
| [MOVE] | 프로젝트 내 파일이나 코드의 이동 |
| [RENAME] | 파일 이름 변경 |
| [DOCS] | README, WIKI 등 문서 개정 |
| [REFACTOR] | 코드 전면 수정이 있을 때 |
| [HOTFIX] | 급한 버그 수정 (issue, QA) |
| [MERGE] | 원격, 로컬 저장소에서 Merge 할 때 사용 |
| [RESOLVE] | confilct 고쳤을 때 |

## Codding Convention
<details>
<summary>변수명</summary>
<div markdown="1"> 
      
- 변수명은 항상 Carmel Case 사용 <br>
- 함수의 경우 동사+명사 사용<br>
    - ex) getInformation()<br>
- flag 변수는 조동사 + flag 종류로 구성 ([flag 변수란?](https://m.blog.naver.com/scyan2011/221610951335))<br>
    - ex) isNum<br>
- 약어는 되도록 사용하지 않는다.
</div>
</details>

<details>
<summary>주석</summary>
<div markdown="1">   
    
- 한 줄 주석은 `//`를 사용한다.<br>
- 그 이상은 `/** */`를 사용한다.
</div>
</details>

## Developers & 담당 업무
| 이름 | MBTI | 포지션 | 담당 업무 | 이메일 |
| --- | --- | --- | --- | --- |
| 손민하 | ENTJ | 백앤드 | 제품, 주문, 배송 | codeminhasohn@gmail.com |
| 김은주 | ISFP | 백앤드 | 회원가입, 게시판 | sherlock22124@gmail.com |
| 윤현수 | ISFJ | 프론트 | 관리자, 회원가입, 로그인  | yhs697248@gmail.com |
| 장재우 | INFJ | 프론트 | 장바구니,주문,레이아웃 | jjang6632@gmail.com |

